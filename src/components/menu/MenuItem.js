import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import variables from '../../styles/variables'

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
  }
  _onHideUnderlay() {
    this.setState({ pressStatus: true });
  }
  _onShowUnderlay() {
      this.setState({ pressStatus: false });
  }
  render() {
    let {pressStatus} = this.state;
    let {imageUri, label} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.onClick()}
        style={
          pressStatus
            ? styles.menuItemActive
            : styles.menuItem
          }
          onPressIn={this._onHideUnderlay.bind(this)}
          onPressOut={this._onShowUnderlay.bind(this)}
        >
        <Image
          style={styles.menuIcon}
          resizeMode='contain'
          source={imageUri}
        />
        <Text style={
          pressStatus
            ? styles.menuItemTextActive
            : styles.menuItemText
          }>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 10,
    paddingLeft: 20,
    alignItems: "center",
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  menuItemActive: {
    padding: 10,
    paddingLeft: 20,
    alignItems: "center",
    flexDirection: 'row',
    borderColor: variables.colors.accentBlue,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  menuItemText: {
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.black,

  },
  menuItemTextActive: {
    fontSize: variables.fSize.large,
    fontFamily: variables.fonts.mainFont,
    color: variables.colors.accentBlue,

  },
  menuIcon: {
    width: 20, 
    height: 20, 
    marginRight: 15
  }
});