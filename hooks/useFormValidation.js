// Hook para la validacion de Formularios y envio de datos //

import React, { useState, useEffect } from 'react'

const useFormValidation = (stateInicial, validar, fn) => {

    const [valores, setValores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
       if (submitForm) {
           const noErrores = Object.keys(errores).length === 0;

           // Si no hay errores ejecutamos la funcion de submit del form
           if (noErrores) {
                fn(); //Funcion de Submit
           }

           //Devolvemos a false el submitForm
           setSubmitForm(false);
       }
    }, [errores]);

    //Función que guarda los valores de los inputs en el state en caliente
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    };

    // Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);  
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    // Funcion para mostrar los errores al hacer BLUR (perder foco del input)
    const handleBlur = () => {
        const erroresValidacion = validar(valores);  
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur
    }
};

export default useFormValidation;

