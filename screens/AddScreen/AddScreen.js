import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput} from 'react-native';
import {Rating} from 'react-native-ratings';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';

const AddGameScreen = ({navigation}) => {
  const [T1PLayer1, setT1PLayer1] = useState('');
  const [T1PLayer2, setT1PLayer2] = useState('');
  const [T2PLayer1, setT2PLayer1] = useState('');
  const [T2PLayer2, setT2PLayer2] = useState('');
  const [T1, setT1] = useState(true);
  const [T2, setT2] = useState(false);

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
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
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{flexDirection: 'row', marginRight: 30}}>
          <CheckBox
            value={T1}
            onValueChange={(value) => {
              setT1(value);
              setT2(!value);
            }}
            style={styles.checkbox}
            boxType="square"
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
          />
          <Text style={styles.label}>Team 2</Text>
        </View>
      </View>
      <Text style={styles.title}>Overall Game Rating</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={60}
        ratingBackgroundColor="#aaaaaa"
        onFinishRating={(rating) => ratingCompleted(rating)}
      />
    </SafeAreaView>
  );
};
export default AddGameScreen;
