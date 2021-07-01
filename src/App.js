/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Feather from 'react-native-vector-icons/Feather'


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CreateAdScreen from './screens/createAdScreen';
import ListItemScreen from './screens/ListItemScreen';
import AccountScreen from './screens/AccountScreen';
import 'react-native-gesture-handler';
import {DefaultTheme ,Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, DefaultTheme as DefaultThemeNav } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};


const myTheme = {
  ...DefaultThemeNav,
  roundness: 2,
  colors: {
    ...DefaultThemeNav.colors,
    background:"#FFF"
  },
};

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
    <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator();


const TabNavigator = () => (
<Tab.Navigator  screenOptions={({ route }) => ({
  tabBarIcon: ({  color }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home'
    }
     else if (route.name === 'create') {
      iconName = 'plus-circle'
    }
    else if (route.name === 'account') {
      iconName = 'user'
    }
    // You can return any component that you like here!
    return  <View style={{borderWidth:15,borderColor:"#fff",borderRadius:30}}><Feather name={iconName} size={30} color={color} /></View>
  },
})}
tabBarOptions={{
  activeTintColor: 'deepskyblue',
  inactiveTintColor: 'gray',
}}>
<Tab.Screen name="Home" component={ListItemScreen} options ={{title:""}} />
<Tab.Screen name="create" component={CreateAdScreen} options ={{title:""}} />
<Tab.Screen name="account" component={AccountScreen} options ={{title:""}} />
</Tab.Navigator>

)

const Navigation = () => {
  const [user,setUser] = useState("")
  useEffect(()=>{

   const unsubscribe =  auth().onAuthStateChanged((userExist)=>{
      if(userExist){
          setUser(userExist)
      }
      else{
        setUser("")
      }
    })
      return unsubscribe
  },[])
  return(
  <NavigationContainer theme={myTheme}>
    {user ?  <TabNavigator />  :<AuthNavigator /> } 
</NavigationContainer>
)}


const App = ()  => {
  
  return (
    <>
    <PaperProvider theme={theme}>
    <StatusBar barstyle="dark-content" backgroundColor="deepskyblue"/>

     <View style={styles.container}>
    <Navigation />
          </View>
          </PaperProvider>
  </>       
   );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  }
});

export default App;
