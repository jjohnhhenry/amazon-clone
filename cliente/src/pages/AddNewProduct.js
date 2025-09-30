import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import '../stylesComponents/addNewProduct.css';

const NEW_PRODUCT = gql`
    mutation newProduct($input: ProductInput) {
        newProduct(input: $input) {
            id
            name
            price
            stock
            category
            status
        }
    }
`;

const AddNewProduct = () => {
    const history = useHistory();
    const [newProductMutation, { loading }] = useMutation(NEW_PRODUCT);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        ofert: '',
        stock: '',
        brand: '',
        category: '',
        subcategory: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const categories = [
        'Electrónicos',
        'Ropa y Accesorios',
        'Hogar y Jardín',
        'Deportes y Aire Libre',
        'Libros',
        'Salud y Belleza',
        'Automotriz',
        'Juguetes y Juegos',
        'Alimentos y Bebidas',
        'Otros'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre del producto es requerido';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'El precio es requerido';
        } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'El precio debe ser un número válido mayor a 0';
        }

        if (!formData.category) {
            newErrors.category = 'La categoría es requerida';
        }

        if (!formData.stock.trim()) {
            newErrors.stock = 'El stock es requerido';
        } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
            newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0';
        }

        if (formData.ofert && (isNaN(formData.ofert) || parseFloat(formData.ofert) <= 0)) {
            newErrors.ofert = 'La oferta debe ser un número válido mayor a 0';
        }

        if (formData.ofert && parseFloat(formData.ofert) >= parseFloat(formData.price)) {
            newErrors.ofert = 'La oferta debe ser menor al precio regular';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const result = await newProductMutation({
                variables: {
                    input: {
                        name: formData.name.trim(),
                        price: formData.price.toString(),
                        ofert: formData.ofert ? formData.ofert.toString() : '',
                        stock: formData.stock.toString(),
                        brand: formData.brand.trim(),
                        category: formData.category,
                        subcategory: formData.subcategory.trim(),
                        description: formData.description.trim()
                    }
                }
            });

            const productId = result.data.newProduct.id;
            alert('Producto creado exitosamente. Ahora puedes subir las imágenes.');
            history.push(`/upload-images/${productId}`);

        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error al crear el producto: ' + error.message);
        }
    };

    return (
        <div className="add-new-product">
            <Header />
            <div className="form-container">
                <div className="form-header">
                    <h1>Agregar Nuevo Producto</h1>
                    <p>Completa la información básica de tu producto. Después podrás subir las imágenes.</p>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">
                                Nombre del Producto *
                                <span className="required">Requerido</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'error' : ''}
                                placeholder="Ej: iPhone 13 Pro Max 256GB"
                                maxLength="100"
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">
                                Categoría *
                                <span className="required">Requerido</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={errors.category ? 'error' : ''}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <span className="error-message">{errors.category}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="subcategory">Subcategoría</label>
                            <input
                                type="text"
                                id="subcategory"
                                name="subcategory"
                                value={formData.subcategory}
                                onChange={handleInputChange}
                                placeholder="Ej: Smartphones"
                                maxLength="50"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="brand">Marca</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                placeholder="Ej: Apple"
                                maxLength="50"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock">
                                Stock *
                                <span className="required">Requerido</span>
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className={errors.stock ? 'error' : ''}
                                placeholder="0"
                                min="0"
                                step="1"
                            />
                            {errors.stock && <span className="error-message">{errors.stock}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">
                                Precio Regular ($) *
                                <span className="required">Requerido</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className={errors.price ? 'error' : ''}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="ofert">Precio de Oferta ($)</label>
                            <input
                                type="number"
                                id="ofert"
                                name="ofert"
                                value={formData.ofert}
                                onChange={handleInputChange}
                                className={errors.ofert ? 'error' : ''}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                            {errors.ofert && <span className="error-message">{errors.ofert}</span>}
                            <span className="help-text">Opcional: Precio promocional</span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="description">Descripción del Producto</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="5"
                                placeholder="Describe las características principales de tu producto..."
                                maxLength="500"
                            />
                            <span className="char-count">{formData.description.length}/500</span>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => history.push('/vendor-dashboard')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Creando...' : 'Crear Producto'}
                        </button>
                    </div>

                    <div className="process-indicator">
                        <div className="step active">
                            <span className="step-number">1</span>
                            <span className="step-label">Información Básica</span>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step">
                            <span className="step-number">2</span>
                            <span className="step-label">Subir Imágenes</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewProduct;