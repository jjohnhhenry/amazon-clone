import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { useMutation, gql } from '@apollo/client';

import '../../stylesComponents/signEmail.css'
import logo from '../../img/amazon-logo-sg.png'

const AUTH_CLIENT_EMAIL = gql`
        mutation authClientEmail($email: String) {
            authClientEmail(email: $email) 
        }
`

export default function SignEmail({setDataEmail}) {

    const [ authClientEmail ] = useMutation(AUTH_CLIENT_EMAIL);

    const [ email, setEmail ] = useState("");

    const [ help , setHelp ] = useState(false);

    const handleClickSign = async (e) => {
        e.preventDefault();
        console.log(email);
        if (!email) return "Enter your email or mobile phone number";

        try {
            const data = await authClientEmail({variables:{email}});
            console.log(data)
            setDataEmail(data.data.authClientEmail);
        } catch (error) {
            console.log(error);
        }

    }

    const handleChangeSign = (e) => {
        setEmail(e.target.value);
    }

    const handleClickHelp = () => {
        setHelp( h => !h );
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
                            <form>
                                <label className="label--name">Email or mobile phone number</label>
                                <input
                                    className="input--sign"
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChangeSign}
                                />
                                <button className="btn--button--signup" onClick={handleClickSign} >Next</button>
                            </form>
                            <div className="section--accept--terms">
                                <p>Al continuar, aceptas las Condiciones de uso y el Aviso de privacidad de Amazon.
                                </p>
                            <div className="section--help">
                                <div className="section--help-title">
                                    {!help ? <ArrowRightIcon /> : null}
                                    {help ? <ArrowDropDownIcon /> : null}
                                    <span onClick={handleClickHelp} >¿Necesitas Ayuda?</span>
                                </div>
                            {help ?
                                <div className="section--help--items">
                                    <span>¿Olvidaste tu contraseña?</span>
                                    <span>Otros problemas con el inicio de sesión</span>
                                </div>
                                :null}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section--create--account">
                    <h5>¿Eres nuevo en Amazon?</h5>
                </div>
                <div className="section--create--account--button">
                    <Link to="/register-client" style={{ textDecoration: 'none', width: '100%' }}>
                        <button style={{ width: '100%' }}>Crea tu cuenta de Amazon</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
