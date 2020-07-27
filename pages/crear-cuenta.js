import React, { useState } from 'react';
import Router from 'next/router';
import Layout from "../components/layout/Layout";
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
// VALIDACIONES FORM //
// Hooks de Validacion de formularios
import useFormValidation from '../hooks/useFormvalidation';
// Reglas de validaciones del form
import validarCrearCuenta from '../rulesValidation/validarCrearCuenta';
// Importamos FIREBASE 
import firebase from '../firebase'; 


const STATE_FORM = {
  nombre: '',
  email: '',
  password: ''
};

const CrearCuenta = () => {

    // STATES // 
    const [error, setError] = useState(false);

    // Usamos el Hooks de FormValidation 
    const { valores, errores, handleChange, handleSubmit, handleBlur } = useFormValidation(STATE_FORM, validarCrearCuenta, crearCuenta );

    const { nombre, email, password } = valores;

    // Funcion para crear la cuenta
    async function crearCuenta(){
        try {
          //Funcion de la clase de firebase de firebase/firebase para registrarnos en firebase
          await firebase.registrar(nombre, email, password);
          //Redireccionamos al inicio
          Router.push('/');
        } catch (error) {
          console.error('Hubo un error al registrar el usuario ', error);
          setError(error.message)
        }
    }

  return (
    <div>
      <Layout>
        <>
          <h1 className="titulo">Crear Cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                id="nombre"
                placeholder="Tu Nombre"
                value={ nombre}
                onChange={ handleChange }
                onBlur={handleBlur}
              />
            </Campo>
            { errores.nombre && <Error>{errores.nombre}</Error> }
            <Campo>
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                name="email" 
                id="email"
                placeholder="Tu Email"
                value={email}
                onChange={ handleChange }
                onBlur={handleBlur}
              />
            </Campo>
            { errores.email && <Error>{errores.email}</Error> }
            <Campo>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="Tu Password"
                value={password}
                onChange={ handleChange }
                onBlur={handleBlur}
              />
            </Campo>
            { errores.password && <Error>{errores.password}</Error> }
            { error && <Error>{error}</Error> }
            <InputSubmit type="submit" value="Crear Cuenta"/>
          </Formulario>
        </>
      </Layout>
    </div>
  )
  
}
export default CrearCuenta