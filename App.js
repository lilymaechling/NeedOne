import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faTrophy, faUser, faPlus, faTableTennis  } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import AddScreen from './screens/AddScreen/AddScreen';
import LeaderboardScreen from './screens/LeaderScreen/LeaderboardScreen';
import NeedOneScreen from './screens/NeedOneScreen/NeedOneScreen';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegistrationScreen } from './screens'
import { firebase } from './src/firebase/config'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#00693e',
      }}>
      <Tab.Screen 
        name="Home"
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faHome } color={color} size={size}/>
          ),
        }}  />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen} 
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faTrophy } color={color} size={size}/>
          ),
        }}/>
      <Tab.Screen 
        name="Add Game" 
        component={AddScreen} 
        options={{
          tabBarLabel: 'Add Game',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faPlus } color={color} size={size}/>
          ),
        }}/>
      <Tab.Screen 
        name="NeedOne" 
        component={NeedOneScreen} 
        options={{
          tabBarLabel: 'Need One',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faTableTennis } color={color} size={size}/>
          ),
        }}/>
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faUser } color={color} size={size}/>
          ),
        }} />
    </Tab.Navigator>
  );
};

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    console.log("hello")
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, [user]);

  if (loading) {	
    return (	
      <ActivityIndicator size="large" />
    )	
  }
  console.log("user:", user)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user !== undefined ? (
          <Stack.Screen name="Main">
            {props => <TabNavigation {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}