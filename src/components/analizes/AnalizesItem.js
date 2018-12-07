import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, View} from 'native-base';
import Share from 'react-native-share';

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
    let {headTxt, dateTxt, pdf} = this.props;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <View style={styles.analizesItem}>
          <Text style={styles.txtHead}>{headTxt}</Text>
          <Text style={styles.txtDate}>{dateTxt}</Text>
          <TouchableOpacity
            onPress={() => {
              const shareOptions = {
                title: headTxt,
                subject: dateTxt,
                url: pdf,
              };
              Share.open(shareOptions);
            }}
            activeOpacity={0.8}
            style={styles.moreIcon}>
            <Image
              style={{width: 18, height: 20, justifyContent: 'center'}}
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
    justifyContent: 'center',
    paddingLeft: 5,
    width: 25,
    height: 30,
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: 'white'
  }
});