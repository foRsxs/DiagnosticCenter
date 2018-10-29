import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
// import { Constants } from 'expo';

class PinBoxList extends Component {
  static propTypes = {
    pinValueLength: React.PropTypes.integer,
    pinLength: React.PropTypes.integer,
  };

  render() {
    return (
      <View
        style={styles.pinBoxList}>
        {this.renderPills()}
      </View>
    );
  }

  renderPills() {
    let pills = [];

    for (var i = 0; i < this.props.pinLength; i++) {
      pills.push(this.renderPill(i + 1));
    }

    return pills;
  }

  renderPill(index) {
    return (
      <PinBox
        key={index}
        hasValue={this.props.pinValueLength && this.props.pinValueLength >= index}
      />
    );
  }
}

class PinBox extends Component {
  static propTypes = {
    hasValue: React.PropTypes.boolean,
  };

  render() {
    return (
      <View style={styles.pinBox}>
        {this.renderText()}
      </View>
    );
  }
  
  renderText() {
    if (!this.props.hasValue) return null;
    
    return <Text>•</Text>;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxPinLength: 6,
      pinValue: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pinView}>
          <Text style={styles.pinPromptText}>Enter a passcode</Text>
          <PinBoxList pinLength={this.state.maxPinLength} pinValueLength={this.state.pinValue && this.state.pinValue.length} />
          <Text style={styles.pinPromptText}>{this.state.pinValue}</Text>
        </View>
        <TextInput
            autoFocus={true} 
            blurOnSubmit={false} 
            defaultValue={this.state.pinValue}
            enablesReturnKeyAutomatically={false}
            keyboardType='numeric' 
            maxLength={this.state.maxPinLength}
            onChangeText={this.onPinEntry}
            style={styles.input}/>
      </View>
    );
  }

  onPinEntry = (pinValue) => {
    if (pinValue.length && isNaN(pinValue)) return;
    
    this.setState({pinValue}, this.onPinEntered);
  }
  
  onPinEntered = () => {
    if (this.state.pinValue.length <= this.state.maxPinLength) return;
    
    // do something with the pin
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -99,
    // right: 0,
    // top: Constants.statusBarHeight,
  },
  pinBox: {
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    height: 30,
    width: 30,
    marginRight: 14,
    justifyContent: 'center'
  },
  pinBoxList: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pinView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(239, 239, 244)',
    // paddingTop: Constants.statusBarHeight + 100,
  },
  pinPromptText: {
    marginBottom: 10,
  }
});