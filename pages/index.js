import React, { useState, useEffect, useContext } from 'react';
import Layout from "../components/layout/Layout";
//Context
import { FirebaseContext } from '../firebase';
import Producto from '../components/layout/Producto';


const Home = () => {

    // STATES //
    const [productos, setProductos] = useState([]);

    // CONTEXT //
    const { firebase } = useContext(FirebaseContext);

    // USEEFFECTS //
    useEffect(() => {
      const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy('fechaAlta', 'desc').onSnapshot(manejarSnapshot);
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


  return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              { productos.map( producto => (
                <Producto 
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
