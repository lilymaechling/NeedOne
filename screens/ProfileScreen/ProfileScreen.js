import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight
} from 'react-native';
import {firebase} from '/Users/lilymaechling/Desktop/NeedOne/src/firebase/config.js';
import styles from './styles';

const ProfileScreen = ({navigation, extraData}) => {
  const userID = extraData.id;
  const userName = extraData.fullName;
  const gamesRef = firebase.firestore().collection('games');

  const [games, setGames] = useState([]);

  useEffect(() => {
    gamesRef
      //.where('authorID', '==', userID)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const newGames = [];
          querySnapshot.forEach((doc) => {
            const game = doc.data();
            game.id = doc.id;
            newGames.push(game);
          });

          setGames(newGames);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  console.log('games: ', games);

  const onSignOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch((error) => alert(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Profile Screen </Text>
      <Text style={styles.title}>Welcome, {userName}</Text>
      <FlatList
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => (
            <View style={[style.separator, highlighted && {marginLeft: 0}]} />
          ))
        }
        data={[{title: 'Title Text', key: 'item1'}]}
        renderItem={({item, index, separators}) => (
          <TouchableHighlight
            key={item.key}
            onPress={() => this._onPress(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={{backgroundColor: 'white'}}>
              <Text>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
      <TouchableOpacity onPress={() => onSignOutPress()} style={styles.button}>
        <Text style={styles.buttonTitle}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;
