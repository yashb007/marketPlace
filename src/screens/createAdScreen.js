import React,{useState} from 'react'
import { View, Text ,StyleSheet,KeyboardAvoidingView,Alert} from 'react-native'
import { TextInput,Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { add } from 'react-native-reanimated';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const CreateAdScreen = () => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [year,setYear] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [image,setImage] = useState('')

  const postdata = async () => {
   try {
     if(!name || !description ||!year ||!price || !phone){
       Alert.alert("Fill all the fields.")
       return
     }
    await firestore().collection('ads')
    .add({
      name,
      description,
      year,
      price,
      phone,
      image,
      uid:auth().currentUser.uid,
    })
    Alert.alert("Ad posted")
    setName("")
    setDescription("")
    setYear("")
    setPhone("")
    setPrice("")
  }
  catch(error){
      Alert.alert("Something went wrong")
  }
}

const openCamera = () => {
  launchImageLibrary({quality:0.5},(fileObj)=>{
    console.log("open")
   const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileObj.uri)
   uploadTask.on('state_changed', 
   (snapshot) => {
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    if(progress==100){
      alert("Uploaded")
    }     
   }, 
   (error) => {
     alert("Something went wrong")
   }, 
   () => {
     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setImage(downloadURL)
    });
   }
 );
  })
}

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Ad!</Text>
            <TextInput label="Ad-Title" value={name} onChangeText={text =>setName(text)} mode="outlined" />
            <TextInput label="Description" value={description} onChangeText={text =>setDescription(text)} mode="outlined" numberOfLines={4} multiline={true} />
            <TextInput label="Year of purchase" value={year} onChangeText={text =>setYear(text)} mode="outlined" keyboardType="numeric"/>
            <TextInput label="Price of product" value={price} onChangeText={text =>setPrice(text)} mode="outlined" keyboardType="numeric"/>
            <TextInput label="Phone Number of owner" value={phone} onChangeText={text =>setPhone(text)} mode="outlined" keyboardType="numeric"/>
            <Button icon="camera"  mode="contained" onPress={() => openCamera()}>
            Upload pitcure of product
          </Button>
          <Button disabled={image?false:true}   mode="contained" onPress={() => postdata()}>
            Post
          </Button>
      
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    flex:1,
        marginHorizontal:30,
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:22,
        textAlign:"center"
    }

  });
  

export default CreateAdScreen
