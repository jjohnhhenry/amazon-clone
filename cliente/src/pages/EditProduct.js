import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Header } from '../components/Header';
import '../stylesComponents/editProduct.css';

const GET_PRODUCT_BY_SELLER = gql`
    query getProductBySeller($id: ID!) {
        getProductBySeller(id: $id) {
            id
            name
            price
            ofert
            stock
            brand
            category
            subcategory
            description
            status
            urls {
                urlsProduct
            }
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput) {
        updateProduct(id: $id, input: $input) {
            id
            name
            price
            ofert
            stock
            brand
            category
            subcategory
            description
            status
        }
    }
`;

const EditProduct = () => {
    const { productId } = useParams();
    const history = useHistory();
    const [updateProductMutation, { loading: updating }] = useMutation(UPDATE_PRODUCT);

    const { data, loading, error, refetch } = useQuery(GET_PRODUCT_BY_SELLER, {
        variables: { id: productId },
        errorPolicy: 'all'
    });

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
    const [hasChanges, setHasChanges] = useState(false);

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

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login-seller');
        }
    }, [history]);

    useEffect(() => {
        if (data?.getProductBySeller) {
            const product = data.getProductBySeller;
            const initialData = {
                name: product.name || '',
                price: product.price || '',
                ofert: product.ofert || '',
                stock: product.stock || '',
                brand: product.brand || '',
                category: product.category || '',
                subcategory: product.subcategory || '',
                description: product.description || ''
            };
            setFormData(initialData);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setHasChanges(true);

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
            await updateProductMutation({
                variables: {
                    id: productId,
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

            setHasChanges(false);
            alert('Producto actualizado exitosamente');
            refetch();

        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error al actualizar el producto: ' + error.message);
        }
    };

    const handleCancel = () => {
        if (hasChanges) {
            if (window.confirm('¿Deseas descartar los cambios no guardados?')) {
                history.push('/vendor-dashboard');
            }
        } else {
            history.push('/vendor-dashboard');
        }
    };

    if (loading) return (
        <div className="edit-product">
            <Header />
            <div className="form-container">
                <div className="loading-spinner">Cargando información del producto...</div>
            </div>
        </div>
    );

    if (error || !data?.getProductBySeller) return (
        <div className="edit-product">
            <Header />
            <div className="form-container">
                <div className="error-message">
                    Producto no encontrado o sin acceso autorizado
                </div>
            </div>
        </div>
    );

    const product = data.getProductBySeller;

    return (
        <div className="edit-product">
            <Header />
            <div className="form-container">
                <div className="form-header">
                    <h1>Editar Producto</h1>
                    <p>Actualiza la información de tu producto</p>
                    {product.urls && product.urls.length > 0 && (
                        <div className="product-preview">
                            <img
                                src={product.urls[0].urlsProduct}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = '/img/placeholder-product.png';
                                }}
                            />
                        </div>
                    )}
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
                            onClick={handleCancel}
                            disabled={updating}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn-image"
                            onClick={() => history.push(`/upload-images/${productId}`)}
                            disabled={updating}
                        >
                            Cambiar Imágenes
                        </button>
                        <button
                            type="submit"
                            className={`btn-primary ${hasChanges ? 'has-changes' : ''}`}
                            disabled={updating || !hasChanges}
                        >
                            {updating ? 'Guardando...' : hasChanges ? 'Guardar Cambios' : 'Sin Cambios'}
                        </button>
                    </div>

                    {hasChanges && (
                        <div className="changes-indicator">
                            <span>⚠ Tienes cambios sin guardar</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditProduct;