import React, { useState } from 'react';
import '../stylesComponents/signUp.css';

import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import sellerLogo from '../img/sellerLogo.png'
import useFormValidator from '../hooks/useFormValidator';
import validationFields from '../helpers/validationFields';
import { useMutation, gql } from '@apollo/client';

const NEW_SELLER = gql`
    mutation newUserSeller ($input: UserSellerInput) {
        newUserSeller(input: $input) {
            id
            name
            surname
            identification
            email
            storeName
            urlStore
        }
    }
`;


function SignUp (props) {

    //Creating new seller
    const [ newUserSeller ] = useMutation(NEW_SELLER);

    const [errorMessage, setErrorMessage] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);


    const initialState = {
        name:"",
        surname:"",
        identification:"",
        email:"",
        storeName:"",
        urlStore:"",
        password:"",
        confirmP:"",
    };

    const handleAction = async () => {
        try {
            const { data } = await newUserSeller({
                variables: {
                    input: {
                        name,
                        surname,
                        identification,
                        email,
                        storeName,
                        urlStore,
                        password
                    }
                }
            })
            setSuccessMessage("Usuario registrado correctamente.");
            setTimeout(() => {
                setSuccessMessage(null);
                console.log(props.history);
                props.history.push("/login");
            }, 3000);
            console.log(data);

        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message.replace('Error: ', ''));
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);

        }
    }

    const { datosUser, error, handleChangeSign, handleClickForm } = useFormValidator( initialState, validationFields, handleAction );

    const errors = Object.keys(error).length > 0;

    const {name, surname, identification, email, storeName , urlStore, password, confirmP} = datosUser;

    const uriStore = storeName.replace(/\s+/g, '-').toLowerCase(); 


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
                        <p>{error.name && error.name}</p>
                        <p>{error.surname && error.surname}</p>
                        <p>{error.identification && error.identification}</p>
                        <p>{error.email && error.email}</p>
                        <p>{error.storeName && error.storeName}</p>
                        <p>{error.urlStore && error.urlStore}</p>
                        <p>{error.password && error.password}</p>
                        <p>{!error.password && error.confirmP ? error.confirmP : null}</p>
                    </div>
                </div>
            :null}
            <div className="row--main--form">
                <div className="secction--form">
                    <div className="form--group">
                        <h3>Create account</h3>
                        <form>
                            <label className="label--name">Your name</label>
                            <input
                                className="input--sign"
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChangeSign}
                            />
                            <label className="label--name">Your surname</label>
                            <input
                                className="input--sign"
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={handleChangeSign}
                            />
                            <label className="label--name">Identification</label>
                            <input
                                className="input--sign"
                                type="text"
                                name="identification"
                                value={identification}
                                onChange={handleChangeSign}
                            />
                            <label className="label--name">Email</label>
                            <input
                                className="input--sign"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChangeSign}
                            />
                            <label className="label--name">Store Name</label>
                            <input
                                className="input--sign"
                                type="text"
                                name="storeName"
                                value={storeName}
                                onChange={handleChangeSign}
                            />
                            <label className="label--name">Url Store</label>
                            <input
                                className="input--sign url--store"
                                type="text"
                                name="urlStore"
                                value={urlStore}
                                placeholder={`/ ${uriStore}`}
                                onChange={handleChangeSign}
                            />
                            <div className="secction--form--input--url--store">
                                <p>{`https://esmiostore.com/store/${urlStore || uriStore}`}</p>
                            </div>
                            <label className="label--name">Password</label>
                            <input
                                className="input--sign"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="At least 6 characters"
                                onChange={handleChangeSign}
                            />
                            <label className="label--name">Re-enter Password</label>
                            <input
                                className="input--sign"
                                type="password"
                                name="confirmP"
                                value={confirmP}
                                onChange={handleChangeSign}
                            />
                            <button className="btn--button--signup" onClick={handleClickForm} >Next</button>
                        </form>
                        <div className="section--remember--sign">
                            <span>Already have an account?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;
