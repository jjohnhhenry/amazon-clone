import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import '../stylesComponents/vendorDashboard.css';

const GET_PRODUCTS_BY_SELLER = gql`
    query getProductsBySeller {
        getProductsBySeller {
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
            created
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

const GET_ORDERS = gql`
    query getOrders {
        getOrders {
            id
            total
            created
            state
            client
            order {
                id
                quantity
            }
        }
    }
`;

const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($id: ID!, $state: OrderState!) {
        updateOrderStatus(id: $id, state: $state) {
            id
            state
        }
    }
`;

const VendorDashboard = () => {
    const history = useHistory();
    const [activeTab, setActiveTab] = useState('products');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT);
    const [updateOrderStatusMutation] = useMutation(UPDATE_ORDER_STATUS);

    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_BY_SELLER, {
        errorPolicy: 'all'
    });

    const { data: ordersData, loading: ordersLoading, error: ordersError, refetch: refetchOrders } = useQuery(GET_ORDERS, {
        errorPolicy: 'all'
    });

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login-seller');
        }
    }, [history]);

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatusMutation({
                variables: {
                    id: orderId,
                    state: newStatus
                }
            });

            alert('Estado del pedido actualizado exitosamente');
            refetchOrders(); // Refresh orders list
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Error al actualizar el estado del pedido');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('¿Está seguro que desea eliminar este producto?')) {
            try {
                await deleteProductMutation({
                    variables: { id: productId }
                });
                refetch();
                alert('Producto eliminado exitosamente');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

    const getStatusBadge = (product) => {
        const isComplete = product.status === 'complete' || (product.urls && product.urls.length > 0);
        return (
            <span className={`status-badge ${isComplete ? 'complete' : 'incomplete'}`}>
                {isComplete ? 'Completo' : 'Incompleto'}
            </span>
        );
    };

    const getStatusBadgeOrder = (state) => {
        const statusConfig = {
            'PENDIENTE': { text: 'Pendiente', className: 'status-pending' },
            'COMPLETADO': { text: 'Completado', className: 'status-completed' },
            'CANCELADO': { text: 'Cancelado', className: 'status-cancelled' }
        };

        const config = statusConfig[state] || { text: state, className: 'status-unknown' };
        return <span className={`status-badge ${config.className}`}>{config.text}</span>;
    };

    const formatDate = (dateString) => {
        return new Date(parseInt(dateString)).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getProductImage = (product) => {
        if (product.urls && product.urls.length > 0) {
            return product.urls[0].urlsProduct;
        }
        return '/img/placeholder-product.png';
    };

    if (loading) return (
        <div className="vendor-dashboard">
            <Header />
            <div className="dashboard-container">
                <div className="loading-spinner">Cargando dashboard...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="vendor-dashboard">
            <Header />
            <div className="dashboard-container">
                <div className="error-message">Error: {error.message}</div>
            </div>
        </div>
    );

    const products = data?.getProductsBySeller || [];
    const orders = ordersData?.getOrders || [];

    return (
        <div className="vendor-dashboard">
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Panel de Vendedor</h1>
                    <p>Gestiona tus productos y ventas desde un solo lugar</p>
                </div>

                <div className="dashboard-nav">
                    <button
                        className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Mis Productos ({products.length})
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Analíticas
                    </button>
                    <button
                        className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Pedidos ({orders.length})
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'products' && (
                        <div className="products-section">
                            <div className="section-header">
                                <h2>Gestión de Productos</h2>
                                <button
                                    className="btn-primary"
                                    onClick={() => history.push('/add-new-product')}
                                >
                                    + Agregar Producto
                                </button>
                            </div>

                            <div className="products-grid">
                                {products.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No tienes productos aún</h3>
                                        <p>Comienza agregando tu primer producto para vender en nuestra plataforma</p>
                                        <button
                                            className="btn-primary"
                                            onClick={() => history.push('/add-new-product')}
                                        >
                                            Agregar Primer Producto
                                        </button>
                                    </div>
                                ) : (
                                    products.map(product => (
                                        <div key={product.id} className="product-card">
                                            <div className="product-image">
                                                <img
                                                    src={getProductImage(product)}
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        e.target.src = '/img/placeholder-product.png';
                                                    }}
                                                />
                                                {getStatusBadge(product)}
                                            </div>

                                            <div className="product-info">
                                                <h3>{product.name}</h3>
                                                <p className="product-category">{product.category}</p>
                                                <div className="product-pricing">
                                                    <span className="price">${product.price}</span>
                                                    {product.ofert && (
                                                        <span className="offer">${product.ofert}</span>
                                                    )}
                                                </div>
                                                <p className="stock">Stock: {product.stock}</p>
                                            </div>

                                            <div className="product-actions">
                                                {product.status === 'incomplete' || !product.urls || product.urls.length === 0 ? (
                                                    <button
                                                        className="btn-upload"
                                                        onClick={() => history.push(`/upload-images/${product.id}`)}
                                                    >
                                                        Subir Imágenes
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn-secondary"
                                                        onClick={() => history.push(`/edit-product/${product.id}`)}
                                                    >
                                                        Editar
                                                    </button>
                                                )}

                                                <button
                                                    className="btn-danger"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="analytics-section">
                            <h2>Analíticas de Ventas</h2>

                            {/* Sales Metrics */}
                            <div className="section-header">
                                <h3>Resumen de Ingresos</h3>
                                <p>Métricas financieras de tus ventas</p>
                            </div>

                            <div className="analytics-grid">
                                <div className="metric-card revenue-card">
                                    <h3>Ingresos Totales</h3>
                                    <div className="metric-value">
                                        ${orders.reduce((total, order) => total + (order.total || 0), 0).toFixed(2)}
                                    </div>
                                    <span className="metric-subtitle">Todos los pedidos</span>
                                </div>
                                <div className="metric-card revenue-card">
                                    <h3>Ingresos Completados</h3>
                                    <div className="metric-value">
                                        ${orders
                                            .filter(o => o.state === 'COMPLETADO')
                                            .reduce((total, order) => total + (order.total || 0), 0)
                                            .toFixed(2)
                                        }
                                    </div>
                                    <span className="metric-subtitle">Pedidos procesados</span>
                                </div>
                                <div className="metric-card">
                                    <h3>Ingresos Pendientes</h3>
                                    <div className="metric-value">
                                        ${orders
                                            .filter(o => o.state === 'PENDIENTE')
                                            .reduce((total, order) => total + (order.total || 0), 0)
                                            .toFixed(2)
                                        }
                                    </div>
                                    <span className="metric-subtitle">Por procesar</span>
                                </div>
                                <div className="metric-card">
                                    <h3>Ticket Promedio</h3>
                                    <div className="metric-value">
                                        ${orders.length > 0
                                            ? (orders.reduce((total, order) => total + (order.total || 0), 0) / orders.length).toFixed(2)
                                            : '0.00'
                                        }
                                    </div>
                                    <span className="metric-subtitle">Valor promedio por pedido</span>
                                </div>
                            </div>

                            {/* Sales Performance */}
                            <div className="section-header" style={{marginTop: '40px'}}>
                                <h3>Rendimiento de Ventas</h3>
                                <p>Estadísticas de pedidos y productos</p>
                            </div>

                            <div className="analytics-grid">
                                <div className="metric-card">
                                    <h3>Total Pedidos</h3>
                                    <div className="metric-value">{orders.length}</div>
                                    <span className="metric-subtitle">Todos los estados</span>
                                </div>
                                <div className="metric-card success-card">
                                    <h3>Tasa de Completados</h3>
                                    <div className="metric-value">
                                        {orders.length > 0
                                            ? Math.round((orders.filter(o => o.state === 'COMPLETADO').length / orders.length) * 100)
                                            : 0
                                        }%
                                    </div>
                                    <span className="metric-subtitle">Pedidos procesados exitosamente</span>
                                </div>
                                <div className="metric-card">
                                    <h3>Productos Activos</h3>
                                    <div className="metric-value">
                                        {products.filter(p => p.status === 'complete' || (p.urls && p.urls.length > 0)).length}
                                    </div>
                                    <span className="metric-subtitle">Productos listos para venta</span>
                                </div>
                                <div className="metric-card">
                                    <h3>Total Productos</h3>
                                    <div className="metric-value">{products.length}</div>
                                    <span className="metric-subtitle">En tu catálogo</span>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            {orders.length > 0 && (
                                <div className="recent-activity" style={{marginTop: '40px'}}>
                                    <div className="section-header">
                                        <h3>Actividad Reciente</h3>
                                        <p>Últimos pedidos recibidos</p>
                                    </div>
                                    <div className="activity-list">
                                        {orders
                                            .sort((a, b) => new Date(parseInt(b.created)) - new Date(parseInt(a.created)))
                                            .slice(0, 5)
                                            .map(order => (
                                                <div key={order.id} className="activity-item">
                                                    <div className="activity-info">
                                                        <span className="activity-title">
                                                            Pedido #{order.id.slice(-8)}
                                                        </span>
                                                        <span className="activity-date">
                                                            {formatDate(order.created)}
                                                        </span>
                                                    </div>
                                                    <div className="activity-details">
                                                        <span className="activity-amount">${order.total}</span>
                                                        {getStatusBadgeOrder(order.state)}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="orders-section">
                            <div className="section-header">
                                <h2>Gestión de Pedidos</h2>
                                <p>Administra el estado de los pedidos de tus productos</p>
                            </div>

                            {ordersLoading && <p>Cargando pedidos...</p>}
                            {ordersError && <p style={{color: 'red'}}>Error al cargar pedidos: {ordersError.message}</p>}

                            <div className="orders-grid">
                                {orders.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No tienes pedidos aún</h3>
                                        <p>Cuando los clientes compren tus productos, aparecerán aquí</p>
                                    </div>
                                ) : (
                                    orders.map(order => (
                                        <div key={order.id} className="order-card">
                                            <div className="order-header">
                                                <div className="order-id">
                                                    <h3>Pedido #{order.id.slice(-8)}</h3>
                                                    <span className="order-date">
                                                        {formatDate(order.created)}
                                                    </span>
                                                </div>
                                                {getStatusBadgeOrder(order.state)}
                                            </div>

                                            <div className="order-details">
                                                <div className="order-info">
                                                    <p><strong>Cliente ID:</strong> {order.client}</p>
                                                    <p><strong>Total:</strong> ${order.total}</p>
                                                    <p><strong>Productos:</strong> {order.order.length} artículo(s)</p>
                                                </div>

                                                <div className="order-items">
                                                    <h4>Artículos:</h4>
                                                    {order.order.map((item, index) => (
                                                        <div key={index} className="order-item">
                                                            <span>Producto ID: {item.id}</span>
                                                            <span>Cantidad: {item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="order-actions">
                                                {order.state === 'PENDIENTE' && (
                                                    <>
                                                        <button
                                                            className="btn-secondary"
                                                            onClick={() => handleUpdateOrderStatus(order.id, 'COMPLETADO')}
                                                        >
                                                            ✓ Marcar como Procesado
                                                        </button>
                                                        <button
                                                            className="btn-danger"
                                                            onClick={() => handleUpdateOrderStatus(order.id, 'CANCELADO')}
                                                        >
                                                            ✗ Cancelar Pedido
                                                        </button>
                                                    </>
                                                )}
                                                {order.state === 'COMPLETADO' && (
                                                    <button
                                                        className="btn-primary"
                                                        onClick={() => handleUpdateOrderStatus(order.id, 'PENDIENTE')}
                                                    >
                                                        ↺ Volver a Pendiente
                                                    </button>
                                                )}
                                                {order.state === 'CANCELADO' && (
                                                    <button
                                                        className="btn-secondary"
                                                        onClick={() => handleUpdateOrderStatus(order.id, 'PENDIENTE')}
                                                    >
                                                        ↺ Reactivar Pedido
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="orders-summary">
                                <div className="metric-card">
                                    <h3>Pedidos Totales</h3>
                                    <div className="metric-value">{orders.length}</div>
                                </div>
                                <div className="metric-card">
                                    <h3>Pendientes</h3>
                                    <div className="metric-value">
                                        {orders.filter(o => o.state === 'PENDIENTE').length}
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <h3>Completados</h3>
                                    <div className="metric-value">
                                        {orders.filter(o => o.state === 'COMPLETADO').length}
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <h3>Cancelados</h3>
                                    <div className="metric-value">
                                        {orders.filter(o => o.state === 'CANCELADO').length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;