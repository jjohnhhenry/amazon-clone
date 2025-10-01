import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Header } from '../components/Header';
import '../stylesComponents/uploadImages.css';

const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            id
            name
            price
            category
            urls {
                urlsProduct
            }
            seller
        }
    }
`;

const UploadImages = () => {
    const { productId } = useParams();
    const history = useHistory();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const isMountedRef = useRef(true);

    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: { id: productId },
        errorPolicy: 'all'
    });

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login-seller');
        }
    }, [history]);

    useEffect(() => {
        // Cleanup function to prevent memory leaks
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        // Generate previews for selected files
        const newPreviews = selectedFiles.map(file => {
            return {
                file,
                url: URL.createObjectURL(file),
                id: Math.random().toString(36).substr(2, 9)
            };
        });
        setPreviews(newPreviews);

        // Cleanup URLs when component unmounts or files change
        return () => {
            newPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
        };
    }, [selectedFiles]);

    const handleFileSelect = (files) => {
        const validFiles = Array.from(files).filter(file => {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert(`${file.name} no es un archivo de imagen válido`);
                return false;
            }

            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} es demasiado grande. El tamaño máximo es 5MB`);
                return false;
            }

            return true;
        });

        if (validFiles.length + selectedFiles.length > 10) {
            alert('Máximo 10 imágenes permitidas');
            return;
        }

        setSelectedFiles(prev => [...prev, ...validFiles]);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files);
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files);
        }
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const moveFile = (fromIndex, toIndex) => {
        setSelectedFiles(prev => {
            const newFiles = [...prev];
            const [removed] = newFiles.splice(fromIndex, 1);
            newFiles.splice(toIndex, 0, removed);
            return newFiles;
        });
    };

    const uploadImages = async () => {
        if (selectedFiles.length === 0) {
            alert('Por favor selecciona al menos una imagen');
            return;
        }

        if (!isMountedRef.current) return;
        setUploading(true);

        try {
            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append('images', file);
            });

            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4000/api/upload/product/${productId}/images`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!isMountedRef.current) return;

            const result = await response.json();

            if (response.ok) {
                alert('Imágenes subidas exitosamente');
                // Redirect with state to trigger refetch
                history.push({
                    pathname: '/vendor-dashboard',
                    state: { refetch: true }
                });
            } else {
                throw new Error(result.error || 'Error al subir imágenes');
            }
        } catch (error) {
            console.error('Upload error:', error);
            if (isMountedRef.current) {
                alert('Error al subir imágenes: ' + error.message);
            }
        } finally {
            if (isMountedRef.current) {
                setUploading(false);
            }
        }
    };

    if (loading) return (
        <div className="upload-images">
            <Header />
            <div className="upload-container">
                <div className="loading-spinner">Cargando información del producto...</div>
            </div>
        </div>
    );

    if (error || !data?.getProduct) return (
        <div className="upload-images">
            <Header />
            <div className="upload-container">
                <div className="error-message">
                    Producto no encontrado o sin acceso autorizado
                </div>
            </div>
        </div>
    );

    const product = data.getProduct;

    return (
        <div className="upload-images">
            <Header />
            <div className="upload-container">
                <div className="upload-header">
                    <h1>Subir Imágenes del Producto</h1>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>{product.category} • ${product.price}</p>
                    </div>
                </div>

                <div className="upload-content">
                    <div className="upload-instructions">
                        <h3>Instrucciones para las imágenes:</h3>
                        <ul>
                            <li>Formatos soportados: JPG, PNG, WEBP</li>
                            <li>Tamaño máximo por imagen: 5MB</li>
                            <li>Máximo 10 imágenes por producto</li>
                            <li>Resolución recomendada: 1000x1000 píxeles</li>
                            <li>La primera imagen será la imagen principal</li>
                        </ul>
                    </div>

                    <div
                        className={`drop-zone ${dragActive ? 'active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="drop-zone-content">
                            <div className="upload-icon">📁</div>
                            <h3>Arrastra imágenes aquí o haz clic para seleccionar</h3>
                            <p>Puedes seleccionar múltiples archivos a la vez</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {previews.length > 0 && (
                        <div className="preview-section">
                            <h3>Imágenes seleccionadas ({previews.length}/10)</h3>
                            <div className="preview-grid">
                                {previews.map((preview, index) => (
                                    <div key={preview.id} className="preview-item">
                                        <div className="preview-image">
                                            <img src={preview.url} alt={`Preview ${index + 1}`} />
                                            <div className="preview-overlay">
                                                <button
                                                    className="move-btn"
                                                    onClick={() => index > 0 && moveFile(index, index - 1)}
                                                    disabled={index === 0}
                                                    title="Mover izquierda"
                                                >
                                                    ←
                                                </button>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeFile(index)}
                                                    title="Eliminar"
                                                >
                                                    ✕
                                                </button>
                                                <button
                                                    className="move-btn"
                                                    onClick={() => index < previews.length - 1 && moveFile(index, index + 1)}
                                                    disabled={index === previews.length - 1}
                                                    title="Mover derecha"
                                                >
                                                    →
                                                </button>
                                            </div>
                                        </div>
                                        <div className="preview-info">
                                            <p className="file-name">{preview.file.name}</p>
                                            <p className="file-size">{(preview.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            {index === 0 && <span className="main-badge">Principal</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="upload-actions">
                        <button
                            className="btn-secondary"
                            onClick={() => history.push('/vendor-dashboard')}
                            disabled={uploading}
                        >
                            Cancelar
                        </button>
                        <button
                            className="btn-primary"
                            onClick={uploadImages}
                            disabled={uploading || selectedFiles.length === 0}
                        >
                            {uploading ? 'Subiendo...' : `Subir ${selectedFiles.length} imagen${selectedFiles.length !== 1 ? 'es' : ''}`}
                        </button>
                    </div>

                    <div className="process-indicator">
                        <div className="step completed">
                            <span className="step-number">✓</span>
                            <span className="step-label">Información Básica</span>
                        </div>
                        <div className="step-connector completed"></div>
                        <div className="step active">
                            <span className="step-number">2</span>
                            <span className="step-label">Subir Imágenes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadImages;