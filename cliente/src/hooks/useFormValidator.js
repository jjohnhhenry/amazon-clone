import { useEffect, useState } from 'react'

const useFormValidator = (initialState, validator, action) => {

    const [ datosUser, setDatosUser ] = useState(initialState);
    const [ error, setError ] = useState({});
    const [ errorEffect, setErrorEffect ] = useState(false);

    const handleChangeSign = (e) => {

        setDatosUser({
            ...datosUser,
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        if(errorEffect) {
            if(Object.keys(error).length === 0){
                action();
            }
            setErrorEffect(false);
        }
        // eslint-disable-next-line
    }, [errorEffect])

    const handleClickForm = (e) => {
        e.preventDefault();
        const errorsValues = validator(datosUser);
        if(errorsValues) {
            setError(errorsValues);
            setErrorEffect(true);
        }
    }

    return {
        datosUser,
        error,
        handleChangeSign,
        handleClickForm
    }
};

export default useFormValidator;
