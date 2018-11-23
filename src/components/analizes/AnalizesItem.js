import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables';

const { accentBlue, mediumBlack } = variables.colors;
const { mainFont } = variables.fonts;
const { normal, medium } = variables.fSize;

export default class AnalizesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {headTxt, dateTxt} = this.props;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <View style={styles.analizesItem}>
          <Text style={styles.txtHead}>{headTxt}</Text>
          <Text style={styles.txtDate}>{dateTxt}</Text>
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
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  analizesItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    position: 'relative',
    borderColor: accentBlue,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  txtHead: {
    color: mediumBlack,
    fontFamily: mainFont,
    fontSize: medium
  },
  txtDate: {
    marginTop: 5,
    color: mediumBlack,
    fontFamily: mainFont,
    fontSize: normal
  },
  moreIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    right: 5
  }
});