import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import * as Animatable from "react-native-animatable";

const TeamsScreen = (params) => {
    const { team1, team2 } = params.route.params;

    let weightTeam1 = 0;
    for(let player of team1){
        weightTeam1 += player.weight;
    }

    let weightTeam2 = 0;
    for(let player of team2){
        weightTeam2 += player.weight;
    }

    return (
        <View style={styles.container}>
            <Animatable.View style={styles.header}  animation="bounceInDown" easing="ease-in">
                <View style={styles.headerText}>
                    <Text>Team 1 : </Text>
                </View>
                <View style={styles.headerText}>
                    <Text>Team 2 : </Text>  
                </View>
            </Animatable.View>
            <ScrollView>
                <View style={styles.teamsContainer}>
                    <View style={styles.team}>
                        { 
                            team1.map( player => (
                                <Animatable.View key={player.id} style={styles.player} animation="bounceInLeft" easing="ease-in">
                                    <Image 
                                        style={{...styles.col, width: 50, height: 50}}
                                        source={player?.imageUrl ? {uri:player.imageUrl} : require('./../images/defaultProfilePicture.jpg')}
                                    />
                                    <View style={styles.col}>
                                        <Text style={{alignSelf:'center'}}>{player.name}</Text>
                                    </View>
                                </Animatable.View>
                            ))
                        } 
                    </View>
                    <View style={styles.team}>
                        { 
                            team2.map( player => (
                                <Animatable.View key={player.id} style={styles.player} animation="bounceInRight" easing="ease-in">
                                    <Image 
                                        style={{...styles.col, width: 50, height: 50}}
                                        source={player?.imageUrl ? {uri:player.imageUrl} : require('./../images/defaultProfilePicture.jpg')}
                                    />
                                    <View style={styles.col}>
                                        <Text style={{alignSelf:'center'}}>{player.name}</Text>
                                    </View>
                                </Animatable.View>
                            ))
                            
                        } 
                    </View>
                </View>
            </ScrollView>
            <Animatable.View  style={styles.header}  animation="bounceInUp" easing="ease-in">
                <View style={styles.headerText}>
                    <Text>Total Weight: {weightTeam1} kgs</Text>
                </View>
                <View style={styles.headerText}>
                    <Text>Total Weight: {weightTeam2} kgs</Text>  
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    },
    teamsContainer:{
        flex:1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height:'70%',
        justifyContent: 'space-around',
    },
    team: {
        flex:1,
        width:'50%',
    },
    player: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        padding:5
    },
    header:{
        flexDirection: 'row',
    },
    headerText:{
        width:'50%',
        padding:5
    }
})

export default TeamsScreen;