import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import {startCreatingUserWithEmailAndPassword} from '../store/auth/thunks';
 
export default function RegisterScreen({navigation}){

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const handleRegister = () => {
    dispatch(startCreatingUserWithEmailAndPassword({email, password}));
  }



  return (
    <View style={styles.container}>
 
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
        style={styles.loginBtnContainer}
        onPress={handleRegister}
        disabled={isCheckingAuthentication}
      >
        <Text
          style={styles.loginBtn}
        >SIGN IN</Text> 
      </Pressable>
      

      <View style={{margin:20}}>
        <Text style={styles.loginText}>
          Already have an account? 
          <Pressable 
            style={styles.registerBtn}
            onPress={() => {
              navigation.navigate('Auth')
            }}
          >
            <Text> Login</Text>
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
 
  loginBtnContainer: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#a5d6a7",
    textAlign:'center',
  },
  loginBtn:{
    width: '100%',
    backgroundColor:'transparent'
  }
});