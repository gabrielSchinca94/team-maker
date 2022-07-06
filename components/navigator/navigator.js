import React, {useMemo, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../home/HomeScreen';
import ProfileScreen from '../player/ProfileScreen';
import TeamsScreen from '../teams/TeamsScreen';
import AuthScreen from '../auth/AuthScreen';
import RegisterScreen from '../auth/RegisterScreen';
import {ScheduleScreen} from '../schedule/ScheduleScreen';

import {CheckingAuth} from '../ui/components/CheckingAuth';

import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';

import {startLogout} from '../store/auth/thunks';
import {login} from '../store/auth/authSlice';

import {startLoadingPlayers} from '../store/player/thunks';


const Stack = createNativeStackNavigator();
export const Navigator = () => {

    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
      
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if(!user) return dispatch(startLogout());

            const {uid, email} = user;
            dispatch(login({uid, email}))
            dispatch(startLoadingPlayers())
        })

    }, [])
    
    const isSignedIn = useMemo(() => status === 'authenticated', [status]);
    
    if(status === 'checking') {
        return <CheckingAuth/>
    }

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
            { (isSignedIn) ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            headerRight: () => (
                                <Pressable
                                    onPress={handleLogout}
                                >
                                    <Icon name="logout" size={30} style={{margin:10}}/>
                                </Pressable>
                            )
                        }}
                        
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                    />
                    <Stack.Screen
                        name="Teams"
                        component={TeamsScreen}
                    />
                    <Stack.Screen
                        name="Schedule"
                        component={ScheduleScreen}
                    />
                </>
                ) : (
                <>
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreen}
                        options={{
                            title: 'Welcome',
                        }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            title:'Sign In'
                        }}
                    />
                </>
                )
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
