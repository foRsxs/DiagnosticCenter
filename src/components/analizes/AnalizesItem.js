import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class AnalizesItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {headTxt, dateTxt} = this.props;
    return (
      <View style={styles.analizesItem}>
        <Text style={styles.txtHead}>{headTxt}</Text>
        <Text style={styles.txtDate}>{dateTxt}</Text>
        <TouchableOpacity
          onPress={() => Alert.alert('ok')}
          style={styles.sendIcon}>
          <Image
              resizeMode='contain'
              source={require('../../../assets/img/send.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  analizesItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  txtHead: {
    color: variables.colors.mediumBlack,
    fontSize: variables.fSize.large
  },
  txtDate: {
    color: variables.colors.lightBlack,
    fontSize: variables.fSize.normal
  },
  sendIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 15,
    right: 5
  }
});