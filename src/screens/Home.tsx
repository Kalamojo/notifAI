import { useState, useEffect, useCallback, useRef} from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { contentSpacing, safeAreaPadding } from '../components/constants';
import { useIsAppForeground } from '../components/useIsAppForeground';
import Spinner from 'react-native-loading-spinner-overlay';
import CaptureButton from '../components/captureButton';
import IonIcon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

export default function Home({ navigation }) {  
  const [cameraAvailable, setCameraAvailable] = useState(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [spinner, setSpinner] = useState(false);
  const [base64, setBase64] = useState(null);

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

  const devices = useCameraDevices()
  const device = devices.back
  const supportsFlash = device?.hasFlash ?? false;
  const isAppForeground = useIsAppForeground()
  const isFocused = useIsFocused()

  const camera = useRef<Camera>(null);

  const onCapture = async () => {
    setSpinner(true)
    const photo = await camera.current.takePhoto({
      flash: flash
    });
    RNFS.readFile('file://' + photo.path, 'base64').then(res =>{
      setBase64(res);
    });
    try {
      const body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "TEXT_DETECTION", maxResults: 1 },
            ],
            image: {
              content: base64
            }
          }
        ]
      });

      const response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB0E4ooUq6hOTaCDz5fSCTrZ2JH3wxX0oQ",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );

      const responseJson = await response.json()
      const responseText = responseJson.responses[0].fullTextAnnotation.text
      setSpinner(false)
      navigation.navigate("InputScreen", {text: responseText})

    } catch(err) {
      setSpinner(false)
      Alert.alert('Notifai', 'An error has occured. Please try again.', [
        {text: 'OK'},
      ]);
    }
  }

  if (device == null || cameraAvailable == false) return <View style={styles.errorContainer}>
      <Image style={styles.errorLogo} source={require('../../assets/splash.png')}/>
    <Text style={{flex: 1, textAlign: "center", padding: 50}}>Notifai requires camera functionality to work. Enable it in settings.</Text>
  </View>
  else return (
    <View style={styles.container}>      
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isAppForeground && isFocused}
        photo={true}
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

      <View style={styles.leftButtonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InputScreen')} activeOpacity={0.4}>
          <IonIcon name="copy" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: safeAreaPadding.paddingRight,
    top: safeAreaPadding.paddingTop,
  },
  leftButtonRow: {
    position: 'absolute',
    left: safeAreaPadding.paddingLeft,
    top: safeAreaPadding.paddingTop,
  },
})
