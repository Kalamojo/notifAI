import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

async function getMoviesFromApi(text) {
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
    let stuff = getMoviesFromApi(text["nativeEvent"]["text"]);
    alert(stuff);
}

export default function Basic() {
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    
    return (
        <View
        style={{
            backgroundColor: value,
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
        }}>
        <TextInput
            editable
            multiline
            numberOfLines={20}
            maxLength={2000}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={text => getMoviesFromApi(text["nativeEvent"]["text"])}
            value={value}
            style={{padding: 10}}
        />
        </View>
    );
}