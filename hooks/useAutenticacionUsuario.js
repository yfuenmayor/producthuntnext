import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function userAutenticacion() {  
    // STATES //
    const [usuarioautenticado, setUsuarioautenticado] = useState(null);

    // UseEffect para verificar que el usuario este logueado //
    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged( usuario => {
            if (usuario) {
                setUsuarioautenticado(usuario);
            } else {
                setUsuarioautenticado(null);
            }
        });

        return () => unsuscribe;
    }, []);

    //Retornamos el usuario
    return usuarioautenticado;
    
}

export default userAutenticacion;