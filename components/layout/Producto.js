import React from 'react';
import styled from '@emotion/styled';

const Imagen = styled.img` 
    width:200px;
 `;

const Producto = ({ producto }) => {
    // Destructuring 
    const { id, url, descripcion, nombre, empresa, urlimagen, comentarios, votos, fechaAlta } = producto;
    
    return (
        <li>
            <div className="">
                <div className="">
                    <Imagen src={urlimagen} />
                </div>
                <div className="">
                    <h1>{nombre}</h1>
                    <p>{descripcion}</p>

                    <div className="">
                        <img src="/static/img/comentario.png" alt=""/>
                        <p>{ comentarios.length } Comentarios</p>
                    </div>

                    <p>Publicado hace: {fechaAlta}</p>
                </div>
            </div>
            <div className="">

            </div>
        </li>
    );
};

export default Producto;