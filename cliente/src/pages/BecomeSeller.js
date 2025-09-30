import React from 'react';
import { Link } from 'react-router-dom'

import '../stylesComponents/becomeSeller.css';

import avatar from '../img/avatar.png'
import { Header } from '../components/Header';
import { SubMenu } from '../components/layout/SubMenu';
import { Footer } from '../components/Footer';

function BecomeSeller () {
    return (
        <>
            <Header />
            <SubMenu />
            <div className="container">
                <div className="row--main">
                    <div className="row--main--section">
                        <div className="row--main--section--one">
                            <h2>Llega a cientos de millones de clientes</h2>
                            <h3>Solo en EE. UU., Amazon tiene más de 150 millones de visitantes mensuales únicos.</h3>
                            <button className="btn-btn--button btn-main"><Link to="/register">Comienza a Vender</Link></button>
                            <small>$39.99 USD al mes + tarifas de venta adicionales</small>
                        </div>
                        <div className="row--main--section--two">
                        </div>
                    </div>
                </div>
                <div className="row--second">
                    <div className="row--second--section">
                        <div className="row--second--column one">
                            <h3>BRAND SPOTLIGHT</h3>
                            <span>ANKER</span>
                        </div>
                        <div className="row--second--column two">
                            <img src={avatar} alt="avatar" />
                        </div>
                        <div className="row--second--column three">
                            <h4>“Las calificaciones de Amazon son en realidad el aspecto más importante para el proceso de desarrollo de nuevos productos. Nos aseguramos de que nuestros nuevos productos surjan a partir de las necesidades que expresan los clientes".</h4>
                            <small>Steven Yang, Anker</small>
                            <button className="btn-btn--button btn-second">Ve su historia</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default BecomeSeller;
