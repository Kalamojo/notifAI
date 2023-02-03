import { useState } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { contentSpacing, safeAreaPadding } from '../components/constants';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Loading() {
    {/*const [value, onChangeText] = useState('Input text to API');*/}
    
    return (
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logoblack.png')}/>
        <LoadingSpinner color='#32a852' testID='Spinner' durationMs={100} />
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