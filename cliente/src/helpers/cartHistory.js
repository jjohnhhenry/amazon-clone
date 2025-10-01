import { gql } from '@apollo/client';
import client from '../config/client';

const LOG_CART_ACTION = gql`
    mutation logCartAction($input: CartHistoryInput!) {
        logCartAction(input: $input) {
            id
            action
            timestamp
        }
    }
`;

export const logCartAction = async (action, product, quantity, previousQuantity, details) => {
    try {
        // Verificar si el usuario está autenticado
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No hay token, no se registra la acción');
            return;
        }

        const input = {
            action,
            productId: product?.id || null,
            productName: product?.name || '',
            quantity: quantity || 0,
            previousQuantity: previousQuantity || 0,
            price: product?.price || '',
            details: details || ''
        };

        console.log('Logging cart action:', input);

        const { data } = await client.mutate({
            mutation: LOG_CART_ACTION,
            variables: { input }
        });

        console.log('Cart action logged successfully:', data);
        return data.logCartAction;
    } catch (error) {
        console.error('Error logging cart action:', error);
        // No lanzar error para no interrumpir la funcionalidad del carrito
    }
};

export const logAddToCart = (product, quantity = 1) => {
    return logCartAction('ADD_TO_CART', product, quantity, 0, `Agregado ${quantity} unidad(es) al carrito`);
};

export const logRemoveFromCart = (product) => {
    return logCartAction('REMOVE_FROM_CART', product, 0, 0, 'Producto eliminado del carrito');
};

export const logUpdateQuantity = (product, newQuantity, oldQuantity) => {
    return logCartAction('UPDATE_QUANTITY', product, newQuantity, oldQuantity, `Cantidad actualizada de ${oldQuantity} a ${newQuantity}`);
};

export const logClearCart = (itemCount) => {
    return logCartAction('CLEAR_CART', null, 0, 0, `Carrito vaciado - ${itemCount} productos eliminados`);
};

export const logCheckout = (total, itemCount) => {
    return logCartAction('CHECKOUT', null, itemCount, 0, `Compra realizada - ${itemCount} productos`);
};
