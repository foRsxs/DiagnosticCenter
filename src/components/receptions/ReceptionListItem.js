import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables';

const {accentBlue, black, backgroundBlue, mediumBlack, red} = variables.colors;
const {mainFont} = variables.fonts;
const { medium, normal, main} = variables.fSize;

export default class ReceptionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false
    };
  }

  render() {

    let {headTxt, servTxt, timeTxt, nameTxt, disable, onPress} = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() => onPress()}
          activeOpacity={0.8}
          >
          <View 
            style={
              disable
                ? styles.receptionItemDisable
                : styles.receptionItem
              }>
            <Text style={styles.txtTime}>{timeTxt}</Text>
            <View style={{flexDirection: 'row',alignItems:'center', flexWrap: 'wrap',}}>
              <Text style={styles.txtHead}>{headTxt}</Text>
              <Text style={styles.txtHeadServ}>{servTxt}</Text>
            </View>
            <Text style={styles.txtName}>{nameTxt}</Text>
            { (!disable) && (
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.8}
                style={styles.moreIcon}>
                <Image
                  style={{width: 18, height: 20}}
                  resizeMode='contain'
                  source={require('../../../assets/img/more-icon.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        { (disable) && (
          <Text style={styles.disableText}>
            запись отменена
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receptionItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  receptionItemDisable: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
    opacity: 0.5
  },
  txtHead: {
    color: black,
    fontSize: medium
  },
  txtHeadServ: {
    color: black,
    fontFamily: mainFont,
    fontSize: normal,
    paddingTop: 3
  },
  txtTime: {
    color: accentBlue,
    fontFamily: mainFont,
    fontSize: main
  },
  txtName: {
    color: mediumBlack,
    fontFamily: mainFont,
    fontSize: normal,
    marginTop: 5
  },
  moreIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    right: 5
  },
  disableText: {
    textAlign: 'right',
    width: 50,
    height: 30,
    fontSize: normal,
    fontFamily: mainFont,
    color: red,
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});