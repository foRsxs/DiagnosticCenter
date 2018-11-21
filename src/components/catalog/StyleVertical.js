import { StyleSheet, Dimensions } from 'react-native';
import variables from '../../styles/variables';

let {width, height} = Dimensions.get('window')

const { darkGray, backgroundBlue, lightBlack, blue, red } = variables.colors;
const { small, medium, normal} = variables.fSize

const styles = StyleSheet.create({
    itemWrap: {
      backgroundColor: backgroundBlue,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      width: '100%',
      flex: 1,
      height: 210
    },
    wrapTxt: {
      alignItems: 'center',
      width: '100%',
      padding: 5,
    },
    specItemText: {
      textAlign: 'center',
      lineHeight: 18,
      fontFamily: variables.fonts.mainFont,
      fontSize: medium,
      color: lightBlack,
    },
    specItemSubText: {
      fontFamily: variables.fonts.mainFont,
      fontSize: normal,
      color: blue,
    },
    specIcon: {
      width: '100%',
      height: height/5,
    },
    arrowWrap: {
      backgroundColor: red,
      width: '100%',
      height: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      color: 'white',
      fontFamily: variables.fonts.mainFont,
      fontSize: medium
    }
  });

  export default styles;