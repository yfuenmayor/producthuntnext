import React, { useState } from 'react';
import Router from 'next/router';
import Layout from "../components/layout/Layout";
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
// VALIDACIONES FORM //
// Hooks de Validacion de formularios
import useFormValidation from '../hooks/useFormvalidation';
// Reglas de validaciones del form
import validarInicioSesion from '../rulesValidation/validarInicioSesion';
// Importamos FIREBASE 
import firebase from '../firebase'; 


const STATE_FORM = {
  email: '',
  password: ''
};

const Login = () => {

    // STATES // 
    const [error, setError] = useState(false);

    // Usamos el Hooks de FormValidation 
    const { valores, errores, handleChange, handleSubmit, handleBlur } = useFormValidation(STATE_FORM, validarInicioSesion, iniciarSesion );

    const { email, password } = valores;

    // Funcion para crear la cuenta
    async function iniciarSesion(){
        try {
          //Funcion de la clase de firebase de firebase/firebase para registrarnos en firebase
          await firebase.login(email, password);
          //Redireccionamos al inicio
          Router.push('/');
        } catch (error) {
          console.error('Hubo un error al iniciar sesión', error);
          setError(error.message);
        }
    }

  return (
    <div>
      <Layout>
        <>
          <h1 className="titulo">Iniciar Sesión</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
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
            <InputSubmit type="submit" value="Iniciar Sesión"/>
          </Formulario>
        </>
      </Layout>
    </div>
  )
  
}
export default Login