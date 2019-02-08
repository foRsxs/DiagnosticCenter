import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { WHITE, ACTIVE_LIGHT_GRAY, LIGHT_GRAY, DARK_BLUE, MAIN_FONT } from '../../styles/constants';

export default class NumberItem extends Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
  }
  _onHideUnderlay() {
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay() {
    this.setState({ pressStatus: true });
  }

  render() {
    let { pressStatus } = this.state;
    const { value, text } = this.props
    return (
      <View style={{ width: 60, height: 60, margin: 5, marginLeft: 15, marginRight: 15 }}>
        {
          (text !== 'x' && text !== '<') ?
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.props.onClick(value)}
              style={
                pressStatus
                  ? styles.ItemActive
                  : styles.Item
              }
              onPressOut={this._onHideUnderlay.bind(this)}
              onPressIn={this._onShowUnderlay.bind(this)}
            >
              <Text style={ pressStatus ? styles.TextActive : styles.Text }>
                {text}
              </Text>
            </TouchableOpacity> :
            <TouchableOpacity
              activeOpacity={1}
              style={{ width: 60, height: 60 }}
              onPress={() => this.props.onClick(value)}
              onPressOut={this._onHideUnderlay.bind(this)}
              onPressIn={this._onShowUnderlay.bind(this)}
            >
              <Text style={ pressStatus ? styles.TextActive : styles.Text }>
                {text}
              </Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Item: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: LIGHT_GRAY,
  },
  ItemActive: {
    backgroundColor: ACTIVE_LIGHT_GRAY,
    width: 60,
    height: 60,
    borderRadius: 30
  },
  Text: {
    top: 7,
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 47,
    fontFamily: MAIN_FONT,
    color: DARK_BLUE,
  },
  TextActive: {
    top: 7,
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 47,
    fontFamily: MAIN_FONT,
    color: WHITE,
  },
});
