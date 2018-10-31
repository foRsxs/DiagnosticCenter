import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View, Icon } from 'native-base';
import Rating from '../common/Rating';
import horizontalStyles from './StyleHorizontal';
import verticalStyles from './StyleVertical';


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
            <Icon ios='ios-arrow-forward' android="ios-arrow-forward" style={horizontalStyles.icon} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => this.props.onClick()}
          >
          <View style={verticalStyles.itemWrap}>
            <Image
              style={verticalStyles.specIcon}
              resizeMode='cover'
              source={imageUri}
            />
            <View style={verticalStyles.wrapTxt}>
              <Text style={verticalStyles.specItemText}>
                {name}
              </Text>
              <Text style={verticalStyles.specItemSubText}>
                {position}
              </Text>
            </View>
            <View style={verticalStyles.arrowWrap}>
              <Icon ios='ios-arrow-down' android="ios-arrow-down" style={verticalStyles.icon} />
            </View>
          </View>
        </TouchableOpacity>
      )
    );
  }
}

