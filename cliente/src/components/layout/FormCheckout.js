import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import validationFormAdress from '../../helpers/validationFormAdress';


import '../../stylesComponents/formCheckout.css'

const GET_USER_CLIENT = gql`
    query getUserClient {
        getUserClient {
            id
            name
            surname
            address
            province
            city
        }
    }
`;

export default function FormCheckout({setShippingAddress, setCount}) {

    const provinces = ["Argentina", "Bélice", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", "Ecuador", "El Salvador", "Guatemala", "Guyana", "México", "Paraguay",
                        "Perú", "Suriname", "Uruguay", "Venezuela"
                    ]

    // Query to get user data for auto-filling form
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_CLIENT, {
        errorPolicy: 'ignore' // Ignora errores si el usuario no está autenticado
    });

    const initialState = {
        province: "",
        name: "",
        phone: "",
        streetOne: "",
        streetTwo: "",
        city: "",
        state: "",
        code: ""
    }

    const [dataForm, setDataForm] = useState(initialState);

    // Auto-fill form when user data is loaded
    useEffect(() => {
        if (userData?.getUserClient) {
            const user = userData.getUserClient;
            setDataForm({
                province: user.province || "",
                name: user.name && user.surname ? `${user.name} ${user.surname}` : "",
                phone: "", // No tenemos teléfono en UserClient, se mantiene vacío
                streetOne: user.address || "",
                streetTwo: "",
                city: user.city || "",
                state: "",
                code: ""
            });
        }
    }, [userData]);

    //const [ dataCheck, setDataCheck ] = useState();


    const handleClickForm = (e) => {
        e.preventDefault();
        const errors = validationFormAdress(dataForm)
        if(Object.keys(errors).length !== 0) {
            console.log("existe errores", errors)
        }

        if(Object.keys(errors).length === 0) {
            setShippingAddress(dataForm);
            setCount(c => c + 1)
        }
    }

    const handleChangeForm = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })

        //setDataCheck(e.target.checked);
    }

    const { province, name, phone, streetOne, streetTwo, city, state, code } = dataForm;

    return (
        <>
            <div className="section--info--checkout">
                <h2>Seleccionar una dirección de envío</h2>
                <p>Escribe una dirección de envío para este pedido. Indica también si la dirección de
                facturación es la misma que la dirección de envío introducida. Cuando hayas terminado,
                haz clic en el botón "Siguiente".  Si quieres que los productos se envíen a más de una dirección,
                haz clic en "Añadir otra dirección" para añadir otra dirección.
                </p>
                {userData?.getUserClient && (
                    <div style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #c3e6cb',
                        marginTop: '10px',
                        fontSize: '14px'
                    }}>
                        ✓ Los campos se han llenado automáticamente con tu información guardada. Puedes editarlos si es necesario.
                    </div>
                )}
            </div>
            <div className="form--checkout--adress">
                <h3>Agregar una nueva dirección</h3>
                <form>
                    <div className="section--checkout--form">
                        <div className="section--checkout--form--items">
                            <label className="checkou--form--label label--province">País o Región</label>
                            <select name="province" className="input--checkout input--select" onChange={handleChangeForm} value={province} >
                                <option>--Selecciona una Categoría--</option>
                                    {provinces.map(province => (
                                        <option key={province} >{province}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="section--checkout--form--items">
                            <label className="checkou--form--label label--name">Nombre completo (Nombre y apellidos)</label>
                            <input
                                className="input--checkout input--name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="section--checkout--form--items">
                            <label className="checkou--form--label label--phone">Número de teléfono</label>
                            <input
                                className="input--checkout input--phone"
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="section--checkout--form--items">
                            <label className="checkou--form--label label--street">Nombre de la calle</label>
                            <input
                                className="input--checkout one--street"
                                type="text"
                                name="streetOne"
                                value={streetOne}
                                placeholder="Nombre de la calle, nombre de la empresa"
                                onChange={handleChangeForm}
                            />
                            <input
                                className="input--checkout two--street"
                                type="text"
                                name="streetTwo"
                                value={streetTwo}
                                placeholder="Departamento, piso, unidad, edificio, etc."
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="section--checkout--form--items items--last--form">
                            <div className="section--checkout--form--items--items label--last--form">
                                <label className="checkou--form--label label--city">Ciudad</label>
                                <input
                                    className="input--checkout input--city"
                                    type="text"
                                    name="city"
                                    value={city}
                                    onChange={handleChangeForm}
                                />
                            </div>
                            <div className="section--checkout--form--items--items label--last--form">
                                <label className="checkou--form--label lebel--estate">Estado</label>
                                <input
                                    className="input--checkout input--estate"
                                    type="text"
                                    name="state"
                                    value={state}
                                    onChange={handleChangeForm}
                                />
                            </div>
                            <div className="section--checkout--form--items--items label--last--form">
                                <label className="checkou--form--label lebel--postal">Código Postal</label>
                                <input
                                    className="input--checkout input--postal"
                                    type="text"
                                    name="code"
                                    value={code}
                                    onChange={handleChangeForm}
                                />
                            </div>
                        </div>
                        <div className="section--checkout--form--items label--check">
                            <div className="section--type--check">
                                    <input
                                        className="input--checkout input--check"
                                        type="checkbox"
                                        name="check"
                                        //value={check}
                                        onChange={handleChangeForm}
                                    />
                                    <h5>Marcar como dirección preferida</h5>
                            </div>
                        </div>
                        <div className="btn--btn--checkout--form">
                            <button className="btn--btn--checkout" onClick={handleClickForm} >Usar esta dir</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
