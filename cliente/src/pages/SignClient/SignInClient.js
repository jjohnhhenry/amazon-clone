import React, { useState } from 'react';

import '../../stylesComponents/signInClient.css'
import SignPassword from './SignPassword';
import SignEmail from './SignEmail';


export default function SignInClient({ setData }) {

    // Para proyecto didáctico: mostrar directamente el formulario de login completo
    const [ dataEmail, setDataEmail ] = useState("show-login");
    console.log(dataEmail);

    // Simplificamos: siempre mostrar el formulario de login completo (SignPassword)
    return (
        <div className="section--sign--client" >
            <SignPassword dataEmail={dataEmail} setData={setData} />
        </div>
    )
}
