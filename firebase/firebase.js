import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

//Creamos la clase para que cada vez que se instancie se inicialice la app
class Firebase {
    constructor(){
        //Inicializamos la app de firebase
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        //Instanciamos auth
        this.auth = app.auth();
        //instanciamos ORM de firebase
        this.db = app.firestore();
        //Instanciamos el storage para almacenar la imagen en firebase
        this.storage = app.storage();
    }

    //Funcion para registrarnos
    async registrar(nombre, email, password) {
        //Registramos el usuario
        const nuevoUser = await this.auth.createUserWithEmailAndPassword(email, password);

        //Agregamos su nombre en los datos del display
        return await nuevoUser.user.updateProfile({
            displayName: nombre
        })
    }

    //Funcion para Iniciar Sesion
    async login(email, password) {
        //Logeamos el usuario
        return await this.auth.signInWithEmailAndPassword(email,password);
    }

    //Funcion para Cerrar la sesión
    async cerrarSesion() {
        await this.auth.signOut();
    }
};

const firebase = new Firebase();
export default firebase;