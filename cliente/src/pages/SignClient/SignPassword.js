import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

import '../../stylesComponents/signPassword.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import logo from '../../img/amazon-logo-sg.png'

const AUTH_CLIENT = gql`
    mutation authClient($input: AuthInput) {
        authClient(input: $input) {
            token
        }
    }
`;

export default function SignPassword({dataEmail, setData}) {

    const [authClient] = useMutation(AUTH_CLIENT);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [help, setHelp] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickHelp = () => {
        setHelp( h => !h );
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(""); // Clear error when user starts typing
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(""); // Clear error when user starts typing
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Por favor ingresa tu email");
            return;
        }

        if (!password.trim()) {
            setError("Por favor ingresa tu contraseña");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { data } = await authClient({
                variables: {
                    input: {
                        email: email,
                        password: password
                    }
                }
            });

            // Store token in localStorage
            localStorage.setItem('token', data.authClient.token);

            // Update parent state to show checkout
            setData(data.authClient.token);

        } catch (error) {
            console.error('Login error:', error);

            // Extract meaningful error message
            let errorMessage = "Error al iniciar sesión";

            if (error.message) {
                errorMessage = error.message;
            } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                errorMessage = error.graphQLErrors[0].message;
            } else if (error.networkError) {
                errorMessage = "Error de conexión. Verifica tu conexión a internet.";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="row--main--signup">
                <div className="row--logo--signup">
                    <img src={logo} alt="seller"/>
                </div>
                <div className="row--main--form">
                    <div className="secction--form">
                        <div className="form--group">
                            <h3>Iniciar Sesión</h3>
                            <form onSubmit={handleLogin}>
                                <label className="label--name">Email</label>
                                <input
                                    className="input--sign"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Ingresa tu email"
                                    disabled={loading}
                                />
                                <div className="section--password--label">
                                    <label className="label--name">Contraseña</label>
                                    <span>¿Olvidaste tu contraseña?</span>
                                </div>
                                <input
                                    className="input--sign"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Ingresa tu contraseña"
                                    disabled={loading}
                                />
                                {error && (
                                    <div style={{
                                        color: '#d93025',
                                        fontSize: '14px',
                                        marginTop: '8px',
                                        padding: '8px',
                                        backgroundColor: '#fce8e6',
                                        border: '1px solid #d93025',
                                        borderRadius: '4px'
                                    }}>
                                        ⚠ {error}
                                    </div>
                                )}
                                <button
                                    className="btn--button--signup"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </button>
                            </form>
                            <div className="section--remember">
                                <input
                                    className="input--checkbox"
                                    type="checkbox"
                                    name="checkbox"
                                />
                                <span>Recuérdame.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section--div--section">
                    <div className="div--div--section">
                    </div>
                </div>
                <div className="section--create--account">
                    <h5>¿Eres nuevo en Amazon?</h5>
                </div>
                <div className="section--create--account--button">
                    <Link to="/register-client" style={{ textDecoration: 'none', width: '100%' }}>
                        <button style={{ width: '100%', padding: '8px 16px', backgroundColor: '#f0f0f0', border: '1px solid #a6a6a6', borderRadius: '3px', fontSize: '13px' }}>
                            Crea tu cuenta de Amazon
                        </button>
                    </Link>
                </div>
                <div className="section--politics">
                    <div className="div--politics">
                        <small> Condiciones de uso</small>
                        <small> Aviso de privacidad</small>
                        <small> Ayuda </small>
                    </div>
                    <div className="div--footer--reserved">
                        <small>© 1996-2021, Amazon.com, Inc. o sus filiales</small>
                    </div>
                </div>
            </div>
        </>
    )
}
