import React, { useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
// Dependencia para subir files a firebase
import FileUploader from 'react-firebase-file-uploader';
import Layout from "../components/layout/Layout";
import Error404 from '../components/layout/Error404';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
// VALIDACIONES FORM //
// Hooks de Validacion de formularios
import useFormValidation from '../hooks/useFormvalidation';
// Reglas de validaciones del form
import validarCrearProducto from '../rulesValidation/validarCrearProducto';
// Imprtamos el context para su uso
import { FirebaseContext } from '../firebase';

 
const STATE_FORM = {
  nombre: '',
  empresa: '',
  // imagen: '',
  url: '',
  descripcion: ''
};

const NuevoProducto = () => {

    // STATES // 
      const [error, setError] = useState(false);
      //Para las imagenes
      const [nombreImg, setNombreImg] = useState('');
      const [subiendo, setSubiendo] = useState(false);
      const [progreso, setProgreso] = useState(0);
      const [urlimagen, setUrlimagen] = useState('');

    //Context con las operaciones del crud de firebase //
    const { usuario, firebase } = useContext(FirebaseContext);

    // Usamos el Hooks de FormValidation 
    const { valores, errores, handleChange, handleSubmit, handleBlur } = useFormValidation(STATE_FORM, validarCrearProducto, crearProducto );

    const { nombre, empresa, url, descripcion } = valores;

    //Hook de Router para redireccionar
    const router = useRouter();

    //Funciones para subir la imagen
    const handleUploadStart = () => {
      setProgreso(0);
      setSubiendo(true);
    }

    const handleProgress = progreso => setProgreso({progreso});

    const handleUploadError = error => {
      setSubiendo(error);
      console.log(error);
    }

    const handleUploadSuccess = nombre => {
      setProgreso(100);
      setSubiendo(false);
      setNombreImg(nombre);
      firebase
            .storage
            .ref('productos')
            .child(nombre)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              setUrlimagen(url);
            });
    };
    
    

    // Funcion para crear la cuenta
    async function crearProducto(){
      
      if (!usuario) {
        return router.push('/login');
      }

      // Creamos el nuevo objeto producto con los datos adicionales como la  fecha de alta y otros
      const producto = {
          nombre,
          empresa,
          url,
          descripcion,
          urlimagen,
          votos: 0,
          comentarios: [],
          fechaAlta: Date.now(),
          creador: {
            id: usuario.uid,
            nombre: usuario.displayName
          },
          votantes: []
      }
        
      //Guardando en la DB de firebase
      firebase.db.collection('productos').add(producto);
      //Redireccionamos a la pagina principal del usuario
      return router.push('/');
      
    }

  return (
    <div>
      <Layout>
        { !usuario ? <Error404 /> : (
        <>
          <h1 className="titulo">Iniciar Sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend>Información General</legend>
            
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input 
                  type="text" 
                  name="nombre" 
                  id="nombre"
                  placeholder="Nombre del producto"
                  value={ nombre}
                  onChange={ handleChange }
                  onBlur={handleBlur}
                />
              </Campo>
              { errores.nombre && <Error>{errores.nombre}</Error> }

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input 
                  type="text" 
                  name="empresa" 
                  id="empresa"
                  placeholder="Nombre Empresa"
                  value={ empresa}
                  onChange={ handleChange }
                  onBlur={handleBlur}
                />
              </Campo>
              { errores.empresa && <Error>{errores.empresa}</Error> }

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <FileUploader 
                  name="imagen" 
                  id="imagen"
                  accept="image/*"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Campo>

              <Campo>
                <label htmlFor="url">URL</label>
                <input 
                  type="url" 
                  name="url" 
                  id="url"
                  placeholder="URL de tu producto"
                  value={ url}
                  onChange={ handleChange }
                  onBlur={handleBlur}
                />
              </Campo>
              { errores.url && <Error>{errores.url}</Error> }

            </fieldset>

            <fieldset>
              <legend>Sobre Tú Producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripción</label>
                <textarea 
                  name="descripcion" 
                  id="descripcion"
                  value={ descripcion}
                  onChange={ handleChange }
                  onBlur={handleBlur}
                />
              </Campo>
              { errores.descripcion && <Error>{errores.descripcion}</Error> }
            </fieldset>

            { error && <Error>{error}</Error> }
            <InputSubmit type="submit" value="Crear Producto"/>
          </Formulario>
        </>
        )}
      </Layout>
    </div>
  )
  
}
export default NuevoProducto