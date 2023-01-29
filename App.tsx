import { useRef, useState, useEffect} from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, BackHandler } from 'react-native';
import 'expo-dev-client';

export default function App() {  
    useEffect(() => {
      const getPermissions = async () => {
          const cameraPermission: string = await Camera.getCameraPermissionStatus()
          if (cameraPermission == "denied" || cameraPermission == "restricted") {
            Alert.alert('Notifai', 'You need to enable camera permissions to use Notifai!', [
              {
                text: 'Ok',
                onPress: () => BackHandler.exitApp()
              }
          ]);
          } else if (cameraPermission == "not-determined") {
            await Camera.requestCameraPermission()
            getPermissions();
          } 
      };
      getPermissions();
    }, []);
    
    const devices = useCameraDevices()
    const device = devices.back
  
    if (device == null) return <View style={styles.container}>
      <Text>Notifai requires camera to work.</Text>
    </View>

    return (
      <View style={styles.container}>
      <Text>Notifai running</Text>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
