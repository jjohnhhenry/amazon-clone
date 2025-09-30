import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../stylesComponents//subMenu.css';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../../context/AuthContext';

export const SubMenu = () => {
    const { auth } = useContext(AuthContext);

    // Check if user is authenticated (has a valid token)
    const isAuthenticated = auth && auth !== null;

    // Determine the correct link and text for VENDER
    const getSellerLink = () => {
        if (isAuthenticated) {
            return {
                to: "/vendor-dashboard",
                text: "Mi Tienda"
            };
        } else {
            return {
                to: "/become-a-seller",
                text: "Vender"
            };
        }
    };

    const sellerLink = getSellerLink();

    return (
        <div className="submenu">
            <div className="submenu--item left">
                <MenuIcon className="submenu--menuIcon"/>
                <span className="submenu--span">Todo</span>
            </div>
            <div className="submenu--item midle">
                <p className="submenu--midleItem">Ofertas del Día</p>
                <p className="submenu--midleItem">Servicio al Cliente</p>
                <p className="submenu--midleItem">Tarjetas de Regalo</p>
                <Link to={sellerLink.to}>
                    <p className="submenu--midleItem">{sellerLink.text}</p>
                </Link>
                <p className="submenu--midleItem">Listas</p>

            </div>
            <div className="submenu--item right">
                <p className="submenu--rigthItem">Respuesta ante el COVID-19</p>
            </div>
        </div>
    )
}
