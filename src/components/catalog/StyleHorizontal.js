import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const { darkGray, backgroundBlue, lightBlack, blue, red } = variables.colors;
const { small, medium, normal} = variables.fSize

const styles = StyleSheet.create({
  bottomBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  addInfoText: {
    width: '70%',
    color: darkGray,
    fontFamily: variables.fonts.mainFont,
    fontSize: small
  },
  specItem: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: backgroundBlue,
    marginBottom: 10
  },
  itemWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  wrapTxt: {
    position: 'relative',
    paddingVertical: 10,
    paddingLeft: 70,
    paddingRight: 20,
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%',
    flexWrap: 'nowrap'
  },
  specItemText: {
    fontFamily: variables.fonts.mainFont,
    fontSize: medium,
    color: lightBlack,
  },
  specItemSubText: {
    fontSize: normal,
    color: blue,
  },
  specIcon: {
    position: 'absolute',
    left: 0,
    width: 60,
    height: 70,
  },
  arrowWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: red,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center' },
  icon: {
    color: 'white',
    fontFamily: variables.fonts.mainFont,
    fontSize: medium
    }
});

export default styles;