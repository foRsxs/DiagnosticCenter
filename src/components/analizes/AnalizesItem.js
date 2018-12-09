import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'native-base';

import CShare from '../../components/common/CShare';
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
          <CShare url={pdf} title={headTxt} text={dateTxt} />
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
  }
});