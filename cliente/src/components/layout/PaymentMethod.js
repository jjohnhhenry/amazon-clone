import React, { useState } from 'react';

import InfoIcon from '@material-ui/icons/Info';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';

import cardCredit from '../../img/card-credit.png'
import gifCard from  '../../img/gifCard.png'
import '../../stylesComponents/paymentMethod.css'

export default function PaymentMethod({ setCount, onProcessPayment }) {
    const [showCreditCardForm, setShowCreditCardForm] = useState(false);
    const [creditCardData, setCreditCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
        }

        // Format expiry date
        if (name === 'expiryDate') {
            formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
            if (formattedValue.length > 5) return;
        }

        // Format CVV
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length > 3) return;
        }

        setCreditCardData({
            ...creditCardData,
            [name]: formattedValue
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!creditCardData.cardholderName.trim()) {
            newErrors.cardholderName = 'Nombre del titular requerido';
        }

        if (!creditCardData.cardNumber.replace(/\s/g, '') || creditCardData.cardNumber.replace(/\s/g, '').length < 13) {
            newErrors.cardNumber = 'Número de tarjeta inválido';
        }

        if (!creditCardData.expiryDate || creditCardData.expiryDate.length < 5) {
            newErrors.expiryDate = 'Fecha de expiración inválida';
        }

        if (!creditCardData.cvv || creditCardData.cvv.length < 3) {
            newErrors.cvv = 'CVV inválido';
        }

        return newErrors;
    };

    const handleProcessPayment = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setProcessing(true);
        setErrors({});

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (onProcessPayment) {
                await onProcessPayment(creditCardData);
            }

            // Move to next step (success page) after order is created
            setCount(c => c + 1);
        } catch (error) {
            setErrors({ general: 'Error al procesar el pago. Inténtalo de nuevo.' });
        } finally {
            setProcessing(false);
        }
    };

    const handleShowCreditCardForm = () => {
        setShowCreditCardForm(true);
    };

    return (
        <>
            <div className="section--options--payment--method">
                <h2>Selecciona un método de pago</h2>
                <div className="box--save--payment--method">
                    <div className="box--info--contained">
                        <div className="box--info">
                            <div className="box--contained--icon">
                                <InfoIcon />
                            </div>
                            <div className="box--contained--text--info">
                                <span className="box--text--text">Especifica a continuación cómo te gustaría realizar el pago y lo guardaremos como opción.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!showCreditCardForm ? (
                <div className="section--payment--method--display">
                    <h3>Agregar un método de pago</h3>
                    <div className="section--payment--method--display--items">
                        <div className="payment--method--items">
                            <div className="section--text--payment--method">
                                <strong className="text--title--payment">Tarjetas de crédito o débito</strong>
                                <small className="text--subtitle--payment">Amazon acepta las principales tarjetas de crédito y débito.</small>
                                <button
                                    className="bt--btn--save--info--target"
                                    onClick={handleShowCreditCardForm}
                                >
                                    Añadir una tarjeta de débito o crédito
                                </button>
                            </div>
                            <div className="section--img--payment--method">
                                <img src={cardCredit} alt="tarjetas de crédito" />
                            </div>
                        </div>
                        <div className="payment--method--items">
                            <div className="section--text--payment--method">
                                <strong className="text--title--payment">Tarjetas de regalo, cupones y códigos promocionales</strong>
                                <small className="text--subtitle--payment">Ingresa una tarjeta de regalo, código promocional o cupón</small>
                            </div>
                            <div className="section--img--payment--method">
                                <img src={gifCard} alt="tarjetas de regalo" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="section--credit--card--form">
                    <div className="credit--card--header">
                        <CreditCardIcon style={{ marginRight: '8px', color: '#232F3E' }} />
                        <h3>Agregar tarjeta de crédito o débito</h3>
                    </div>

                    <form className="credit--card--form">
                        <div className="form--group">
                            <label className="form--label">Nombre del titular de la tarjeta</label>
                            <input
                                type="text"
                                name="cardholderName"
                                value={creditCardData.cardholderName}
                                onChange={handleInputChange}
                                className="form--input"
                                placeholder="Nombre completo como aparece en la tarjeta"
                            />
                            {errors.cardholderName && <span className="error--text">{errors.cardholderName}</span>}
                        </div>

                        <div className="form--group">
                            <label className="form--label">Número de tarjeta</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={creditCardData.cardNumber}
                                onChange={handleInputChange}
                                className="form--input"
                                placeholder="1234 5678 9012 3456"
                            />
                            {errors.cardNumber && <span className="error--text">{errors.cardNumber}</span>}
                        </div>

                        <div className="form--row">
                            <div className="form--group form--group--half">
                                <label className="form--label">Fecha de expiración</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={creditCardData.expiryDate}
                                    onChange={handleInputChange}
                                    className="form--input"
                                    placeholder="MM/YY"
                                />
                                {errors.expiryDate && <span className="error--text">{errors.expiryDate}</span>}
                            </div>
                            <div className="form--group form--group--half">
                                <label className="form--label">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={creditCardData.cvv}
                                    onChange={handleInputChange}
                                    className="form--input"
                                    placeholder="123"
                                />
                                {errors.cvv && <span className="error--text">{errors.cvv}</span>}
                            </div>
                        </div>

                        {errors.general && <div className="error--text error--general">{errors.general}</div>}

                        <div className="security--notice">
                            <LockIcon style={{ fontSize: '16px', marginRight: '5px', color: '#007600' }} />
                            <small>Tu información está protegida con encriptación SSL de 256 bits</small>
                        </div>

                        <div className="form--actions">
                            <button
                                type="button"
                                className="btn--cancel"
                                onClick={() => setShowCreditCardForm(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn--process--payment"
                                onClick={handleProcessPayment}
                                disabled={processing}
                            >
                                {processing ? 'Procesando...' : 'Completar compra'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
