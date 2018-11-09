import React, {Component} from 'react';
import {StyleSheet, FlatList, Button, Text, View, Image, TouchableOpacity} from 'react-native';

import variables from '../../../styles/variables'

export default class Item extends Component {
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
    render(){
        let {pressStatus} = this.state;
        const {value} = this.props
        return(
          <View>
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
            <Text style={
            pressStatus
              ? styles.TextActive
              : styles.Text
            }>
            {this.props.text}
            </Text>
          </TouchableOpacity>
        </View>
        )
        
    }
}
const styles = StyleSheet.create({
    Item: {
      paddingBottom: 15,  
      height: 50,
    },
    ItemActive: {
      backgroundColor: variables.colors.blue,
      paddingBottom: 15, 
      height: 50,
      
    },
    Text: {
      textAlign: 'right',
      top: 12,
      right: 50,
      fontSize: 18,
      lineHeight: 30,
      fontFamily: variables.fonts.mainFont,
      color: variables.colors.mediumBlack,
    },
    TextActive: {
      textAlign: 'right',
      top: 12,
      right: 50,
      fontSize: 18,
      lineHeight: 30,
      fontFamily: variables.fonts.mainFont,
      color: variables.colors.white,
    },
});
