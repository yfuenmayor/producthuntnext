export default function validarCrearProducto(valores) {
    //Variable para almacenar errores 
    let errores = {};

    // 1.-Validar el nombre
    if (!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio"
    }
    // 2.-Validar la empresa
    if (!valores.empresa) {
        errores.empresa = "El Nombre de la Empresa es obligatorio"
    }
    // 3.-Validar el nombre
    if (!valores.url) {
        errores.url = "La URL del producto es obligatoria"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "La URL es invalida"
    }

    // 4.-Validar la descripcion
    if (!valores.descripcion) {
        errores.descripcion = "Agrega una descripción a tu producto."
    }

    // 5.- Validacion de imagen: NO se hace ya que usaremos la dependencia ->
    
    

    return errores;
}