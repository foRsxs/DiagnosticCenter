import { Platform, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

let localWidth = (screenWidth >= screenHeight) ? screenHeight : screenWidth;
let localHeight = (screenWidth <= screenHeight) ? screenHeight : screenWidth;

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
