import * as React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { firebase } from '/Users/lilymaechling/Desktop/NeedOne/src/firebase/config.js'


const ProfileScreen = ({navigation}) => {
  const onSignOutPress = () => {
    firebase.auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch((error) => alert(error));
  }

  console.log("user:", this.extraData)
  return (
    <SafeAreaView>
      <Text> Profile Screen </Text>
      <TouchableOpacity onPress={ () => onSignOutPress()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;
