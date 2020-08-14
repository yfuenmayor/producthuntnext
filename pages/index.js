import React from 'react';
import Layout from "../components/layout/Layout";
import Producto from '../components/layout/Producto';
//Hooks que trae la lista de productos segun orden especifico
import useProductosLista from '../hooks/useProductosLista';

const Home = () => {

  const { productos } = useProductosLista('fechaAlta');
    
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
