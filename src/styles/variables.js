import {
  Dimensions
} from 'react-native';

const {
  width: screenWidth,
  height: screenHeight
} = Dimensions.get('window');

let localWidth = (screenWidth >= screenHeight) ? screenHeight : screenWidth;

localWidth = (localWidth > 375) ? 375 : localWidth;

const widthCoef = localWidth / 375;

export const scale = (size) => widthCoef * size;

const variables = {
  fSize: {
    extralarge: scale(25),
    large: scale(20),
    medium: scale(17),
    main: scale(15),
    normal: scale(13),
    small: scale(10),
  }
}

export default variables;
