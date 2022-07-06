import { doc, collection, setDoc, getDocs, deleteDoc, writeBatch } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { batch } from 'react-redux';

import {newEntry, setPlayers, update, updateImage, remove} from '../player/playersSlice';
import {uploadFile} from '../../helpers/uploadFile';
import { BackHandler } from 'react-native-web';

export const startNewPlayer = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        const newPlayer = {
            name:'',
            weight:75,
            height:175,
            selected:false,
            imageUrl:'',
        }

        const newDoc = doc(collection(FirebaseDB, `${ uid }/players/players`))
        console.log(newDoc, newDoc.id)
        await setDoc(newDoc, newPlayer);
        newPlayer.id = newDoc.id;

        dispatch(newEntry(newPlayer));

    }
}

export const startUpdatingPlayer = ({id, name, height, weight, selected, imageUrl}) => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        const player = {
            id, name, height, weight, selected, imageUrl
        };

        const docRef = doc(FirebaseDB, `${uid}/players/players/${player.id}`);
        await setDoc(docRef, player, {merge:true});

        dispatch(update({id, name, height, weight, selected, imageUrl}));

    }
}

export const startRemovingPlayer = ({id}) => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;

        if(!id) id = getState().players.active.id;
        
        const docRef = doc(FirebaseDB, `${uid}/players/players/${id}`);
        await deleteDoc(docRef);
        
        dispatch(remove({id}))

    }
}

export const startLoadingPlayers = () => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth;

        const collectionRef = collection(FirebaseDB, `${uid}/players/players`);

        const docs = await getDocs(collectionRef);
        
        const players = [];

        docs.forEach(doc => {
            players.push({id:doc.id, ...doc.data()});
        })

        dispatch(setPlayers(players));

    }
}

export const startBulkUpdatingPlayers = (sel) => {
    return async(dispatch, getState) => {
        console.log('bulk update')
        const { uid } = getState().auth;
        const { players } = getState().players;

        const batch = writeBatch(FirebaseDB);

        const plys = [];
        players.forEach((p) => {
            const player = {...p, selected:sel}
            plys.push(player);
            const docRef = doc(FirebaseDB, `${uid}/players/players/${player.id}`);
            batch.set(docRef, player, {merge:true});
        })

        await batch.commit();

        dispatch(setPlayers(plys))
    }
}

export const startUploadingFile = ({id, file}) => {
    return async(dispatch) => {

        const url = await uploadFile(file);

        dispatch(updateImage({id, url}));

    }
}