import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class SubServiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {pressStatus: false};
  }

  render() {
    let {pressStatus} = this.state;
    let {headTxt} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=> {
          if(pressStatus == false) {
            this.setState({ pressStatus: true });
          } else {
            this.setState({ pressStatus: false });
          }
        }}
        style={
          pressStatus
            ? styles.servItemActive
            : styles.servItem
          }
        >
        <Text style={
          pressStatus
            ? styles.servItemTextActive
            : styles.servItemText
          }>{headTxt}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  servItem: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10,
    padding: 10
  },
  servItemActive: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    backgroundColor: variables.colors.wiolet,
    marginBottom: 10,
    padding: 10
  },
  servItemText: {
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.medium,
    color: variables.colors.lightBlack,
    paddingLeft: 5
  },
  servItemTextActive: {
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.medium,
    color: 'white',
    paddingLeft: 5
  }
});