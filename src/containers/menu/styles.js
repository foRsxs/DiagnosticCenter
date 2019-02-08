import {StyleSheet} from 'react-native';
import variables from '../../styles/variables'

import { BACKGROUND_BLUE, ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'white',
    paddingBottom: 20
  },
  header: {
    backgroundColor: BACKGROUND_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingLeft: 20,
    justifyContent: 'flex-start',
    paddingTop: 28,
    borderBottomWidth: 0,
    elevation: 0
  },
  headerTxt: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: variables.fSize.large
  },
  footer: {
    height: 80, 
    backgroundColor: 'transparent', 
    justifyContent: 'flex-start'
  }
});

export default styles;