import { StyleSheet, Platform } from 'react-native';

import { isIphoneXorAbove } from '../../../utils/helpers';
import variables, {scale} from '../../../styles/variables';
const { medium } = variables.fSize;
import { MAIN_FONT, COLOR_RED, BLACK } from '../../../styles/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  containerScanner: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  сontainerResult: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  resultWrapper: {
    padding: scale(25)
  },
  itemFields: {
    marginBottom: scale(5)
  },
  itemTitle: {
    fontWeight: '600'
  },
  closeBtn: {
    position: 'absolute',
    right: scale(25),
    width: scale(30),
    height: scale(30),
    top: (Platform.OS === 'ios' && isIphoneXorAbove()) ? scale(45) : scale(25),
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  barcodeArea: {
    borderWidth: 1,
    width: scale(250),
    height: scale(250),
    borderColor: COLOR_RED
  },
  text: {
    fontFamily: MAIN_FONT,
    fontSize: medium,
    lineHeight: scale(29),
    textAlign: 'center',
    color: BLACK
  }
});