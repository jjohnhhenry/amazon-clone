export default function validationFormAdress(values) {
    let errors = {}

    if(values.province === "" || values.province === "--Selecciona una Categoría--"){
        errors.province = "*Seleccione una País"
    }
    if(values.name === "" ) {
        errors.name = "*El nombre es obligatorio"
    } 
    if(values.phone === "" ) {
        errors.phone = "*Este campo es obligatorio"
    } 
    if(values.streetOne === "" ) {
        errors.streetOne = "*Este campo es obligatorio"
    }
    if(values.streetTwo === "" ) {
        errors.streetTwo = "*Este campo es obligatorio"
    }
    if(values.city === "" ) {
        errors.city = "*Este campo es obligatorio"
    }
    if(values.state === "" ) {
        errors.state = "*Este campo es obligatorio"
    }
    if(values.code === "" ) {
        errors.code = "*Este campo es obligatorio"
    }

    return errors;
}