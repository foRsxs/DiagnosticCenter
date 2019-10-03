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

export const parse_query_string = (query) => {
  let vars = query.split("&");
  let query_string = {};
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    let key = decodeURIComponent(pair[0]);
    let value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      let arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}
