import { Dimensions, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const contentSpacing = 15;

const safeBottom =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const safeAreaPadding = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + contentSpacing,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + contentSpacing,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + contentSpacing,
  paddingBottom: safeBottom + contentSpacing,
};

// The maximum zoom _factor_ you should be able to zoom in
export const maxZoomFactor = 20;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Platform.select<number>({
  android: Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
  ios: Dimensions.get('window').height,
}) as number;

// Capture Button
export const captureButtonSize = 78;