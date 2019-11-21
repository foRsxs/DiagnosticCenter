import { StyleSheet } from 'react-native';
import variables, {scale} from '../../../styles/variables';
import {
  MAIN_FONT,
  ACCENT_BLUE,
  BLACK,
  WHITE,
  COLOR_NEW_GRAY,
  COLOR_RED
} from '../../../styles/constants';

const { medium, large } = variables.fSize;


export default StyleSheet.create({
  itemOfCardImage: {
    width: scale(40),
    height: scale(40),
    marginRight: scale(20)
  },
  itemOfCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    backgroundColor: WHITE,
    paddingVertical: scale(10)
  },
  deleteText: {
    color: WHITE,
    fontSize: medium
  },
  deleteContainer: {
    justifyContent: 'center',
    backgroundColor: COLOR_RED,
    paddingLeft: scale(10),
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    width: '100%',
    height: scale(60)
  },
  textStyle: {
    fontSize: medium,
    color: ACCENT_BLUE,
    fontFamily: MAIN_FONT,
    marginBottom: scale(5)
  },
  itemElement: {
    paddingLeft: scale(20),
    paddingBottom: scale(10),
    paddingTop: scale(20),  
  },
  numberOfCard: {
    color: BLACK,
    fontSize: large
  },
  addNewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR_NEW_GRAY,
    borderBottomWidth: scale(1),
    borderTopColor: COLOR_NEW_GRAY,
    borderTopWidth: scale(1),
    paddingVertical: scale(10),
    paddingLeft: scale(10),
    paddingRight: scale(20)
  },
  addCardIcon: {
    height: scale(30),
  },
  arrowLogo: {
    height: scale(20),
    marginLeft: 'auto'
  },
  textItemStyle: {
    fontSize: large,
    color: BLACK,
    fontFamily: MAIN_FONT,
    marginBottom: scale(5)
  },
  addNewCardContainer: {
    marginBottom: scale(30)
  },
  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR_NEW_GRAY,
    borderBottomWidth: scale(1),
    borderTopColor: COLOR_NEW_GRAY,
    borderTopWidth: scale(1),
    paddingVertical: scale(10),
    paddingLeft: scale(15),
    paddingRight: scale(20)
  },
  bankCardIcon: {
    height: scale(30),
    marginRight: scale(5)
  },
  arrowLogo: {
    height: scale(20),
    marginLeft: 'auto'
  },
  textItemStyle: {
    fontSize: large,
    color: BLACK,
    fontFamily: MAIN_FONT,
    marginBottom: scale(5)
  },
  bankCardContainer: {
    marginBottom: scale(30)
  },
  iconSwipeImage: {
    height: scale(20),
    width: scale(20)
  }
});