import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import {Rating} from 'react-native-ratings';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import {firebase} from '/Users/lilymaechling/Desktop/NeedOne/src/firebase/config.js';

const AddGameScreen = ({navigation, extraData}) => {
  const userID = extraData.id;
  const userName = extraData.fullName;
  const gamesRef = firebase.firestore().collection('games');

  const [games, setGames] = useState([]);
  const [T1PLayer1, setT1PLayer1] = useState(userName);
  const [T1PLayer2, setT1PLayer2] = useState('');
  const [T2PLayer1, setT2PLayer1] = useState('');
  const [T2PLayer2, setT2PLayer2] = useState('');
  const [T1, setT1] = useState(true);
  const [T2, setT2] = useState(false);
  const [rating, setRating] = useState(2.5);
  const [Comments, setComments] = useState('');

  // useEffect(() => {
  //   gamesRef
  //     .where('authorID', '==', userID)
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(
  //       (querySnapshot) => {
  //         const newGames = [];
  //         querySnapshot.forEach((doc) => {
  //           const game = doc.data();
  //           game.id = doc.id;
  //           newGames.push(game);
  //         });
  //         setGames(newGames);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //     );
  // }, []);

  // console.log('games: ', games);

  const onSubmitPress = () => {
    if (T1PLayer1 && T1PLayer1.length > 0 && T2PLayer1 && T2PLayer1.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        team1: [T1PLayer1, T1PLayer2],
        team2: [T2PLayer1, T2PLayer2],
        rating: rating,
        outcome: T1,
        comments: Comments,
        authorID: userID,
        createdAt: timestamp,
      };
      gamesRef
        .add(data)
        .then((_doc) => {
          setT1PLayer2('');
          setT2PLayer1('');
          setT2PLayer2('');
          setT1(true);
          setT2(false);
          setComments('');
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
    else {
      alert("There must be at least one player on each team.")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 26, fontWeight: '800'}}> Add Game </Text>
      <Text style={styles.title}>Input Players</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.5}}>
          <Text style={{alignSelf: 'center'}}>Team 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Player 1"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setT1PLayer1(text)}
            value={T1PLayer1}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Player 2"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setT1PLayer2(text)}
            value={T1PLayer2}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{alignSelf: 'center'}}>Team 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Player 1"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setT2PLayer1(text)}
            value={T2PLayer1}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Player 2"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setT2PLayer2(text)}
            value={T2PLayer2}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
      </View>
      <Text style={styles.title}>Who won?</Text>
      <View style={{flexDirection: 'row', margin: 20}}>
        <View style={{flexDirection: 'row', marginRight: 30}}>
          <CheckBox
            value={T1}
            onValueChange={(value) => {
              setT1(value);
              setT2(!value);
            }}
            style={styles.checkbox}
            boxType="square"
            onCheckColor="#00693e"
            onTintColor="#00693e"
          />
          <Text style={styles.label}>Team 1</Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 30}}>
          <CheckBox
            value={T2}
            onValueChange={(value) => {
              setT1(!value);
              setT2(value);
            }}
            style={styles.checkbox}
            boxType="square"
            onCheckColor="#00693e"
            onTintColor="#00693e"
          />
          <Text style={styles.label}>Team 2</Text>
        </View>
      </View>
      <Text style={styles.title}>Overall Game Rating</Text>
      <View style={{marginVertical: 20}}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={60}
          ratingBackgroundColor="#aaaaaa"
          onFinishRating={(rating) => setRating(rating)}
          fractions={1}
          style={{backgroundColor: '#aaaaaa'}}
        />
      </View>
      <Text style={styles.title}>Comments</Text>
      <TextInput
        style={styles.inputMultiLine}
        onChangeText={(text) => setComments(text)}
        value={Comments}
        placeholder="Input game comments here."
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSubmitPress()}>
        <Text style={styles.buttonTitle}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default AddGameScreen;
