import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity, Alert } from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const userSignup = async () => {   
        if(!email || !password){
            Alert.alert("Please enter all the fields    ")
        } 
        else{
        try{
    await auth().createUserWithEmailAndPassword(email,password)
    }
    catch{
        Alert.alert("Something went wrong please try again later ")
    }
    }}


    return (
        <KeyboardAvoidingView>

        <View style={styles.view1}>
          <Image style ={{width:200,height:200}}  source={require('../images/logo.png')} />
          <Text style={styles.text}> Sign Up Here </Text>
        </View>

        <View style={styles.view2}>
            <TextInput label="E-mail" value={email} onChangeText={text =>setEmail(text)} mode="outlined" />
            <TextInput label="Password" value={password} onChangeText={text =>setPassword(text)} mode="outlined" secureTextEntry={true} />
        <Button  mode="contained" onPress={() =>userSignup() }>
        Sign Up
      </Button>
      <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{textAlign:"center"}}>Already existing account ?</Text></TouchableOpacity>

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
  
export default SignupScreen
