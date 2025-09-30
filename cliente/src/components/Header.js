import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../stylesComponents/header.css';
import logo from '../img/ecuamazon.png';
import Search from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSatateCart } from '../context/Cart/CartState';

export const Header = () => {

    const [ { itemsCart }, dispatch ] = useSatateCart();
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const userMenuRef = useRef(null);
    const loginOptionsRef = useRef(null);

    // Función para decodificar JWT
    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    // Verificar si el usuario está logueado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = decodeToken(token);
            if (decodedUser) {
                setUser(decodedUser);
            }
        }
    }, []);

    // Cerrar menús cuando se hace click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
            if (loginOptionsRef.current && !loginOptionsRef.current.contains(event.target)) {
                setShowLoginOptions(false);
            }
        };

        if (showUserMenu || showLoginOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu, showLoginOptions]);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setShowUserMenu(false);
        // Recargar la página para actualizar el estado global
        window.location.href = '/';
    };

    // Toggle del menú de usuario
    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    // Toggle del menú de opciones de login
    const toggleLoginOptions = () => {
        setShowLoginOptions(!showLoginOptions);
    };

    console.log("header", user);

    return (
        <div className="header">
            <div className="section--logo">
                <div className="section--menu--icon">
                    <MenuIcon style={{fontSize:"1.6rem"}} />
                </div>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo de Amazon"
                        className="header--logo"
                    />
                </Link>
            </div>
            <div className="header--search">
                <input
                    className="search--input"
                    type="text"
                />
                <Search
                    className="search--icon"
                />
            </div>
            <div className="header--nav">
                <div className="nav--option signIn" onClick={user ? toggleUserMenu : toggleLoginOptions} ref={user ? userMenuRef : loginOptionsRef}>
                    <span className="nav--option-first">
                        {user ? `Hola, ${user.name}` : 'Hola'}
                    </span>
                    <span className="nav--option-second">
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <PersonIcon style={{ fontSize: '1rem' }} />
                                Cuenta
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                Sign In
                            </div>
                        )}
                    </span>

                    {/* Menú desplegable del usuario autenticado */}
                    {user && showUserMenu && (
                        <div className="user--dropdown--menu">
                            <div className="user--dropdown--header">
                                <PersonIcon style={{ marginRight: '8px' }} />
                                <div>
                                    <div className="user--name">{user.name}</div>
                                    <div className="user--email">{user.email}</div>
                                </div>
                            </div>
                            <div className="user--dropdown--divider"></div>
                            <button
                                className="user--dropdown--item logout--btn"
                                onClick={handleLogout}
                            >
                                <ExitToAppIcon style={{ marginRight: '8px', fontSize: '1rem' }} />
                                Cerrar Sesión
                            </button>
                        </div>
                    )}

                    {/* Menú desplegable de opciones de login */}
                    {!user && showLoginOptions && (
                        <div className="login--options--menu">
                            <div className="login--options--header">
                                <h4>Selecciona el tipo de cuenta</h4>
                            </div>
                            <Link
                                to="/login-client"
                                className="login--option--item"
                                onClick={() => setShowLoginOptions(false)}
                            >
                                <AccountCircleIcon style={{ marginRight: '12px', fontSize: '1.2rem' }} />
                                <div>
                                    <div className="login--option--title">Soy Cliente</div>
                                    <div className="login--option--subtitle">Comprar productos</div>
                                </div>
                            </Link>
                            <div className="login--options--divider"></div>
                            <Link
                                to="/login-seller"
                                className="login--option--item"
                                onClick={() => setShowLoginOptions(false)}
                            >
                                <StoreIcon style={{ marginRight: '12px', fontSize: '1.2rem' }} />
                                <div>
                                    <div className="login--option--title">Soy Vendedor</div>
                                    <div className="login--option--subtitle">Gestionar mi tienda</div>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                <Link to="/orders" className="nav--option mobile--hidden" style={{ color: 'white', textDecoration: 'none' }}>
                    <span className="nav--option-first">Returns</span>
                    <span className="nav--option-second">& Orders</span>
                </Link>

                <div className="nav--option mobile--hidden">
                    <span className="nav--option-first">Your</span>
                    <span className="nav--option-second">Prime</span>
                </div>

                <Link to="/cart" className="cart--icon--mobile">
                    <div className="nav--cart">
                        <ShoppingCartIcon />
                        <span className="nav--option-second cart--count">
                            {itemsCart?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
