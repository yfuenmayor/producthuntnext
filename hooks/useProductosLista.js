import React, { useState, useContext, useEffect } from 'react';
//Context
import { FirebaseContext } from '../firebase';

const useProductosLista = orden => {

    // STATES //
    const [productos, setProductos] = useState([]);

    // CONTEXT //
    const { firebase } = useContext(FirebaseContext);     

    // USEEFFECTS //
    useEffect(() => {
    const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
    }
    obtenerProductos();
    }, []);

    //Funcion que trae y selecciona los registros de firebase
    function manejarSnapshot(snapshot){
    const productos = snapshot.docs.map( doc => {
        return {
        id: doc.id,
        ...doc.data()
        }
    });
    //Guardamos los productos en el state
    setProductos(productos);
    }

    return {
        productos
    }
}

export default useProductosLista;