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

const Tab = createBottomTabNavigator();

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

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;
