
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {FirebaseAuth} from './config';

export const registerUserWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(resp);
        const { uid } = resp.user;

        return {
            ok: true,
            uid, email
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}


export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        console.log(resp);
        const { uid, email:userEmail } = resp.user;

        return {
            ok: true,
            uid, email:userEmail
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
