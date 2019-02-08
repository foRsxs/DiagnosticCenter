import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import CShare from '../../components/common/CShare';

import variables from '../../styles/variables';
const { normal, medium } = variables.fSize;

import { MEDIUM_BLACK, ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';

export default class AnalizesItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { headTxt, dateTxt, pdf, isLoading } = this.props;

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <View style={styles.analizesItem}>
          <Text style={styles.txtHead}>{headTxt}</Text>
          <Text style={styles.txtDate}>{dateTxt}</Text>
          <CShare url={pdf} title={headTxt} text={dateTxt} isLoading={(value) => isLoading(value)} />
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
    paddingRight: 30,
    position: 'relative',
    borderColor: ACCENT_BLUE,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  txtHead: {
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: medium
  },
  txtDate: {
    marginTop: 5,
    color: MEDIUM_BLACK,
    fontFamily: MAIN_FONT,
    fontSize: normal
  }
});