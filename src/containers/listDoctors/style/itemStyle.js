import { StyleSheet } from 'react-native';
import variables, {scale} from '../../../styles/variables';
import {ACCENT_BLUE, BACKGROUND_BLUE} from '../../../styles/constants';

export const styles = StyleSheet.create({
  imgWrap: {
    width: '100%',
    height: scale(200),
		position: 'absolute',
		// backgroundColor: BACKGROUND_BLUE,
		top: scale(10),
    alignItems: 'center'
  },
  avatar: {
    width: scale(200),
		height: scale(200),
		borderRadius: scale(100),
		zIndex: 10
		// borderWidth: 1,
		// borderColor: ACCENT_BLUE,
    // position: 'absolute'
	},
	topContent: {
		height: scale(200),
		width: '100%',
		backgroundColor: BACKGROUND_BLUE,
		top: scale(-20)
	}
});
  
export const stylesHtml = StyleSheet.create({
    // p: {
    //   margin: 0,
    //   fontSize: variables.fSize.main, 
    //   fontFamily: MAIN_FONT, 
    //   color: MEDIUM_BLACK
    // },
    // ul: {
    //   marginTop: 0,
    //   padding: 0,
    // },
  });