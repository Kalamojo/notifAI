import { useState } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { contentSpacing, safeAreaPadding } from '../components/constants';

async function getSummarizeApi(text) {
    try {
      let response = await fetch(
        'https://kalamojo.pythonanywhere.com/api3?search=' + text,
      );
      let responseJson = await response.json();
      console.log(responseJson);
      alert(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}

const onSubmitEdit = (text) => {
    // whatever you want to do on submit
    let stuff = getSummarizeApi(text["nativeEvent"]["text"]);
    alert(stuff);
}

export default function InputScreen() {
    const [value, onChangeText] = useState('Input text to API');
    
    return (
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logoblack.png')}/>
        <TextInput
            editable
            multiline
            numberOfLines={20}
            maxLength={2000}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={text => getSummarizeApi(text["nativeEvent"]["text"])}
            value={value}
            style={{backgroundColor: 'rgb(60, 60, 60)', color: 'white', padding: 10}}
        />
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 80,
    position: 'absolute',
    alignSelf: 'center',
    top: safeAreaPadding.paddingTop - 20,
  },
})