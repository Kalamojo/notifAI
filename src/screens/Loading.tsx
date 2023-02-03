import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, Button, LogBox } from 'react-native';
import { contentSpacing, safeAreaPadding } from '../components/constants';
import BouncingPreloader from 'react-native-bouncing-preloader';

export default function Loading() {
    {/*const [value, onChangeText] = useState('Input text to API');*/}

    useEffect(() => {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])
    
    return (
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/logoblack.png')}/>
          <BouncingPreloader
            icons={[
              require('../../assets/notepad.png'),
              require('../../assets/pencil.png'),
            ]}
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