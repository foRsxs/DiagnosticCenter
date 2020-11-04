import { StyleSheet } from 'react-native';
import { scale } from '../../../styles/variables';
import {
  MAIN_FONT,
  LIGHT_GRAY
} from '../../../styles/constants';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  mainContent: {
    marginTop: scale(-10),
    zIndex: 1,
    paddingTop: scale(10)
  },
  loaderWrap: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: scale(16),
    paddingTop: scale(30),
    backgroundColor: '#fff'
  },
  header: {
    height: scale(50),
    backgroundColor: LIGHT_GRAY
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: MAIN_FONT
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: scale(40),
    backgroundColor: '#fff'
  },
  itemTopWrap: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scale(20)
  },
  itemTextWrap: {
    width: '50%'
  }
});
