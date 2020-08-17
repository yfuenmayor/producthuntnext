import React, { useState, useEffect, useContext} from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
// Importamos el CONTEXT
import { FirebaseContext } from '../../firebase';
//Componentes creados para formularios
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';
// 
import Layout from '../../components/layout/Layout';
import Error from '../../components/layout/Error404';

// STYLED //
const ContenedorProducto = styled.div` 
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
 `;

 const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
 `;
 

const Producto = () => {
    // STATES //
    const [producto, setProducto] = useState({});
    const [comentario, setComentario] = useState({});
    const [error, setError] = useState(false);
    //Estado para hacer la consulta a la base de datos dependiendo de la accion
    const [consultaDb, setConsultaDb] = useState(true);

    // Definimos el routing 
    const router = useRouter();
    //obtenemos los datos necesarios
    const { query: {id} } = router;

    //Context con las operaciones del crud de firebase //
    const { firebase, usuario } = useContext(FirebaseContext);

    //UseEffect
    useEffect(() => {
        if (id && consultaDb) {
            const obtenerProducto = async () => {
                //Obteniendo un registro por id - collection = "tabla"
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                
                //Validamos si existe el registro
                if(producto.exists) {
                    //guardamos en el state local
                    setProducto(producto.data());
                    //Pasamos a false la consulta
                    setConsultaDb(false);
                } else {
                    setError(true);
                    setConsultaDb(false);
                }

            }
            obtenerProducto();
        }
    }, [id]);

    //Condicionamos para mostrar un mensaje o spinner si se tarda la consulta - se puede mejorar OJO
    // if(Object.keys(producto).length === 0 && !error ) return 'Cargando...';

    // Destructuring del producto
    const { url, descripcion, nombre, empresa, urlimagen, creador, comentarios, votos, votantes, fechaAlta } = producto;

    ////////////// FUNCIONES /////////////

    //Funcion para la votacion del producto
    const votarProducto = async () => {
        //Validamos si esta logueado
        (!usuario) && router.push('/login');
        
        // Obtener y sumar votos
        const totalVotos = votos + 1;

        //Verificamos si ya el usuario logueado voto por la publicacion
        if(votantes.includes(usuario.uid)) return;

        //Guardamos el usuario que esta votando
        const votantesNew = [...votantes, usuario.uid];
        
        // Actualizar en la base de datos
        await firebase.db
            .collection('productos')
            .doc(id)
            .update({ 
                votos: totalVotos,
                votantes: votantesNew 
            });

        //Actualizar valor de state
        setProducto({ 
            ...producto,
            votos: totalVotos
        })

        //Cambiamos estado para hacer la consulta a la base de datos
        setConsultaDb(true);
    }

    //Funciones para agregar el comentario

    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const comentarioSubmit = async e => {
        e.preventDefault();

        (!usuario) && router.push('/login');

        //Informacion extra del comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Tomar copia de comentarios a agregarlos al array
        const newComentarios = [ ...comentarios, comentario];

        //Actualizamos en la base de datos
        await firebase.db
            .collection('productos')
            .doc(id)
            .update({ 
                comentarios: newComentarios,
            });

        //Actualizar el State local
        setProducto({
            ...producto,
            comentarios: newComentarios
        })

        //Cambiamos estado para hacer la consulta a la base de datos
        setConsultaDb(true);
    }
    
    //Funcion para saber si el usuario es creador del producto
    const esCreador = id => {
        if(creador.id == id) return true;
    }

    //Funcion para eliminar el producto
    const eliminarProducto = async () => {
        
        (!usuario || creador.id !== usuario.uid) && router.push('/login');

        try {
            //Eliminamos en la base de datos
            await firebase.db
                .collection('productos')
                .doc(id)
                .delete();
            // Redireccionamos
            router.push('/');
        } catch (error) {
            console.log(error); 
        }
    }

    //Retornamos el contenido del producto
    return (
       <Layout>
           <>

           {/* Mostamos spinner */}
           { (Object.keys(producto).length === 0 && !error ) && 'Cargando...'}

           {/* Mostamos error */}
           { error && <Error/> }

           {/* Mostamos producto */}
           { (Object.keys(producto).length > 0) && (

            <div className="contenedor"> 
                <h1 css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}>{ nombre }</h1>

                <ContenedorProducto>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow( new Date(fechaAlta), { locale: es }) }</p>
                        {/* <p>Publicado hace: {fechaAlta} por {creador.nombre}</p> */}

                        <img src={urlimagen} />
                        <p>{descripcion}</p>

                        { usuario && (
                            <>
                            <h2>Agrega tu comentario</h2>
                            <form 
                                onSubmit={comentarioSubmit}
                            >
                                <Campo>
                                    <input 
                                        type="text" 
                                        name="mensaje"
                                        onChange={comentarioChange}
                                    />
                                </Campo>
                                <InputSubmit
                                    type="submit"
                                    value="Agregar Comentario"
                                />
                            </form>
                            </>
                        )}

                        <h2 css={css`
                               margin: 2rem 0;
                            `}
                        >Comentarios</h2>
                        { comentarios.length === 0 ? 'Aún no hay comentarios' : (
                            <ul>
                                {comentarios.map( (comentario, i) => (
                                    <li 
                                        key={`${comentario.usuarioId}-${i}`}
                                        css={css`
                                            border: 1px solid #e1e1e1;
                                            padding: 2rem;
                                        `}
                                    >
                                        <p>{comentario.mensaje}</p>
                                        <p>Escrito por:
                                            <span
                                                css={css`
                                                    font-weight: bold;
                                                `}
                                            >
                                                {' '}{comentario.usuarioNombre}
                                            </span>
                                        </p>
                                        { esCreador(comentario.usuarioId) && <CreadorProducto>Creador</CreadorProducto>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <aside>
                        <Boton
                            target="_blank"
                            bgColor="true"
                            href={url}
                        >Visitar Web</Boton>

                        <div css={css`
                            margin-top: 5rem;
                        `}>
                            <p css={ css` 
                                text-align:center; 
                            `}>{votos} Votos</p>

                            {usuario && 
                                <Boton
                                   onClick={votarProducto}
                                >Votar</Boton>
                            }

                            { esCreador(usuario.uid) &&
                                <Boton
                                    onClick={eliminarProducto}
                                >Eliminar Producto</Boton>
                            }
                        </div>
                    </aside>
                </ContenedorProducto>


            </div> )}
           </>
       </Layout>
    );
};

export default Producto;