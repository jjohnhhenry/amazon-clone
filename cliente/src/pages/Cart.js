import React, { useEffect, useState } from 'react';

import '../stylesComponents/cart.css';

import cartEmpty from '../img/img-empty.svg' 


import { Header } from '../components/Header';
import { SubMenu } from '../components/layout/SubMenu';
import { ProductCart } from '../components/layout/ProductCart';
import { Subtotal } from '../components/layout/Subtotal';
import { useSatateCart } from '../context/Cart/CartState';
import { quantityProduct } from '../context/Cart/cartReducer';
 


function Cart () {

    //const [ subtotal, setSubtotal ] = useState([]); //Subtotal products

    //const [ infoCart, setInfoCart ] = useState();

    const [ { itemsCart, itemsForCart }, dispatch ] = useSatateCart();

    useEffect(() => {
        console.log("desde uefecct")
        const allProducts = quantityProduct(itemsCart);
        dispatch({
            type: "PRODUCTS_FOR_CART",
            payload: allProducts
        })
    },[itemsCart]);

    const sumaTotal = itemsCart?.reduce((acc, cont) => acc + parseFloat(cont.price), 0);

    const titleElement = () => {
        return (
            <div className="row--cart--title--section">
               <h2 className="row--cart--title--cart">Carrito</h2>
               <p className="row--cart--price--cart">Precio</p> 
            </div>
        )
    }

    const subtotalCart = () => {
        return (
            <div className="row--cart--subtotal--section">
               <span className="row--cart--quantity--products">Subtotal ( {itemsCart.length} items):</span>
               <span className="row--cart--subtotal--products">${sumaTotal.toFixed(2)}</span>
            </div>
        )
    }

    return (
        <>
            <Header />
            <SubMenu />
            <div className="row--cart">
                <div className="row--cart--area">
                    <div className="row--cart--main">
                        <div className="row--cart--main--products">
                            {itemsForCart.length !== 0
                                ?
                                    <>
                                        {titleElement()}
                                        {itemsForCart.map(product => (
                                            <ProductCart key={product.id} product={product} />
                                        ))}
                                        {subtotalCart()}
                                    </>
                                :
                                    <div className="row--cart--main--products--empty">
                                        <div className="products--empty--section--img">
                                            <img src={cartEmpty} alt="carrito vacio" />
                                        </div>
                                        <div className="products--empty--section--register">
                                            <h2>Tu Carrito de Amazon está vacío</h2>
                                            <p>Compra las ofertas del día</p>
                                            <div className="products--empty--section--register--buttons">
                                                <button className="btn--btn--product--cart--empty btn--primary">Inicia sesión en tu cuenta</button>
                                                <button className="btn--btn--product--cart--empty btn--secondary">Regístrate ahora</button>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="row--cart--left">
                        <div className="row--cart--left--subtotal">
                            <Subtotal />
                        </div>
                        <div className="row--cart--left--related">
                            Relacionados
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Cart;
