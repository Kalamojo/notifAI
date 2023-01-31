import { useState, useEffect, useCallback} from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { contentSpacing, safeAreaPadding } from '../components/constants';
import { useIsAppForeground } from '../components/useIsAppForeground'
import CaptureButton from '../components/captureButton';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function Home() {  
  const [cameraAvailable, setCameraAvailable] = useState(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');

  useEffect(() => {
    const getPermissions = async () => {
        const cameraPermission: String = await Camera.getCameraPermissionStatus()
        if (cameraPermission == "denied" || cameraPermission == "restricted") {
          setCameraAvailable(false)
        } else if (cameraPermission == "not-determined") {
          await Camera.requestCameraPermission()
          getPermissions();
        } 
    };
    getPermissions();
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);

  const onCapture = () => {
    Alert.alert('Notifai', 'Snapshot has been taken', [
      {text: 'OK'},
    ]);
  }

  const devices = useCameraDevices()
  const device = devices.back
  const supportsFlash = device?.hasFlash ?? false;
  const isAppForeground = useIsAppForeground()
  const isFocused = useIsFocused()

  if (device == null || cameraAvailable == false) return <View style={styles.errorContainer}>
      <Image style={styles.errorLogo} source={require('../../assets/splash.png')}/>
    <Text style={{flex: 1, textAlign: "center", padding: 50}}>Notifai requires camera functionality to work. Enable it in settings.</Text>
  </View>
  else return (
    <View style={styles.container}>      
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isAppForeground && isFocused}
      />

      <Image style={styles.logo} source={require('../../assets/logo.png')}/>

      <CaptureButton style={styles.captureButton} onPress={onCapture}/>

      <View style={styles.rightButtonRow}>
        {supportsFlash && (
            <TouchableOpacity style={styles.button} onPress={onFlashPressed} activeOpacity={0.4}>
              <IonIcon name={flash === 'on' ? 'flash' : 'flash-off'} color="white" size={24} />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: safeAreaPadding.paddingBottom,
  },
  logo: {
    width: 100,
    height: 80,
    position: 'absolute',
    alignSelf: 'center',
    top: safeAreaPadding.paddingTop - 20,
  },
  errorLogo: {
    width: 400,
    height: 400,
    position: 'absolute',
    alignSelf: 'center',
  },
  button: {
    marginBottom: contentSpacing,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: safeAreaPadding.paddingRight,
    top: safeAreaPadding.paddingTop,
  },
});
