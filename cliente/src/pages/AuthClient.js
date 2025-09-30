import React, { useState, useEffect } from 'react'
import Checkout from './checkout/Checkout';
import SignInClient from './SignClient/SignInClient';

export default function AuthClient() {

    const [ data, setData ] = useState(null);

    // Verificar si ya hay un token válido al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Si hay token, ir directamente al checkout
            setData(token);
        }
    }, []);

    return (
        <>
            {!data ? <SignInClient setData={setData} /> : <Checkout />}
        </>
    )
}
