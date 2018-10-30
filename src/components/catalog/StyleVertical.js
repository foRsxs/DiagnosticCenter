import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const { darkGray, backgroundBlue, lightBlack, blue, green } = variables.colors;
const { small, medium, normal} = variables.fSize

const styles = StyleSheet.create({
    itemWrap: {
      backgroundColor: backgroundBlue,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      width: '100%'
    },
    wrapTxt: {
      alignItems: 'center',
      width: '100%',
      padding: 5,
    },
    specItemText: {
      textAlign: 'center',
      lineHeight: 18,
      fontSize: medium,
      color: lightBlack,
    },
    specItemSubText: {
      fontSize: normal,
      color: blue,
    },
    specIcon: {
      width: '100%',
      height: 100,
    },
    arrowWrap: {
      backgroundColor: green,
      width: '100%',
      height: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      color: 'white',
      fontSize: medium
    }
  });

  export default styles;