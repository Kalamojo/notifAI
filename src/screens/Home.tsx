import { useRef, useState, useEffect} from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useIsAppForeground } from '../components/useIsAppForeground'
import { useIsFocused } from '@react-navigation/native';

export default function Home() {  
  const [cameraAvailable, setCameraAvailable] = useState(null);

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
  
  const devices = useCameraDevices()
  const device = devices.back
  const isAppForeground = useIsAppForeground()
  const isFocused = useIsFocused()

  if (device == null || cameraAvailable == false) return <View style={styles.container}>
    <Text>Notifai requires camera functionality to work. Enable it in settings.</Text>
  </View>

  return (
    <View style={styles.container}>
    <Text>Notifai running</Text>
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isAppForeground && isFocused}
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
