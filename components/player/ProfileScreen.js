import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, TextInput, StyleSheet, Image, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { startUploadingFile, startUpdatingPlayer, startRemovingPlayer } from '../store/player/thunks';
import Swal from 'sweetalert2';
import * as DocumentPicker from 'expo-document-picker';

const ProfileScreen = (params) => {
    console.log('profile')
    const dispatch = useDispatch();
    const { active:player } = useSelector( state => state.players );

    const [heightValue, setHeightValue] = useState(player ? player.height : 170);
    const [weightValue, setWeightValue] = useState(player ? player.weight : 75);
    const [name, setName] = useState(player ? player.name : '');

    const handleSave = () => {
        dispatch(startUpdatingPlayer({...player, name, height:heightValue, weight:weightValue}));
        params.navigation.goBack();
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
                console.log('id', player.id)
                dispatch(startRemovingPlayer({id:player.id}));
                params.navigation.goBack();
                Swal.fire(
                    'Deleted!',
                    'Your player has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleFileUpload = async() => {
        const file = await DocumentPicker.getDocumentAsync({});
        
        dispatch(startUploadingFile({file}));
    }

    const picture = (player?.imageUrl) ?
        {uri:player.imageUrl} :
        require('./../images/defaultProfilePicture.jpg');

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={picture}
                    style={{width: 200, height: 200}}
                />
                <Pressable
                    style={styles.uploadFileBtn}
                    onPress={handleFileUpload}
                >
                    <Icon name="upload-file" size={30} style={{margin:10}}/>
                </Pressable>

            </View>

            <View style={styles.formRow}>
                <View style={styles.leftCol}>
                    <Text>Name: </Text>
                </View>
                <View style={styles.rightCol}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} value={name} onChange={e => {setName(e.target.value)}}/>
                    </View>
                </View>
            </View>
            <View style={styles.formRow}>
                <View style={styles.leftCol}>
                    <Text>Weight: </Text>
                </View>
                <View style={styles.rightCol}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Slider
                            step={1}
                            minimumValue={45}
                            maximumValue={145}
                            value={weightValue}
                            onValueChange={val => setWeightValue(val)}
                            minimumTrackTintColor="#1fb28a"
                            maximumTrackTintColor="#d3d3d3"
                            thumbTintColor="#b9e4c9"
                        />
                        <Text
                            style={{paddingLeft:5}}
                        >
                            {weightValue} kgs
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.formRow}>
                <View style={styles.leftCol}>
                    <Text>Height: </Text>
                </View>
                <View style={styles.rightCol}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <Slider
                            step={1}
                            minimumValue={120}
                            maximumValue={220}
                            value={heightValue}
                            onValueChange={slideValue => setHeightValue(slideValue)}
                            minimumTrackTintColor="#1fb28a"
                            maximumTrackTintColor="#d3d3d3"
                            thumbTintColor="#b9e4c9"
                        />
                        <Text style={{paddingLeft:5}}>
                            {heightValue} cms
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                {
                    (player) && 
                        <Button
                            onPress={handleDelete}
                            title="Delete"
                            color="#dd3333"
                            style={{padding:20}}
                        ></Button>
                }

                
                
            </View>

            <Pressable
                onPress={handleSave}
                style={styles.fab}
            >
                <Icon name="save" size={30} style={{margin:10, color:'white'}}/>
            </Pressable>

        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding:20,
    },
    imageContainer:{
        flex:1,
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    formRow: {
        justifyContent: 'center',
        flexDirection:'row',
        width:'100%',
        padding:10,
    },
    leftCol: {
        flex:1,
    },
    rightCol: {
        flex:2,
    },
    input: {
        backgroundColor:'#f7f7f7',
        paddingLeft:'0.5em',
        paddingRight:'0.5em',
    },
    inputContainer:{
        border:'1px solid silver',
        borderRadius:'0.25em',
    },
    buttonContainer :{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'100%',
        alignItems: 'flex-end',
    },
    fab:{
        width: 50,  
        height: 50,   
        borderRadius: 30,
        backgroundColor: '#00c851',
        position: 'absolute',
        bottom: 15,
        right: 15,
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    }
});

export default ProfileScreen;