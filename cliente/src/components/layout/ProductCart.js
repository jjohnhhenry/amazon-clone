import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../../stylesComponents/productCart.css';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import PlusOneIcon from '@material-ui/icons/PlusOne';

import { useSatateCart } from '../../context/Cart/CartState';

export const ProductCart = ({product}) => {

    const [queries, setQueries] = useState(false)

    const [ { itemsCart }, dispatch ] = useSatateCart();

    console.log(itemsCart);

    useEffect(() => {

        const handleStyle = () => {
            console.log("window change", window.innerWidth, media.matches);
            setQueries(querie => !querie );
        }
        const media = window.matchMedia("(max-width: 480px)");
        media.addEventListener("change", handleStyle);

        return () => {
            media.removeEventListener("change", handleStyle);
        } 

    },[queries])

    const styles = () => {
        if(product?.stock > 0 && product?.stock < 3){
            return {
                color:"red"
            }
        }else{
            return {
                color: "#067D62"
            }
        }
    }

    const classes = styles();

    const handleClickQuitProduct = id => {
        console.log(typeof id);
        dispatch({
            type: "QUIT_PRODUCT",
            payload: {
                id,
                status: false
            }
        })
    }

    const handleDeleteProducts = id => {
        dispatch({
            type: "QUIT_PRODUCT",
            payload: {
                id,
                status: true
            }
        })
    }

    const handleClickAddProduct = () => { //Add product in cart
        dispatch({
            type: "ADD_CART",
            payload: product
        })
    }

    return (
        <div className="row--cart--product">
                <div className="row--cart--item">
                        <div className="cart--item--img">
                            <img src={product?.urls?.[0]?.urlsProduct || ''} alt="img" />
                        </div>
                        <div className="cart--item--info">
                            <h2>{!queries ? product?.name : (product?.name).substring(0,44) }...</h2>
                            <span style={classes}>{ (product?.stock > 0 && product?.stock < 3) ? "Pocas existencias" : "Disponible" }</span>
                            <span><input type="checkbox" />Es un regalo <Link to="#">Más información</Link></span>
                            <div className="item--info--cant">
                                <div className="item--section--quantity">
                                    <button onClick={()=>handleClickQuitProduct(product.id)} 
                                        className="item--button-quantity-minus">
                                        <ExposureNeg1Icon />
                                    </button>
                                    <button className="item--button-quantity">Cant.: {product?.quantity}</button>
                                    <button className="item--button-quantity-add" onClick= {handleClickAddProduct} >
                                        <PlusOneIcon />
                                    </button>
                                </div>
                                <button className="item--button-cart" onClick={()=>handleDeleteProducts(product.id)} >Eliminar</button>
                                <button className="item--button-cart">Guardar para más tarde</button>
                            </div>
                        </div>
                </div>
                <div className="cart--item--subtotal">
                    <span>{product?.price}</span>
                </div>
            
        </div>
    )
}
