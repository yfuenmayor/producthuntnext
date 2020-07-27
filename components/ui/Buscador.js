import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

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
    return (
        <form
            css={css`
                position: relative;
            `}
        >
            <ImputText 
                type="text"
                placeholder="Buscar Productos"
             />
            <SubmitSearch type="submit">Buscar</SubmitSearch>
        </form>
    );
};

export default Buscador;