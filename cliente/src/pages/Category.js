import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Header } from '../components/Header';
import { SubMenu } from '../components/layout/SubMenu';
import { Footer } from '../components/Footer';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import '../stylesComponents/category.css';
import { useSatateCart } from '../context/Cart/CartState';
import { logAddToCart } from '../helpers/cartHistory';
import { getCategoryLabel } from '../constants/categories';

const GET_PRODUCTS_BY_CATEGORY = gql`
    query getProductsByCategory($category: String!) {
        getProductsByCategory(category: $category) {
            id
            name
            price
            ofert
            stock
            brand
            category
            description
            urls {
                urlsProduct
            }
        }
    }
`;

export default function Category() {
    const { categoryName } = useParams();
    const history = useHistory();
    const [{ itemsCart }, dispatch] = useSatateCart();

    const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: { category: categoryName },
        errorPolicy: 'all'
    });

    // Debug logging
    console.log('Category Page Debug:');
    console.log('- categoryName:', categoryName);
    console.log('- loading:', loading);
    console.log('- error:', error);
    console.log('- data:', data);
    console.log('- products:', data?.getProductsByCategory);

    const handleViewProduct = (product) => {
        history.push({
            pathname: `/${categoryName}/${product.id}`,
            state: { ele: product }
        });
    };

    const handleAddToCart = (product, event) => {
        event.stopPropagation(); // Prevent navigation when clicking add to cart
        dispatch({
            type: "ADD_CART",
            payload: product
        });
        logAddToCart(product, 1);

        // Visual feedback
        const button = document.getElementById(`add-btn-${product.id}`);
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Agregado';
            button.style.backgroundColor = '#067D62';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        }
    };


    if (loading) return (
        <div>
            <Header />
            <SubMenu />
            <div className="category--container">
                <div className="category--loading">Cargando productos...</div>
            </div>
            <Footer />
        </div>
    );

    if (error) return (
        <div>
            <Header />
            <SubMenu />
            <div className="category--container">
                <div className="category--error">Error al cargar productos: {error.message}</div>
            </div>
            <Footer />
        </div>
    );

    const products = data?.getProductsByCategory || [];

    return (
        <div>
            <Header />
            <SubMenu />
            <div className="category--container">
                <div className="category--header">
                    <h1>{getCategoryLabel(categoryName)}</h1>
                    <p className="category--count">{products.length} resultado{products.length !== 1 ? 's' : ''}</p>
                </div>

                {products.length === 0 ? (
                    <div className="category--empty">
                        <h2>No hay productos en esta categoría</h2>
                        <p>Vuelve pronto, estamos agregando más productos cada día</p>
                    </div>
                ) : (
                    <div className="category--grid">
                        {products.map(product => (
                            <div key={product.id} className="category--product--card" onClick={() => handleViewProduct(product)}>
                                <div className="product--image--container">
                                    <img
                                        src={product.urls?.[0]?.urlsProduct || '/img/placeholder-product.png'}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.src = '/img/placeholder-product.png';
                                        }}
                                    />
                                    {product.ofert && (
                                        <div className="product--badge--discount">
                                            {Math.round(((product.price - product.ofert) / product.price) * 100)}% OFF
                                        </div>
                                    )}
                                </div>

                                <div className="product--info--container">
                                    <h3 className="product--name">
                                        {product.name.length > 60
                                            ? `${product.name.substring(0, 60)}...`
                                            : product.name}
                                    </h3>

                                    <div className="product--rating">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className="star--icon" />
                                        ))}
                                        <span className="rating--count">(4.5)</span>
                                    </div>

                                    <div className="product--pricing">
                                        {product.ofert ? (
                                            <>
                                                <span className="price--current">${product.ofert}</span>
                                                <span className="price--original">${product.price}</span>
                                            </>
                                        ) : (
                                            <span className="price--current">${product.price}</span>
                                        )}
                                    </div>

                                    {product.brand && (
                                        <p className="product--brand">Marca: {product.brand}</p>
                                    )}

                                    <div className="product--stock">
                                        {product.stock > 10 ? (
                                            <span className="stock--available">Disponible</span>
                                        ) : product.stock > 0 ? (
                                            <span className="stock--low">Solo quedan {product.stock}</span>
                                        ) : (
                                            <span className="stock--out">Agotado</span>
                                        )}
                                    </div>

                                    <button
                                        id={`add-btn-${product.id}`}
                                        className="btn--add--to--cart"
                                        onClick={(e) => handleAddToCart(product, e)}
                                        disabled={product.stock <= 0}
                                    >
                                        <AddShoppingCartIcon className="cart--icon" />
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
