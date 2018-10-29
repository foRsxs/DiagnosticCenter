import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import variables from '../../styles/variables';
import Rating from '../common/Rating';
import horizontalStyles from './StyleHorizontal';

const { darkGray, backgroundBlue, lightBlack, blue, green } = variables.colors;
const { small, medium, normal} = variables.fSize

export default class CatalogListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { imageUri, name, position, category, experience, horizontalView} = this.props;
    return (
      horizontalView ? (
        <TouchableOpacity
          onPress={() => this.props.onClick()}
          style={horizontalStyles.specItem}
          >
          <View style={horizontalStyles.itemWrap}>
            <Image
              style={horizontalStyles.specIcon}
              resizeMode='cover'
              source={imageUri}
            />
            <View style={horizontalStyles.wrapTxt}>
              <Text style={horizontalStyles.specItemText}>
                {name}
              </Text>
              <Text style={horizontalStyles.specItemSubText}>
                {position}
              </Text>
              <View style={horizontalStyles.bottomBlock}>
                <Text style={horizontalStyles.addInfoText}>
                  {category} | стаж: {experience} лет 
                </Text>
                <Rating rating={3.5} ratingMinimal={true}/>
              </View>
            </View>
          </View>
          <View style={horizontalStyles.arrowWrap}>
            <Icon ios='ios-arrow-forward' android="md-arrow-forward" style={horizontalStyles.icon} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => this.props.onClick()}
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
            <View style={styles.arrowWrap}>
              <Icon ios='ios-arrow-down' android="ios-arrow-down" style={styles.icon} />
            </View>
          </View>
        </TouchableOpacity>
      )
    );
  }
}

const styles = StyleSheet.create({
  itemWrap: {
    backgroundColor: backgroundBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%'
  },
  wrapTxt: {
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  specItemText: {
    textAlign: 'center',
    lineHeight: 18,
    fontSize: medium,
    color: lightBlack,
  },
  specItemSubText: {
    fontSize: normal,
    color: blue,
  },
  specIcon: {
    width: '100%',
    height: 100,
  },
  arrowWrap: {
    backgroundColor: green,
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontSize: medium
  }
});
