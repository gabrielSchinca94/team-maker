import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { makeActive } from '../store/player/playersSlice';
import { startUpdatingPlayer, startRemovingPlayer } from '../store/player/thunks';

import CheckBox from 'expo-checkbox';
import Swal from 'sweetalert2';
import { 
    Menu,
    MenuOptions,
    MenuOption, 
    MenuTrigger} from 'react-native-popup-menu';

import * as Animatable from "react-native-animatable";

export const Player = ({ id, name, height, weight, selected, imageUrl}) => {
    console.log('player rendered')
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const handleClick = async(e) => {
        await dispatch(makeActive({id}))
        navigation.navigate('Profile');
    }

    const handleSelection = (sel) => {
        dispatch(startUpdatingPlayer({id, name, height, weight, selected:sel, imageUrl}));
    }

    const hanldeLongPress = () => {
        menu.open();
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRemovingPlayer({id}));
                // params.navigation.goBack();
                Swal.fire(
                    'Deleted!',
                    'Your player has been deleted.',
                    'success'
                )
            }
        })
        
    }

    let menu;

    const picture = (imageUrl) ?
        {uri:imageUrl} :
        require('./../images/defaultProfilePicture.jpg');

    return (
        <Animatable.View style={styles.container}  animation="fadeIn" easing="ease">
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={selected}
                    onValueChange={handleSelection}
                    style={styles.checkbox}
                />
            </View>
            
            <TouchableOpacity 
                style={{flex:1, paddingLeft:5}} 
                onPress={handleClick}
                onLongPress={hanldeLongPress}
            >
                <Menu
                    ref={c => menu = c}
                >
                    <MenuTrigger/>
                    <MenuOptions customStyles={{optionsContainer:{width:75}}}>
                        <MenuOption onSelect={handleDelete} >
                            <Text style={{color:'red'}}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                <View style={styles.formRow}>
                    <Image
                        style={{...styles.col, width: 50, height: 50}}
                        source={picture}
                    />
                    <View style={styles.col}>
                        <Text style={{alignSelf:'center'}}>{name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding:10,
      flexWrap:'wrap',
      flexBasis:'50%',
      position:'relative',
      alignItems: 'center',
    },
    formRow: {
        justifyContent: 'center',
        flexDirection:'row',
        width:'100%',
    },
    col: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
});