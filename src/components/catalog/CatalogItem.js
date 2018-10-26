import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import variables from '../../styles/variables'

export default class SpecilizationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { imageUri, name, position, category, experience} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        style={styles.specItem}
      >
        <View style={styles.itemWrap}>
          <Image
            style={styles.specIcon}
            resizeMode='cover'
            source={imageUri}
          />
          <View style={styles.wrapTxt}>
            <Text style={styles.specItemText}>
              {name}
            </Text>
            <Text style={styles.specItemSubText}>
              {position}
            </Text>
          </View>
        </View>
        <View style={styles.arrowWrap}>
          <Icon ios='ios-arrow-forward' android="md-arrow-forward" style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  specItem: {
    
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10
  },
  itemWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  wrapTxt: {
    padding: 10,
    flexDirection: 'column',
  },
  specItemText: {
    fontSize: variables.fSize.medium,
    color: variables.colors.lightBlack,
  },
  specItemSubText: {
    fontSize: variables.fSize.normal,
    color: variables.colors.blue,
  },
  specIcon: {
    width: 70,
    height: 70,
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
    color: 'white',
    fontSize: variables.fSize.medium
  }
});