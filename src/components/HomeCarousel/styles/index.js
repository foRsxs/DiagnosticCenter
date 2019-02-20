import { StyleSheet, Dimensions } from 'react-native';

let Dheight = Dimensions.get('window').height;

export default StyleSheet.create({
  wrapSlide: {
    elevation: 5,
    width: '100%',
    height: Dheight / 3.3,
    marginBottom: 20,
    marginTop: 20
  },
  iconList: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
})