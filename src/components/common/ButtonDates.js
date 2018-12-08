import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { Text } from 'native-base';
import variables from '../../styles/variables';

const { accentBlue, activeGray } = variables.colors;
const { mainFont } = variables.fonts;
const { medium, } = variables.fSize;

export default class CustomBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      sortedData: props.data,
      value: props.selected,
      id: null,
    }
    this.rotateValue = new Animated.Value(0)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.setState({ sortedData: this.props.data });
    if (prevProps.selected !== this.props.selected) this.setState({ value: this.props.selected });
  }

  render() {
    const { value } = this.state;
    const { contentContainerStyle, label, disabled } = this.props;
    const rotate = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
    })

    return (
      <View style={[(!disabled) ? styles.content : styles.contentDisabled, contentContainerStyle]}>
        <TouchableOpacity
          style={{ position: 'relative' }}
          activeOpacity={(disabled) ? 1 : 0.8}
          onPress={() => {
            if (disabled) return;
            this.props.onPress();
          }}
        >
          <Animated.Image
            style={{ width: 20, height: 15, position: 'absolute', left: 5, top: 12, transform: [{ rotate: rotate }] }}
            resizeMode='contain'
            source={require('../../../assets/img/arrow.png')}
          />
          <Text style={(!disabled) ? styles.text : styles.textDisabled}>{(value) ? value : label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    borderColor: accentBlue,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'white',
    height: 42
  },
  contentDisabled: {
    borderColor: accentBlue, 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 5, 
    position: 'relative', 
    backgroundColor: 'rgba(94, 150, 197, 0.1)', 
    height: 42
  },
  text: {
    color: 'black', 
    fontFamily: mainFont, 
    fontSize: medium, 
    paddingLeft: 30, 
    height: 40, 
    paddingTop: 10.5, 
    paddingRight: 10, 
    overflow: 'hidden'
  },
  textDisabled: {
    color: activeGray, 
    fontFamily: mainFont, 
    fontSize: medium, 
    paddingLeft: 30, 
    height: 40, 
    paddingTop: 10.5, 
    paddingRight: 10, 
    overflow: 'hidden'
  }
});
