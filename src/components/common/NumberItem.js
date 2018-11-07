import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import variables from '../../styles/variables'

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
    render(){
        let {pressStatus} = this.state;
        const {value} = this.props
        return(
          <View style={{width: 60, height: 60, margin: 5, marginLeft: 15, marginRight: 15}}>
          {
            (this.props.text !== 'x' && this.props.text !== '<' )?
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
          </TouchableOpacity>: 
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.props.onClick(value)}
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
      backgroundColor: 'rgba(78, 158, 255, 0.1)',
    },
    ItemActive: {
      backgroundColor: variables.colors.blue,
      width: 60,
      height: 60,
      borderRadius: 30
      
    },
    Text: {
      top: 7,
      textAlign: 'center',
    //   top: 12,
    //   right: 50,
      fontSize: 38,
      lineHeight: 47,
      fontFamily: 'HelveticaNeue',
      color: variables.colors.darkBlue,
    },
    TextActive: {
      top: 7,
      textAlign: 'center',
    //   top: 12,
    //   right: 50,
      fontSize: 48,
      lineHeight: 47,
      fontFamily: 'HelveticaNeue',
      color: variables.colors.white,
    },
});
