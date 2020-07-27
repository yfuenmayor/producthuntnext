export default function validarCrearCuenta(valores) {
    //Variable para almacenar errores 
    let errores = {};

    // 1.-Validar el nombre
    if (!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio"
    }
    // 2.-Validar el email
    if (!valores.email) {
        errores.email = "El Email es obligatorio"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
        errores.email = "Email no válido"
    }
    // 3.-Validar el password
    if (!valores.password) {
        errores.password = "El Password es obligatorio";
    } else if ( valores.password.length < 6) {
        errores.password = "El password debe contener al menos 6 caracteres";
    }

    return errores;
}