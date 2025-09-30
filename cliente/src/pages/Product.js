import React, { useEffect, useState } from 'react';

import parse from 'html-react-parser';

import { Link, useParams } from 'react-router-dom';


import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import ShopIcon from '@material-ui/icons/Shop';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import PlusOneIcon from '@material-ui/icons/PlusOne';

import '../stylesComponents/product.css'

import product2 from '../img/product2.jpg';
import reloj6 from '../img/reloj6.jpg';
import { Header } from '../components/Header';
import { SubMenu } from '../components/layout/SubMenu';
import { Footer } from '../components/Footer';
import { ProductSelectColors } from '../components/layout/ProductSelectColors';
import { useSatateCart } from '../context/Cart/CartState';
import { quantityProduct } from '../context/Cart/cartReducer';
import Rewies from '../components/layout/Rewies';




function Product ({location}) {

    const producto = {"colors":[{"color":"Negro", "url":reloj6, "precio":59.99}, {"color":"Rosa", "url":product2, "precio":59.99}],
    "store":"Rovianly", "feedback":21, "reply":17,
    }

    const infoProduct = location.state?.ele;

    const params = useParams();

    const [ { itemsCart, itemsForCart }, dispatch ] = useSatateCart(); //State Cart


    useEffect(() => {
        console.log("desde uefecct")
        const allProducts = quantityProduct(itemsCart);
        dispatch({
            type: "PRODUCTS_FOR_CART",
            payload: allProducts
        })
    }, [itemsCart])



    const [imgMain, setImgMain] = useState({
        img: infoProduct.urls && infoProduct.urls.length > 0 ? infoProduct.urls[0].urlsProduct : '',
        color:""
    });

    const quantityP = itemsForCart && itemsForCart.filter(elem => elem.id ===  infoProduct.id)

    console.log(quantityP)

    const handleClickAddProduct = () => { //Add product in cart
        dispatch({
            type: "ADD_CART",
            payload: infoProduct
        })
    }

    const handleClickQuitProduct = id => {
        dispatch({
            type: "QUIT_PRODUCT",
            payload: {
                id,
                status: false
            }
        })
    }


    const handleMouseEnter = (url) => {
        setImgMain({
            ...imgMain,
            img:url
        });
    }


    return (
        <div>
            <Header />
            <SubMenu />
            <div className="section--product">
                <div className="section--product--area">
                    <div className="product--row--img">
                        <div className="product--row--small--img">
                            <ul>
                                { infoProduct && infoProduct.urls.map(({urlsProduct}) => (
                                        <li key={urlsProduct}
                                            onMouseEnter={()=>handleMouseEnter(urlsProduct)} ><img src={urlsProduct} alt="img" /></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="product--row--long--img">
                                <img src={imgMain.img} alt="img" />
                        </div>
                    </div>
                    <div className="product--row-information">
                        <div className="information--area">
                            <h2>{infoProduct.name}</h2>
                            <span className="product--section--item store"> <Link to="#">Visita la tienda de {producto.store}</Link></span>
                            <div className="product--section--item rating">
                                    <span className="rating--white">{Array(5).fill( <StarOutlineIcon id="rating--icon--white" />)}</span>
                                <div className="row--product--raiting--fill">
                                    <span className="rating--fill">{Array(5).fill( <StarIcon id="rating--icon--fill" />)}</span>
                                </div>
                            </div>
                            <span className="product--section--item feedback">{ producto.feedback } calificaciones</span>
                            <span className="product--section--item reply">{ producto.reply } preguntas respondidas</span>
                            <hr />
                            <span className="product--section--item price---main">Precio:<h2 id="price---main--price">US$ {infoProduct.price}</h2> + US$ 21.62 de envío.</span>
                            <span className="product--section--item color">
                                Color: { imgMain.color ? imgMain.color : "Selecciona Color"}
                                <ul className="section--select--colors">
                                    {
                                        producto.colors.map(color => (

                                            <ProductSelectColors
                                                key={color.url}
                                                setImgMain={setImgMain}
                                                colors={color}
                                            />
                                        ))
                                    }
                                </ul>
                            </span>
                            <span className="product--section--item details">
                                <h2>Sobre este Artículo</h2>
                                <p>{parse(infoProduct.description)}</p>
                            </span>
                        </div>
                    </div>
                    <div className="product--row--addcart">
                        <div className="row--area--addcart">
                            <span className="product--section--item price">$ {infoProduct.price} <small>+ US$ 21.62 de envío.</small></span>
                            <span className="product--section--item available">{ (infoProduct.stock > 0 && infoProduct.stock < 3) ? "Pocas existencias" : "Disponible" }</span>
                            <span className="product--section--item addnumber">
                                <button className="item--button-quantity-minus"
                                        onClick={()=>handleClickQuitProduct(infoProduct.id)} >
                                        <ExposureNeg1Icon />
                                </button>
                                <button className="item--button-quantity">Cant.: { quantityP.length !== 0 ? quantityP[0].quantity : null} </button>
                                <button className="item--button-quantity-add" onClick= {handleClickAddProduct} >
                                        <PlusOneIcon />
                                </button>
                            </span>
                            <span className="product--section--item addcart">
                                <button className="button--button add--cart" onClick={ handleClickAddProduct } >Agregar al carrito</button>
                                <AddShoppingCartIcon id="addShopin--product" style={{color:"FFF", background:"#000", padding:"2px", position:"absolute", left:"0", marginLeft:"3.5px", marginTop:"2.5px", borderRadius:"2px"}} />
                            </span>
                            <span className="product--section--item addcart">
                                <button className="button--button add--cart">Comprar Ahora</button>
                                <ShopIcon id="shopinIcon--product" style={{color:"FFF", background:"#000", padding:"2px", position:"absolute", left:"0", marginLeft:"3.5px", marginTop:"2.5px", borderRadius:"2px"}} />
                            </span>
                            <div className="row--details">
                                <span className="icon--item--details">
                                    <CreditCardIcon />
                                    <p>Transacción segura</p>
                                </span>
                                <span className="icon--item--details">
                                    <p>Vendido por <small> {producto.store} </small></p>
                                </span>
                                <span className="icon--item--details location">
                                    <LocationOnIcon /> <p> Enviar a Quito </p>
                                </span>
                                <span className="icon--item--details list">
                                    <button>Agregar a la Lista</button>
                                </span>
                            </div>
                        </div>
                        <div className="row--area--share" style={{marginTop:"2rem"}}>
                            <div className="share--items">
                                <p>Compartir</p>
                                <div className="icon-share" >
                                    <FacebookIcon id="facebokk" style={{color:"#3B5998"}}/> 
                                    <WhatsAppIcon id="whatsapp" style={{color:"#4FCE5D"}}/> 
                                    <TwitterIcon id="twitter" style={{color:"#00ACEE"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section--description--product">
                    DESCRIPCIÓN DEL PRODUCTO
                </div>
                <div className="section--aditional--information--product">
                    INFORMACIÓN DEL PRODUCTO
                </div>
                <div className="section--rewies--product">
                    <Rewies />
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Product;
