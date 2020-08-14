import React, { useEffect, useState } from 'react';
import Layout from "../components/layout/Layout"
// Importamos useRouter para obtener los valores enviados por get
import { useRouter } from 'next/router';
import Producto from '../components/layout/Producto';
//Hooks que trae la lista de productos segun orden especifico
import useProductosLista from '../hooks/useProductosLista';


const Buscar = () => {

  // STATES //
  const [resultados, setResultados] = useState([]);
  
  // Hooks para obtener los productos de la BD
  const { productos } = useProductosLista('fechaAlta');

  //Forma de lectura del dato pasado por GET
  const router = useRouter();
  const { query: { q  }} = router;

  useEffect(() => {
    //definimos el valor como minuscula para que no tengamos problemas ya que JS diferencia las A de las a
    const busqueda = q.toLowerCase();

    // Filtramos la busqueda de los productos comparando todos los productos con la busqueda
    const filtro = productos.filter( producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    });

   // Guardamos resultados en el state local
   setResultados(filtro);
    
  }, [q, productos]);

   return (
    <>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              { resultados.map( producto => (
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

export default Buscar