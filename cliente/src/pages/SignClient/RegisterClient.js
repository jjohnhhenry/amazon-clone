import React, { useState } from 'react';
import '../../stylesComponents/registerClient.css';

import validationRegister from '../../helpers/validationRegister';
import useFormValidator from '../../hooks/useFormValidator';

import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import logo from '../../img/amazon-logo-sg.png'

import { useMutation, gql } from '@apollo/client';

const NEW_CLIENT = gql`
    mutation newUserClient($input: userClientInput) {
        newUserClient(input: $input) {
            id
            name
            email
        }
    }
`;

const AUTH_CLIENT = gql`
    mutation authClient($input: AuthInput) {
        authClient(input: $input) {
            token
        }
    }
`;


function SignUp (props) {

    // Creating new client and auth mutations
    const [newUserClient, { loading: loadingRegister }] = useMutation(NEW_CLIENT);
    const [authClient, { loading: loadingAuth }] = useMutation(AUTH_CLIENT);

    // Local state for UI feedback
    const [registering, setRegistering] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [authError, setAuthError] = useState('');

    const initialState = {
        name:"",
        email:"",
        password:"",
        confirmP:"",
    };

    const handleAction = async () => {
        setRegistering(true);
        setAuthError('');

        try {
            // Step 1: Register user
            console.log('Registering user...');
            const registrationResult = await newUserClient({
                variables: {
                    input: {
                        name,
                        email,
                        password
                    }
                }
            });

            console.log('Registration successful:', registrationResult);
            setRegistrationSuccess(true);

            // Step 2: Auto-login after successful registration
            console.log('Auto-logging in...');
            const authResult = await authClient({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });

            console.log('Auto-login successful:', authResult);

            // Step 3: Store token and redirect to checkout
            localStorage.setItem('token', authResult.data.authClient.token);

            // Small delay for UX
            setTimeout(() => {
                console.log('Redirecting to checkout...');
                props.history.push("/auth-client");
            }, 1500);

        } catch (error) {
            console.error('Registration/Login error:', error);
            setAuthError(error.message || 'Error durante el registro');
            setRegistering(false);
        }
    }

    const { datosUser, error, handleChangeSign, handleClickForm } = useFormValidator( initialState, validationRegister, handleAction );

    const { name, email, password, confirmP } = datosUser;

    // Loading state
    const isLoading = loadingRegister || loadingAuth || registering;


    return (
        <div className="row--main--register--client">
            <div className="row--logo--register--client">
                <img src={logo} alt="seller"/>
            </div>
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
                                disabled={isLoading}
                            />
                            <label className="label--name">Email</label>
                            <input
                                className="input--sign"
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChangeSign}
                                disabled={isLoading}
                            />
                            <label className="label--name">Password</label>
                            <input
                                className="input--sign"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChangeSign}
                                disabled={isLoading}
                            />
                            <label className="label--name">Re-enter Password</label>
                            <input
                                className="input--sign"
                                type="password"
                                name="confirmP"
                                value={confirmP}
                                onChange={handleChangeSign}
                                disabled={isLoading}
                            />

                            {/* Error display */}
                            {((error && Object.keys(error).length > 0) || authError) && (
                                <div style={{
                                    color: '#d93025',
                                    fontSize: '14px',
                                    marginTop: '10px',
                                    padding: '8px',
                                    backgroundColor: '#fce8e6',
                                    border: '1px solid #d93025',
                                    borderRadius: '4px'
                                }}>
                                    {authError || Object.values(error)[0]}
                                </div>
                            )}

                            {/* Success display */}
                            {registrationSuccess && (
                                <div style={{
                                    color: '#137333',
                                    fontSize: '14px',
                                    marginTop: '10px',
                                    padding: '8px',
                                    backgroundColor: '#e6f4ea',
                                    border: '1px solid #137333',
                                    borderRadius: '4px'
                                }}>
                                    ✓ Cuenta creada exitosamente. Iniciando sesión automáticamente...
                                </div>
                            )}

                            <button
                                className="btn--button--signup"
                                onClick={handleClickForm}
                                disabled={isLoading}
                                style={{
                                    opacity: isLoading ? 0.7 : 1,
                                    cursor: isLoading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? (
                                    registrationSuccess ? 'Iniciando sesión...' : 'Creando cuenta...'
                                ) : (
                                    'Create your Amazon account'
                                )}
                            </button>
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