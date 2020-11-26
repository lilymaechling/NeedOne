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
  const [parsedGames, setParsedGames] = useState([]);

  useEffect(() => {
    gamesRef
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
          parseGames(games);
        },
        (error) => {
          console.log(error);
        },
      );
  });

  //console.log('games: ', games);

  const parseGames = (games) => {
    const pGames = [];
    var x = 0;
    games.forEach((item) => {
      var data = {};
      if(item.outcome === true){
        data = {
          team1: item.team1,
          team2: item.team2,
          date: item.createdAt,
          outcome: 'Win',
          key: x.toString(),
        }
      } else {
        data = {
          team1: item.team1,
          team2: item.team2,
          date: item.createdAt,
          outcome: 'Loss',
          comments: item.comments,
          rating: item.rating,
          key:x.toString(),
        }
      }
      pGames.push(data);
      x=x+1;
    })
    setParsedGames(pGames);
  }

  //console.log("parsed:", parsedGames)
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
        data={parsedGames}
        renderItem={({item, index}) => (
            <View style={{backgroundColor: 'white', margin:10, alignItems:'center', borderRadius:10, padding:20}}>
              <Text style={{fontSize:20, fontWeight:'600'}}>{new Date(item.date.toDate()).toDateString()}     {item.outcome}</Text>
              <Text style={{alignSelf:'flex-start'}}>Team 1: {item.team1}</Text>
              <Text style={{alignSelf:'flex-start'}}>Team 2: {item.team2}</Text>
            </View>
        )}
      />
      <TouchableOpacity onPress={() => onSignOutPress()} style={styles.button}>
        <Text style={styles.buttonTitle}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default ProfileScreen;
