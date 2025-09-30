export default function validationLogin (values) {
    let errors= {};

    if(!values.email){
        errors.email = "* El e-mail es obligatorio"
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "* Email no válido"
    }

    if(!values.password) {
        errors.password = "* El password es obligatorio";
    }

    return errors;
}