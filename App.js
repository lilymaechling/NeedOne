import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faTrophy, faUser, faPlus, faTableTennis  } from '@fortawesome/free-solid-svg-icons'

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddScreen from './screens/AddScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import NeedOneScreen from './screens/NeedOneScreen';

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }


// const Tab = createBottomTabNavigator();

// const TabNavigation = () => {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: '#00693e',
//       }}>
//       <Tab.Screen 
//         name="Home"
//         component={HomeScreen} 
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesomeIcon icon={ faHome } color={color} size={size}/>
//           ),
//         }}  />
//       <Tab.Screen 
//         name="Leaderboard" 
//         component={LeaderboardScreen} 
//         options={{
//           tabBarLabel: 'Leaderboard',
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesomeIcon icon={ faTrophy } color={color} size={size}/>
//           ),
//         }}/>
//       <Tab.Screen 
//         name="Add Game" 
//         component={AddScreen} 
//         options={{
//           tabBarLabel: 'Add Game',
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesomeIcon icon={ faPlus } color={color} size={size}/>
//           ),
//         }}/>
//       <Tab.Screen 
//         name="NeedOne" 
//         component={NeedOneScreen} 
//         options={{
//           tabBarLabel: 'Need One',
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesomeIcon icon={ faTableTennis } color={color} size={size}/>
//           ),
//         }}/>
//       <Tab.Screen 
//         name="Profile" 
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesomeIcon icon={ faUser } color={color} size={size}/>
//           ),
//         }} />
//     </Tab.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <TabNavigation />
//     </NavigationContainer>
//   );
// };

// export default App;

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
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