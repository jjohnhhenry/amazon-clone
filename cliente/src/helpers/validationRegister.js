export default function validationRegister (values) {
    let errors= {};

    if(!values.name){
        errors.name = "* El nombre es obligatorio"
    }

    if(!values.email){
        errors.email = "* El e-mail es obligatorio"
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "* Email no válido"
    }

    if(!values.password) {
        errors.password = "* El password es obligatorio";
    }else if (values.password.length < 6) {
        errors.password = "* El password debe contener al menos 6 caracteres"
    }

    if(values.password !== values.confirmP) {
        errors.confirmP = "* El password no coincide";
    }

    return errors;
}