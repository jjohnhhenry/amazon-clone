import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Header } from '../components/Header';
import '../stylesComponents/history.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const GET_CART_HISTORY = gql`
    query getCartHistory {
        getCartHistory {
            id
            action
            product {
                id
                name
                price
                urls {
                    urlsProduct
                }
            }
            productName
            quantity
            previousQuantity
            price
            details
            timestamp
        }
    }
`;

const History = () => {
    const { data, loading, error } = useQuery(GET_CART_HISTORY);

    const getActionIcon = (action) => {
        switch(action) {
            case 'ADD_TO_CART':
                return <AddShoppingCartIcon className="history-icon add" />;
            case 'REMOVE_FROM_CART':
                return <RemoveShoppingCartIcon className="history-icon remove" />;
            case 'UPDATE_QUANTITY':
                return <EditIcon className="history-icon update" />;
            case 'CLEAR_CART':
                return <DeleteIcon className="history-icon clear" />;
            case 'CHECKOUT':
                return <CheckCircleIcon className="history-icon checkout" />;
            default:
                return <ShoppingCartIcon className="history-icon default" />;
        }
    };

    const getActionText = (action) => {
        switch(action) {
            case 'ADD_TO_CART':
                return 'Agregado al carrito';
            case 'REMOVE_FROM_CART':
                return 'Eliminado del carrito';
            case 'UPDATE_QUANTITY':
                return 'Cantidad modificada';
            case 'CLEAR_CART':
                return 'Carrito vaciado';
            case 'CHECKOUT':
                return 'Compra realizada';
            default:
                return action;
        }
    };

    const getActionClass = (action) => {
        switch(action) {
            case 'ADD_TO_CART':
                return 'action-add';
            case 'REMOVE_FROM_CART':
                return 'action-remove';
            case 'UPDATE_QUANTITY':
                return 'action-update';
            case 'CLEAR_CART':
                return 'action-clear';
            case 'CHECKOUT':
                return 'action-checkout';
            default:
                return 'action-default';
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        const now = new Date();
        const diffInMs = now - date;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Justo ahora';
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
        if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
        if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;

        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="history-container">
                    <div className="history-loading">
                        <ShoppingCartIcon style={{ fontSize: '50px', color: '#ccc' }} />
                        <p>Cargando historial...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="history-container">
                    <div className="history-error">
                        <h2>Error al cargar el historial</h2>
                        <p>{error.message}</p>
                        <p className="error-hint">Por favor, inicia sesión para ver tu historial</p>
                    </div>
                </div>
            </>
        );
    }

    const history = data?.getCartHistory || [];

    return (
        <>
            <Header />
            <div className="history-container">
                <div className="history-header">
                    <h1>Tu Historial de Acciones</h1>
                    <p className="history-subtitle">
                        Todas tus acciones en el carrito de compras
                    </p>
                </div>

                {history.length === 0 ? (
                    <div className="history-empty">
                        <ShoppingCartIcon style={{ fontSize: '80px', color: '#ddd' }} />
                        <h2>No hay historial disponible</h2>
                        <p>Comienza a agregar productos al carrito para ver tu historial aquí</p>
                    </div>
                ) : (
                    <div className="history-timeline">
                        {history.map((entry, index) => (
                            <div key={entry.id || index} className={`history-entry ${getActionClass(entry.action)}`}>
                                <div className="history-entry-icon">
                                    {getActionIcon(entry.action)}
                                </div>
                                <div className="history-entry-content">
                                    <div className="history-entry-header">
                                        <h3 className="history-action-title">
                                            {getActionText(entry.action)}
                                        </h3>
                                        <span className="history-timestamp">
                                            {formatDate(entry.timestamp)}
                                        </span>
                                    </div>

                                    {entry.product ? (
                                        <div className="history-product-info">
                                            {entry.product.urls && entry.product.urls[0] && (
                                                <img
                                                    src={entry.product.urls[0].urlsProduct}
                                                    alt={entry.product.name}
                                                    className="history-product-image"
                                                />
                                            )}
                                            <div className="history-product-details">
                                                <h4>{entry.product.name}</h4>
                                                <p className="history-product-price">
                                                    ${entry.product.price}
                                                </p>
                                                {entry.action === 'UPDATE_QUANTITY' && (
                                                    <p className="history-quantity-change">
                                                        Cantidad: {entry.previousQuantity} → {entry.quantity}
                                                    </p>
                                                )}
                                                {entry.action === 'ADD_TO_CART' && entry.quantity && (
                                                    <p className="history-quantity-info">
                                                        Cantidad: {entry.quantity}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="history-generic-info">
                                            {entry.productName && (
                                                <p className="history-product-name">{entry.productName}</p>
                                            )}
                                            {entry.details && (
                                                <p className="history-details">{entry.details}</p>
                                            )}
                                            {entry.action === 'CHECKOUT' && (
                                                <p className="history-checkout-info">
                                                    Total de la compra: ${entry.price || '0.00'}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default History;
