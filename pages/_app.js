import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
//Importamos hooks de autenticacion de usuario
import userAutenticacion from '../hooks/useAutenticacionUsuario';

const MyApp = props => {

    const usuario = userAutenticacion();
    const { Component, pageProps } = props;

    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    );
};

export default MyApp;