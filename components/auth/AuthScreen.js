import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import {startLoginWithEmailPassword} from '../store/auth/thunks';


export default function App({navigation}){

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const {status, errorMessage} = useSelector(state => state.auth )
  const isAuthenticating = useMemo(() => {
    status === 'checking'
  }, [status])
 
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../images/soccerField.jpg")}/> */}
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <View display={!!errorMessage ? '' : 'none'}  style={{backgroundColor:'#feeaee'}}>
        <Text>
          {errorMessage}
        </Text>
      </View>
 
      <Pressable 
        style={styles.loginBtn}
        disabled={isAuthenticating}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </Pressable>

      <View style={{margin:20}}>
        <Text style={styles.loginText}>
          Don't have an account? 
          <Pressable 
            style={styles.registerBtn}
            onPress={() => {
              navigation.navigate('Register')
            }}
          >
            <Text> Register</Text>
          </Pressable>
        </Text>
      </View>
      
      
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    height:200,
    width:200,
  },
 
  inputView: {
    backgroundColor: "#a5d6a7",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#a5d6a7",
  },
  registerBtn:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});