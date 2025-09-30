import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useSatateCart } from '../../context/Cart/CartState';
import '../../stylesComponents/subtotal.css';

export const Subtotal = () => {

    const [ {itemsCart}, dispatch ] = useSatateCart();

    const sumaTotal = itemsCart?.reduce((acc, cont) => acc + parseFloat(cont.price), 0);


    return (
        <div className="row--subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ( {itemsCart.length} items):
                            <strong> {value} </strong>
                        </p>
                        <small className="subtotal--checbox">
                            <input type="checkbox" /> Este pedido es un regalo
                        </small>
                    </> 
                )}
                decimalScale={2}
                value={sumaTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button className="button--button subtotal"><Link 
                                        to={{
                                                pathname:"/auth-client",
                                                //state: {idProduct}
                                            }}>Proceder al Pago</Link></button> 
        </div>
    )
}
