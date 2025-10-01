import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../stylesComponents/orders.css';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Header } from '../components/Header';

const GET_CLIENT_ORDERS = gql`
    query getClientOrders {
        getClientOrders {
            id
            order {
                id
                quantity
            }
            total
            state
            created
            seller {
                id
                name
                email
            }
        }
    }
`;

export default function Orders() {
    const [user, setUser] = useState(null);
    const { loading, error, data, refetch } = useQuery(GET_CLIENT_ORDERS, {
        errorPolicy: 'all',
        skip: !user // Skip query if user is not loaded yet
    });

    // Get user from token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                const decodedUser = JSON.parse(jsonPayload);
                setUser(decodedUser);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    // Refetch when user is loaded
    useEffect(() => {
        if (user) {
            refetch();
        }
    }, [user, refetch]);

    const getOrderStatusIcon = (status) => {
        switch(status) {
            case 'COMPLETADO':
                return <CheckCircleIcon style={{ color: '#4caf50' }} />;
            case 'CANCELADO':
                return <CancelIcon style={{ color: '#f44336' }} />;
            default:
                return <LocalShippingIcon style={{ color: '#ff9800' }} />;
        }
    };

    const getOrderStatusText = (status) => {
        switch(status) {
            case 'COMPLETADO':
                return 'Entregado';
            case 'CANCELADO':
                return 'Cancelado';
            default:
                return 'En tránsito';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(parseInt(dateString));
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) {
        return (
            <>
                <Header />
                <div className="orders--loading">
                    <p>Por favor inicia sesión para ver tus pedidos.</p>
                </div>
            </>
        );
    }

    if (loading) return (
        <>
            <Header />
            <div className="orders--loading">
                <div className="loading--spinner"></div>
                <p>Cargando tus pedidos...</p>
            </div>
        </>
    );

    if (error) {
        console.error('GraphQL Error:', error);
        return (
            <>
                <Header />
                <div className="orders--error">
                    <h3>No se pudieron cargar tus pedidos</h3>
                    <p>Esto puede ser porque aún no has realizado ninguna compra.</p>
                    <button onClick={() => window.location.href = '/'} className="btn--continue--shopping">
                        Continuar comprando
                    </button>
                </div>
            </>
        );
    }

    const orders = data?.getClientOrders || [];

    return (
        <>
            <Header />
            <div className="orders--container">
                <div className="orders--header">
                    <h1>Tus pedidos</h1>
                    <p>Hola {user.name}, aquí tienes un resumen de tus pedidos</p>
                </div>

            {orders.length === 0 ? (
                <div className="orders--empty">
                    <ShoppingCartIcon style={{ fontSize: '4rem', color: '#ddd', marginBottom: '1rem' }} />
                    <h2>No tienes pedidos aún</h2>
                    <p>Cuando realices tu primer pedido, aparecerá aquí.</p>
                    <button onClick={() => window.location.href = '/'} className="btn--start--shopping">
                        Comenzar a comprar
                    </button>
                </div>
            ) : (
                <div className="orders--list">
                    {orders.map((order) => (
                        <div key={order.id} className="order--item">
                            <div className="order--header">
                                <div className="order--info">
                                    <div className="order--date">
                                        <span className="order--label">PEDIDO REALIZADO</span>
                                        <span className="order--value">{formatDate(order.created)}</span>
                                    </div>
                                    <div className="order--total">
                                        <span className="order--label">TOTAL</span>
                                        <span className="order--value">${order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="order--seller">
                                        <span className="order--label">VENDEDOR</span>
                                        <span className="order--value">{order.seller?.name || 'Amazon'}</span>
                                    </div>
                                </div>
                                <div className="order--number">
                                    <span className="order--label">N.° DE PEDIDO</span>
                                    <span className="order--value">#{order.id.slice(-8).toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="order--content">
                                <div className="order--status">
                                    <div className="status--icon">
                                        {getOrderStatusIcon(order.state)}
                                    </div>
                                    <div className="status--info">
                                        <h3>{getOrderStatusText(order.state)}</h3>
                                        <p>
                                            {order.state === 'COMPLETADO' && 'Tu pedido ha sido entregado exitosamente.'}
                                            {order.state === 'CANCELADO' && 'Este pedido ha sido cancelado.'}
                                            {order.state === 'PENDIENTE' && 'Tu pedido está siendo procesado y será enviado pronto.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="order--items">
                                    <h4>Artículos en este pedido ({order.order.length})</h4>
                                    <div className="items--list">
                                        {order.order.map((item, index) => (
                                            <div key={index} className="order--product">
                                                <div className="product--placeholder">
                                                    <ShoppingCartIcon />
                                                </div>
                                                <div className="product--info">
                                                    <p className="product--name">Producto ID: {item.id}</p>
                                                    <p className="product--quantity">Cantidad: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="order--actions">
                                    <button className="btn--track--order">
                                        Rastrear paquete
                                    </button>
                                    <button className="btn--reorder">
                                        Volver a pedir
                                    </button>
                                    <button className="btn--return">
                                        Devolver artículos
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </>
    );
}