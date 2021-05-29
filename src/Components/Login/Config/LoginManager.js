import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            return user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
            return errorMessage;
            // ...
        });
}