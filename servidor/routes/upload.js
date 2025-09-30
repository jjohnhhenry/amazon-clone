const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const Products = require('../Models/Products');
const awsUploadImage = require('../utils/aws-upload-img');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Upload service is running',
        endpoints: {
            'POST /product/:productId/images': 'Upload images for a product',
            'PUT /product/:productId/images': 'Update images for a product'
        },
        timestamp: new Date().toISOString()
    });
});

// Status endpoint
router.get('/status', (req, res) => {
    res.json({
        service: 'Upload API',
        status: 'healthy',
        version: '1.0.0',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userSeller = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Upload images for a product
router.post('/product/:productId/images', verifyToken, upload.array('images', 10), async (req, res) => {
    try {
        const { productId } = req.params;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Verify product exists and belongs to seller
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.seller.toString() !== req.userSeller.id) {
            return res.status(403).json({ error: 'Unauthorized access to product' });
        }

        // Upload images to AWS S3
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.mimetype.split('/')[1];
            const imageName = `products/${req.userSeller.id}/${productId}/${i}.${extension}`;

            try {
                const result = await awsUploadImage(file.buffer, imageName);
                urls.push({ urlsProduct: result });
            } catch (uploadError) {
                console.error('AWS upload error:', uploadError);
                return res.status(500).json({ error: 'Failed to upload image to AWS' });
            }
        }

        // Update product with new images and mark as complete
        await Products.findByIdAndUpdate(productId, {
            urls: urls,
            status: 'complete'
        });

        res.json({
            success: true,
            message: 'Images uploaded successfully',
            urls: urls,
            productId: productId
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update specific images (for editing)
router.put('/product/:productId/images', verifyToken, upload.array('images', 10), async (req, res) => {
    try {
        const { productId } = req.params;
        const files = req.files;
        const { indices } = req.body; // Array of indices to replace

        // Verify product exists and belongs to seller
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.seller.toString() !== req.userSeller.id) {
            return res.status(403).json({ error: 'Unauthorized access to product' });
        }

        const indexArray = JSON.parse(indices || '[]');
        const urls = [...(product.urls || [])];

        // Upload new images
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.mimetype.split('/')[1];
            const index = indexArray[i] || urls.length;
            const imageName = `products/${req.userSeller.id}/${productId}/${index}.${extension}`;

            try {
                const result = await awsUploadImage(file.buffer, imageName);
                urls[index] = { urlsProduct: result };
            } catch (uploadError) {
                console.error('AWS upload error:', uploadError);
                return res.status(500).json({ error: 'Failed to upload image to AWS' });
            }
        }

        // Update product with modified images
        await Products.findByIdAndUpdate(productId, { urls: urls });

        res.json({
            success: true,
            message: 'Images updated successfully',
            urls: urls,
            productId: productId
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;