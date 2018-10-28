import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import variables from '../../styles/variables';
import Rating from '../common/Rating';

const { darkGray, backgroundBlue, lightBlack, blue, green } = variables.colors;
const { small, medium, normal} = variables.fSize

export default class CatalogListItem extends Component {
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
            <View style={styles.bottomBlock}>
              <Text style={styles.addInfoText}>
                {category} | стаж: {experience} лет 
              </Text>
              <Rating rating={3.5} ratingMinimal={true}/>
            </View>
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
  bottomBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addInfoText: {
    width: '70%',
    color: darkGray,
    fontSize: small
  },
  specItem: {
    flex: 1,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: backgroundBlue,
    marginBottom: 10
  },
  itemWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  wrapTxt: {
    position: 'relative',
    paddingVertical: 10,
    paddingLeft: 70,
    paddingRight: 20,
    alignItems: 'stretch',
    flexDirection: 'column',
    width: '100%'
  },
  specItemText: {
    fontSize: medium,
    color: lightBlack,
  },
  specItemSubText: {
    fontSize: normal,
    color: blue,
  },
  specIcon: {
    position: 'absolute',
    left: 0,
    width: 60,
    height: 70,
  },
  arrowWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: green,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontSize: medium
  }
});