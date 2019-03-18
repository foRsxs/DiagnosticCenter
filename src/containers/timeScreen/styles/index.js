import {
  StyleSheet
} from 'react-native';

import variables, {scale} from '../../../styles/variables';
const {
  medium
} = variables.fSize;
import {
	WHITE,
  COLOR_BORDER,
  ACCENT_BLUE,
  MEDIUM_BLACK,
  BACKGROUND_BLUE,
  MAIN_FONT,
  DARK_GREY,
  BLACK
} from '../../../styles/constants';

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  timeItemWrap: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemBtn: {
    backgroundColor: BACKGROUND_BLUE,
		borderColor: ACCENT_BLUE,
    borderRadius: scale(10),
		borderWidth: 1,
		margin: scale(10),
		width: scale(70),
    paddingVertical: scale(5),
	},
	itemSlectedBtn: {
		backgroundColor: ACCENT_BLUE,
  },
  timeItemAvaliable: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: variables.fSize.large,
    fontFamily: MAIN_FONT,
    color: MEDIUM_BLACK
  },
  timeContainer: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingTop: scale(20)
  },
  unSelectedItem: {
    marginRight: scale(10),
    backgroundColor: BACKGROUND_BLUE,
    borderColor: ACCENT_BLUE,
    width: scale(10),
    height: scale(10),
    borderRadius: scale(15),
    borderWidth: 1
  },
  selectedItem: {
    marginRight: scale(10),
    backgroundColor: ACCENT_BLUE,
    width: scale(10),
    height: scale(10),
    borderRadius: 15
  },
  itemsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemsTxt: {
    color: DARK_GREY,
    fontFamily: MAIN_FONT,
    fontSize: medium
  },
  bottomWrap: {
    paddingVertical: scale(10),
    borderTopWidth: 1,
    borderColor: COLOR_BORDER,
    alignItems: 'center'
  },
  centerWrap: {
    alignItems: 'flex-start'
  },
  textTime: {
    color: BLACK
  }
});
