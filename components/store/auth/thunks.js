import {registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase} from '../../firebase/providers';
import { clearPlayersOnLogout } from '../player/playersSlice';
import {checkingCredentials, logout, login} from './authSlice';


export const checkingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
    }
}

export const startCreatingUserWithEmailAndPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const {ok, uid, email:userEmail, errorMessage} = await registerUserWithEmailPassword({ email, password });
        
        if ( !ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login( {uid, email:userEmail} ))
    }
}


export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const {ok, uid, email:userEmail, errorMessage} = await loginWithEmailPassword({ email, password });

        if ( !ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login( {uid, email:userEmail} ));


    }
}


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch(clearPlayersOnLogout());
        dispatch( logout() );

    }
}