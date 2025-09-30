import React from 'react';
import '../stylesComponents/footer.css';

export const Footer = () => {
    return (
        <div className="row--main--footer">
            <div className="section-up-top">
                <button>Inicio de Página</button>
            </div>
            <div className="section-footer--nav">
                <div className="section-footer--nav--row">
                    <div className="section-footer--nav--row--links mobile--on">
                        <div className="nav--colum--links">
                            <p>Conócenos</p>
                            <ul>
                                <li>Trabaja en Ecuamazon</li>
                                <li>Blog</li>
                                <li>Acerca de Ecuamazon</li>
                                <li>Relaciones con los inversionistas</li>
                                <li>Dispositivos Ecuamazon</li>
                                <li>Ecuamazon Tours</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-footer--nav--row--links mobile--off">
                        <div className="nav--colum--links">
                        </div>
                    </div>
                    <div className="section-footer--nav--row--links mobile--off">
                        <div className="nav--colum--links">
                            <p>Gana Dinero con Nosotros</p>
                            <ul>
                                <li>Vender productos en Ecuamazon</li>
                                <li>Vender aplicaciones en Ecuamazon</li>
                                <li>Programas de Afiliados</li>
                                <li>Anuncia tus productos</li>
                                <li>Publica tu Libro</li>
                                <li>Vende más con nosotros</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-footer--nav--row--links mobile--off">
                        <div className="nav--colum--links">
                        </div>
                    </div>
                    <div className="section-footer--nav--row--links mobile--off">
                        <div className="nav--colum--links">
                            <p>Productos de Pago de Ecuamazon</p>
                            <ul>
                                <li>Compra tus Puntos</li>
                                <li>Recarga tu Saldo</li>
                                <li>Convertidor de Monedas</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-footer--nav--row--links mobile--off">
                        <div className="nav--colum--links">
                        </div>
                    </div>
                    <div className="section-footer--nav--row--links mobile--off">
                        <div className="nav--colum--links">
                            <p>Podemos Ayudarte</p>
                            <ul>
                                <li>Ecuamazon</li>
                                <li>Tu Cuenta</li>
                                <li>Tus Pedidos</li>
                                <li>Tarifas de Envío y Políticas</li>
                                <li>Devoluciones y Reemplazos</li>
                                <li>Ecuamazon Assistant</li>
                                <li>Ayuda</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-legacy">
                <ul>
                    <li>Condiciones de Uso</li>
                    <li>Aviso de Privacidad</li>
                    <li className="legacy--li--mobile" >Anuncios basados en intereses</li>
                    <li className="item--dark">© 1996-2021, Ecuamazon.com, Inc. o sus filiales</li>
                </ul>
            </div>
        </div>
    )
}
