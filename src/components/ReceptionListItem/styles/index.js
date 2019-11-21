import { StyleSheet } from 'react-native';
import variables, {scale} from '../../../styles/variables';
import { GREEN, DARK_GREY, BLACK, ACCENT_BLUE, MAIN_FONT, RED, MEDIUM_BLACK } from '../../../styles/constants';

const { medium, normal, large, main } = variables.fSize;

export default StyleSheet.create({
  listWrap: {
		marginLeft: 0, 
		paddingLeft: scale(15), 
		paddingTop: scale(10), 
		paddingBottom: scale(10)
	},
  moreIcon: {
    justifyContent: 'center',
    paddingLeft: scale(5),
    width: scale(25),
    height: scale(30),
    position: 'absolute',
    top: scale(10),
    right: scale(50),
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
  headWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  txtHead: {
    color: BLACK,
    fontSize: large
  },
  txtTime: {
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    fontSize: medium,
  },
  txtPaymentPaid: {
    color: GREEN,
  },
  txtPaymentNotPaid: {
    color: DARK_GREY
  },
  subHeadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  txtName: {
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal,
    marginTop: scale(5)
  },
  disableText: {
    textAlign: 'right',
    width: scale(50),
    height: scale(30),
    fontSize: normal,
    fontFamily: MAIN_FONT,
    color: RED,
    position: 'absolute',
    bottom: scale(10),
    right: scale(10)
  }
})