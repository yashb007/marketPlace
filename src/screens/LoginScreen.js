import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Alert } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    
const userLogin = async () => {   
  if(!email || !password){
      Alert.alert("Please enter all the fields    ")
  } 
  else{
  try{
await auth().signInWithEmailAndPassword(email,password)
Alert.alert("You are loged in")

}
catch{
  Alert.alert("Something went wrong please try again later ")
}
}}



    return (
        <KeyboardAvoidingView>

        <View style={styles.view1}>
          <Image style ={{width:200,height:200}}  source={require('../images/logo.png')} />
          <Text style={styles.text}> Please Login to Continue </Text>
        </View>

        <View style={styles.view2}>
            <TextInput label="E-mail" value={email} onChangeText={text =>setEmail(text)} mode="outlined" />
            <TextInput label="Password" value={password} onChangeText={text =>setPassword(text)} mode="outlined" secureTextEntry={true} />
        <Button  mode="contained" onPress={() => userLogin()}>
        Login
      </Button>
        <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={{textAlign:"center"}}>Don't have account ?</Text></TouchableOpacity>
      </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    view1:{
        alignItems:"center"
    },
    text:{
        fontSize:22
    },
    view2:{
        paddingHorizontal:40,
        height:"50%",
        justifyContent:"space-evenly"
    }

  });
  
export default LoginScreen
