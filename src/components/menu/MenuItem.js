import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {Text} from 'native-base';
import colors from '../../styles/variables'

export default class LinkBtn extends Component {
  render() {
    return (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.onClick()}>
            <Image
                style={{width: 30, height: 30}}
                resizeMode='contain'
                source={require('../../../assets/img/menu-main-ic.png')}
            />
            <Text style={styles.menuItemText}>{this.props.label}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    menuItem: {
      padding: 10,
      alignItems: "center",
      flexDirection: 'row'
    },
    menuItemText: {
      fontSize: 16
    }
  });