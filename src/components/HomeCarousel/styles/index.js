import { StyleSheet } from 'react-native';
import {scale} from '../../../styles/variables';

export default StyleSheet.create({
  wrapSlide: {
    elevation: 5,
    width: '100%',
    marginBottom: scale(20),
    marginTop: scale(20)
  },
  iconList: {
    width: '100%',
    height: '100%',
    borderRadius: scale(15),
  },
})