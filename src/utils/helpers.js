import { Platform, Dimensions } from 'react-native';

const wSize = Dimensions.get('window');

export function isIphoneXorAbove() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((wSize.height === 812 || wSize.width === 812) || (wSize.height === 896 || wSize.width === 896))
  );
}
