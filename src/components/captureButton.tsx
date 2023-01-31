import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, ViewProps, TouchableOpacity } from 'react-native';
import type { Camera, PhotoFile, TakePhotoOptions, } from 'react-native-vision-camera';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function CaptureButton({ style, onPress }) {
    return (
        <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.4}>
            <IonIcon name="scan" color="white" size={36} />
        </TouchableOpacity>
    )
}