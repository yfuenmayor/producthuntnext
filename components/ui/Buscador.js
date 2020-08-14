import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
// Importamos el Router para redireccionar con valores 
import Router from 'next/router';

// Styled //
const ImputText = styled.input` 
    padding: 1rem;
    min-width: 300px;
    border: 1px solid var(--gris3);
 `;

const SubmitSearch = styled.button` 
    top: 1px;
    right: 1rem;
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-repeat: no-repeat;
    position: absolute;
    background-image: url('/static/img/buscar.png');
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
 `;

const Buscador = () => {

    // STATES //
    const [busqueda, setBusqueda] = useState('');

    // FUNCIONES //
    const buscarProducto = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return ;

        // Redireccionamos y enviamos el dato de la busqueda por metodo GET
        Router.push({
            pathname: '/buscar',
            //Pasamos los datos de la busqueda
            query: { q: busqueda}
        });
    }
    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={ buscarProducto}
        >
            <ImputText 
                type="text"
                placeholder="Buscar Productos"
                onChange = { e => setBusqueda(e.target.value) }
             />
            <SubmitSearch type="submit">Buscar</SubmitSearch>
        </form>
    );
};

export default Buscador;