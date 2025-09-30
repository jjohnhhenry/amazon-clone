import React, { useState } from 'react';
import '../stylesComponents/signUp.css';
import sellerLogo from '../img/sellerLogo.png';
import { setToken } from '../helpers/token';

import  useFormValidator from '../hooks/useFormValidator';
import validationLogin from '../helpers/validationLogin';
import useAuth from '../hooks/useAuth';
import { useMutation, gql } from '@apollo/client';

import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const AUTH_SELLER = gql`
    mutation authSeller ($input: AuthInput) {
        authSeller(input: $input) {
            token
        }
    }
`;

function Login  (props) {

    //auth seller
    const [ authSeller ] = useMutation(AUTH_SELLER);

    const { setUserSeller } = useAuth();

    const [errorMessage, setErrorMessage] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);

    const initialState = {
        email:"",
        password:"",
    };

    const handleAction = async () => {
        try {
            const { data } = await authSeller({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            })
            setSuccessMessage("Inicio de Sesión Exitoso");
            const { token } = data.authSeller;
            
            setToken(token);
            setUserSeller(token);

            console.log("DESDE LOGIN ENVIADO TOKEN", token);
            

            setTimeout(() => {
                setSuccessMessage(null);
                props.history.push("/vendor-dashboard");
            }, 1000);
            
        } catch (error) {
            setErrorMessage(error.message.replace('Error: ', ''));
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);

        }
    }



    const { datosUser, error, handleChangeSign, handleClickForm } = useFormValidator( initialState, validationLogin, handleAction );

    const errors = Object.keys(error).length > 0;

    const { email, password } = datosUser;

    return (
        <div className="row--main--signup">
            <div className="row--logo--signup">
                <img src={sellerLogo} alt="seller"/>
            </div>
            {errorMessage || successMessage ? 
                <div className="row--messages--signup" style={errorMessage ? {border:"1px solid #c40000"}:{border:"1px solid #4bb543"} } >
                    <div className="row--messages--signup--icon">
                        {errorMessage && <WarningIcon style={{fontSize:"2rem", color:"#c40000"}} />}
                        {successMessage && <CheckCircleOutlineIcon style={{fontSize:"2rem", color:"#4bb543"}} />}
                    </div>
                    <div className="row--message--signup--message">
                        {errorMessage && <h4>There was a problem</h4>}
                        {errorMessage && <p>{errorMessage}</p>}
                        {successMessage && <p>{successMessage}</p>}
                    </div>
                </div>
            :null}
            {errors ? 
                <div className="row--error--signup">
                    <div className="row--error--signup--icon">
                        <WarningIcon style={{fontSize:"2rem", color:"#c40000"}} />
                    </div>
                    <div className="row--error--signup--message">
                        <h4>There was a problem</h4>
                        <p>{error.email && error.email}</p>
                        <p>{error.password && error.password}</p>
                    </div>
                </div>
            :null}
            <div className="row--main--form">
                <div className="secction--form">
                    <div className="form--group">
                        <h3>Get started selling on Amazon</h3>
                        <form>
                            <label className="label--name">Email or mobile phone number</label>
                            <input
                                className="input--sign"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChangeSign}
                            />
                            <div className="section--password">
                                <label className="label--name">Password</label>
                                <p>Forgot your Password?</p>
                            </div>
                            <input
                                className="input--sign"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChangeSign}
                            />
                            <button className="btn--button--signup" onClick={handleClickForm} >Next</button>
                        </form>
                        <div className="section--remember--sign">
                            <input
                                className="input--checkbox"
                                type="checkbox"
                                name="checkbox"
                            />
                            <span>Keep me signed in.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;