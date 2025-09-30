import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import '../../stylesComponents/checkout.css';
import checkoutOne from '../../img/checkout-bar-1.jpg'
import FormCheckout from '../../components/layout/FormCheckout';
import ShippingOptions from '../../components/layout/ShippingOptions';
import PaymentMethod from '../../components/layout/PaymentMethod';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSatateCart } from '../../context/Cart/CartState';
import { quantityProduct } from '../../context/Cart/cartReducer';

const CREATE_ORDER = gql`
    mutation newOrder($input: OrderInput!) {
        newOrder(input: $input) {
            id
            total
            created
            state
            seller {
                name
                email
            }
            order {
                id
                quantity
            }
        }
    }
`;

export default function Checkout() {

    const [ shippingAddress, setShippingAddress ] = useState({});
    const [ shippingOptions, setShippingOptions ] = useState({});
    const [ paymentData, setPaymentData ] = useState({});
    const [ orderResult, setOrderResult ] = useState(null);

    const [ count, setCount ] = useState(0);

    const [{ itemsCart }, dispatch] = useSatateCart();
    const [createOrder, { loading: orderLoading }] = useMutation(CREATE_ORDER);

    console.log(shippingOptions);

    const handleProcessPayment = async (creditCardData) => {
        setPaymentData(creditCardData);

        try {
            // Preparar los datos del carrito para la orden
            const cartWithQuantity = quantityProduct(itemsCart);
            const orderItems = cartWithQuantity.map(item => ({
                id: item.id,
                quantity: item.quantity
            }));

            // Calcular el total
            const total = cartWithQuantity.reduce((sum, item) => {
                return sum + (parseFloat(item.price) * item.quantity);
            }, 0);

            // Obtener el seller del primer producto (asumiendo que todos son del mismo seller)
            const sellerId = cartWithQuantity[0]?.seller || cartWithQuantity[0]?.id;

            // Crear la orden
            const { data } = await createOrder({
                variables: {
                    input: {
                        order: orderItems,
                        total: total,
                        seller: sellerId,
                        state: "PENDIENTE"
                    }
                }
            });

            setOrderResult(data.newOrder);

            // Limpiar el carrito
            dispatch({
                type: "CLEAR_CART"
            });

            console.log('Order created successfully:', data.newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error al procesar la orden. Inténtalo de nuevo.');
        }
    };

    // Success Component
    const OrderSuccess = () => (
        <div className="section--order--success">
            <div className="success--header">
                <CheckCircleIcon style={{ fontSize: '48px', color: '#007600', marginBottom: '16px' }} />
                <h2>¡Pedido realizado con éxito!</h2>
                <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
                {orderResult && (
                    <div className="order--number">
                        <p><strong>Número de pedido: #{orderResult.id.slice(-8).toUpperCase()}</strong></p>
                        <p><strong>Total: ${orderResult.total.toFixed(2)}</strong></p>
                    </div>
                )}
            </div>

            <div className="order--details">
                <h3>Detalles del pedido</h3>

                {orderResult && (
                    <div className="detail--section">
                        <h4>Productos ordenados:</h4>
                        {orderResult.order.map((item, index) => (
                            <p key={index}>
                                Producto ID: {item.id} - Cantidad: {item.quantity}
                            </p>
                        ))}
                    </div>
                )}

                <div className="detail--section">
                    <h4>Dirección de envío:</h4>
                    <p>
                        {shippingAddress.name}<br />
                        {shippingAddress.streetOne}<br />
                        {shippingAddress.streetTwo && `${shippingAddress.streetTwo}`}<br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.code}<br />
                        {shippingAddress.province}<br />
                        Teléfono: {shippingAddress.phone}
                    </p>
                </div>

                <div className="detail--section">
                    <h4>Método de envío:</h4>
                    <p>
                        {shippingOptions.priority === 'fastPriority'
                            ? 'Envío prioritario de AmazonGlobal (2-5 días hábiles)'
                            : 'Envío Rápido de AmazonGlobal (7-10 días hábiles)'
                        }
                    </p>
                </div>

                <div className="detail--section">
                    <h4>Método de pago:</h4>
                    <p>
                        Tarjeta terminada en {paymentData.cardNumber?.slice(-4)}<br />
                        {paymentData.cardholderName}
                    </p>
                </div>

            </div>

            <div className="success--actions">
                <button
                    className="btn--continue--shopping"
                    onClick={() => window.location.href = '/'}
                >
                    Continuar comprando
                </button>
                <button
                    className="btn--track--order"
                    onClick={() => window.location.href = '/orders'}
                >
                    Ver mis pedidos
                </button>
            </div>
        </div>
    );

    const views = [
                    <FormCheckout
                        setShippingAddress={setShippingAddress}
                        setCount={setCount} />,
                    <ShippingOptions
                        setShippingOptions={setShippingOptions}
                        setCount={setCount} />,
                    <PaymentMethod
                        setCount={setCount}
                        onProcessPayment={handleProcessPayment} />,
                    <OrderSuccess />
                ]



    return (
            <>
                <div className="section--checkout--general">
                    <div className="header--checkout">
                        <div className="section--checkout--logo">
                            <img src={checkoutOne} alt="logo pagina de checkout" />
                        </div>
                    </div>
                    <>
                        {views[count]}
                    </>
                </div>
            </>
    )
}
