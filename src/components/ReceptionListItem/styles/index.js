import { StyleSheet } from 'react-native';
import variables from '../../../styles/variables';
import { BACKGROUND_BLUE, BLACK, ACCENT_BLUE, MAIN_FONT, RED, MEDIUM_BLACK } from '../../../styles/constants';

const { medium, normal, large, main } = variables.fSize;

export default StyleSheet.create({
  listWrap: {
		marginLeft: 0, 
		paddingLeft: 15, 
		paddingTop: 10, 
		paddingBottom: 10
	},
  moreIcon: {
    justifyContent: 'center',
    paddingLeft: 5,
    width: 25,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: 'transparent'
  },
  receptionItem: {
    alignItems: "flex-start",
    width: '100%',
    position: 'relative',
  },
  receptionItemDisable: {
    alignItems: "flex-start",
    width: '100%',
    position: 'relative',
    opacity: 0.5
  },
  txtHead: {
    color: BLACK,
    fontSize: large
  },
  txtHeadServ: {
    color: BLACK,
    fontFamily: MAIN_FONT,
    fontSize: main,
    paddingTop: 3
  },
  txtTime: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: medium
  },
  txtName: {
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    marginTop: 5
  },
  disableText: {
    textAlign: 'right',
    width: 50,
    height: 30,
    fontSize: normal,
    fontFamily: MAIN_FONT,
    color: RED,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})