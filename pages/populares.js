import React from 'react';
import Layout from "../components/layout/Layout";
import Producto from '../components/layout/Producto';
import useProductosLista from '../hooks/useProductosLista';


const Populares = () => {
  
  const { productos } = useProductosLista('votos');

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

export default Populares