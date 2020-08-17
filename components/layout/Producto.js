import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

const Imagen = styled.img` 
    width:200px;
 `;


// Stayled component para productos

const ProductoContainer = styled.li`
    padding: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;

    :hover {
        cursor: pointer;
    }
`;

const TextoDescripcion = styled.p`
    font-size: 1rem;
    margin: 0;
    color: #888;
`;

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 1rem 3rem;
    border: 1px solid #e1e1e1;

    div {
        font-size: 2rem;
    }

    p {
        margin: 0; 
        font-size: 2rem;
        font-weight: 700;
    }
`;


const Producto = ({ producto }) => {
    // Destructuring 
    const { id, url, descripcion, nombre, empresa, urlimagen, comentarios, votos, fechaAlta } = producto;
    
    return (
        <ProductoContainer>
            <DescripcionProducto>
                <div className="">
                    <Imagen src={urlimagen} />
                </div>
                <div className="">
                    <Link href="/producto/[id]" as={`/producto/${id}`}>
                        <Titulo>{nombre}</Titulo>
                    </Link>
                    <TextoDescripcion>{descripcion}</TextoDescripcion>

                    <Comentarios>
                        <div>
                            <img src="/static/img/comentario.png" alt=""/>
                            <p>{ comentarios.length } Comentarios</p>
                        </div>
                    </Comentarios>

                    <p>Publicado hace: {formatDistanceToNow( new Date(fechaAlta), { locale: es }) }</p>
                    {/* <p>Publicado hace: {fechaAlta}</p> */}
                </div>
            </DescripcionProducto>
            <Votos>
                <div> &#9650; </div>
                <p>{ votos }</p>
            </Votos>
        </ProductoContainer>
    );
};

export default Producto;