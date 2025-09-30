import React, { useState } from 'react';

import '../../stylesComponents/shippingOptions.css'


export default function ShippingOptions({setShippingOptions, setCount}) {


    const [ priority, setPriority ] = useState();

    const handleChange = (e) => {
        setPriority(e.target.value);
    }

    const handleClick = (e) => {
        setShippingOptions({priority});
        setCount( c => c + 1)
    }


    return (
        <>
            <div className="section--options--shipping">
                <h2>Elige las opciones de envío</h2>
                <div className="box--button">
                    <button className="btn--btn--options--shipping" onClick={handleClick} >Continuar</button>
                </div>
            </div>
            <div className="section--options--shipping--contained">
                <div className="section--options--shipping--details">
                    <h4>Envío de amazon.com </h4>
                    <small>Envíar a: John Chacho Santander, Guayas, Guayaquil, Guayas, 90601 Ecuador</small>
                    <div className="options--shipping--details--list">
                        <ul>
                            <li className="shipping--details--list">
                                <div>
                                    <strong className="title--product--details--list">HP 2020 Premium 15.6" FHD ordenador portátil con pantalla táctil, 4 núcleos Intel Core i5-1035G1 1.00 GHz, 16GB RAM, 512GB SSD, sin DVD, cámara web,
                                            Bluetooth, Wi-Fi, HDMI, Win 10, TMLTT Cable HDMI
                                    </strong>
                                    <div className="price--quantity--products">
                                        <span className="span--price">
                                            US$769.99
                                        </span>
                                        <span className="span--quantity">
                                            - Cantidad: 1
                                        </span>
                                    </div>
                                    <div>
                                        <span className="span--seller">  
                                            Vendido por: Free 2nd Day Shipping On Laptops and Smaller
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="shipping--details--list">
                                <div>
                                    <strong className="title--product--details--list">HP 2020 Premium 15.6" FHD ordenador portátil con pantalla táctil, 4 núcleos Intel Core i5-1035G1 1.00 GHz, 16GB RAM, 512GB SSD, sin DVD, cámara web,
                                            Bluetooth, Wi-Fi, HDMI, Win 10, TMLTT Cable HDMI
                                    </strong>
                                    <div className="price--quantity--products">
                                        <span className="span--price">
                                            US$769.99
                                        </span>
                                        <span className="span--quantity">
                                            - Cantidad: 1
                                        </span>
                                    </div>
                                    <div>
                                        <span className="span--seller">  
                                            Vendido por: Free 2nd Day Shipping On Laptops and Smaller
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="section--options--shipping--priority">
                    <h4>Elige unavelocidad de envío</h4>
                    <div className="section--options--shipping--priority--text">
                        <p>
                            Puedes rastrear tu envío y ver cualquier tarifa de importación aplicable antes de realizar tu
                            pedido. Aviso: Si seleccionas “Envío internacional estándar - sin rastreo”, no puedes rastrear
                            tu envío y se te podrían cobrar tarifas de importación antes de la entrega. Más información
                        </p>
                    </div>
                    <div className="section--options--shipping--priority--contained">
                        <div className="section--options--shipping--priority--select">
                            <div className="section--options--contained--radio">
                                <input
                                    className="input--options--shipping--radio"
                                    type="radio"
                                    name="shipping"
                                    value="normaltPriority"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="description--option--priority">
                                <strong className="time--shipping--succes" >Promedia de 7 a 10 días hábiles</strong>
                                <small className="price--shipping--price">US$35.42 - Envío Rápido de AmazonGlobal</small>
                            </div>
                        </div>
                        <div className="section--options--shipping--priority--select">
                            <div className="section--options--contained--radio">
                                <input
                                    className="input--options--shipping--radio"
                                    type="radio"
                                    name="shipping"
                                    value="fastPriority"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="description--option--priority">
                                <strong className="time--shipping--succes" >Estimado 2-5 días hábiles</strong>
                                <small className="price--shipping--price">US$41.49 - Envío prioritario de AmazonGlobal</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section--options--button">
                <div className="box--button">
                    <button className="btn--btn--options--shipping" onClick={handleClick}>Continuar</button>
                </div>
            </div>
        </>
    )
}
