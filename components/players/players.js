import React from 'react';
import { Player } from './player';
import { View } from 'react-native';
import { useSelector } from 'react-redux';


export const Players = () => {
    const { players } = useSelector( state => state.players );
    console.log('players rendered');
    return (
        <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-start', backgroundColor:'#fff'}}>
            {
                players.map( player => (
                    <Player key={ player.id } {...player} />
                ))
            }
        </View>
    )
       
}
