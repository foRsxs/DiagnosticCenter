import { Platform, Dimensions, Alert } from 'react-native';

const wSize = Dimensions.get('window');

export function isIphoneXorAbove() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((wSize.height === 812 || wSize.width === 812) || (wSize.height === 896 || wSize.width === 896))
  );
}

export function authAlert(t, navigation) {
  Alert.alert(
    t('common:actions_text.auth_text'),
    '',
    [
      {
        text: t('common:actions.cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      {text: t('common:actions.ok'), onPress: () => navigation.navigate('authorization') },
    ],
    {cancelable: false},
  );
}
