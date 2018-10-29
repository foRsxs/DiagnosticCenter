import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class ServiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {headTxt} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        style={styles.servItem}
        >
        <View style={styles.servItemTextWrap}>
          <Text style={styles.servItemText}>{headTxt}</Text>
        </View>
        <View style={styles.arrowWrap}>
          <Icon ios='ios-arrow-forward' android="md-arrow-forward" style={styles.icon} />
        </View>
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
    marginBottom: 10
  },
  servItemTextWrap: {
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'row', 
    padding: 10
  },
  servItemText: {
    fontSize: variables.fSize.medium,
    color: variables.colors.lightBlack,
    paddingLeft: 5
  },
  arrowWrap: {
    backgroundColor: variables.colors.green,
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10, 
    width: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color:'white',  
    fontSize: variables.fSize.medium
  }
});