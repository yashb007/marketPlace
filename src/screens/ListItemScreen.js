import React,{useState,useEffect} from 'react'
import { View, Text , FlatList, StyleSheet,Linking , Platform } from 'react-native'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListItemScreen = () => {
  const [items,setItems]  =useState([])
  const [loading,setLoading] = useState(false)
  
const getDetails =async () => {
  const querySnap =  await firestore().collection('ads').get()
  const result = querySnap.docs.map(docsnap => docsnap.data())
  setItems(result)
}

const openDial = (phone) => {
  if(Platform.OS === 'android'){
    Linking.openURL(`tel:${phone}`)
  }
  else{
    Linking.openURL(`telprompt:${phone}`)

  }
}


useEffect(()=>{
  getDetails()

  return ()=>{
    console.log("cleanup")
  }
},[])

 const renderItem =(item) => {
     return (
        <Card style ={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.description}</Paragraph>
          <Text>{item.year}</Text>
        </Card.Content>
        <Card.Cover source={{uri : item.image}} />
        <Card.Actions>
          <Button>Rs.{item.price}</Button>
          <Button onPress={()=>openDial(item.phone)}>Call Seller</Button>
        </Card.Actions>
      </Card>
     )
 }
  
    return (
        <View>
            <FlatList 
            data={items.reverse()}
            keyExtractor={item => item.phone}
            renderItem ={({item}) => renderItem(item)}
            onRefresh={()=>{
              setLoading(true)
              getDetails()
              setLoading(false)
          }}
          refreshing={loading}
          
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
  card : {
        margin:10,
        elevation : 4
  }
  });

export default ListItemScreen
