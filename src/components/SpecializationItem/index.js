import React, { Component } from 'react';
import { Image } from 'react-native';
import { ListItem, Left, Right, Text, Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

class SpecializationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { imageUri, headTxt, redArrow, price } = this.props;

    return (
      <ListItem onPress={() => this.props.onClick()} style={styles.specItem}>
        <Left style={styles.leftAlign}>
          {(imageUri) && (
            <Image
              style={styles.specIcon}
              resizeMode='contain'
              source={{ uri: imageUri }}
              fadeDuration={0}
            />
          )}
          <Text style={styles.specItemText}>{headTxt}</Text>
        </Left>
        <Right>
          {(!!price) ? (
            <Text style={styles.price}>{price}{"\n"}<Text style={styles.currency}>KZT</Text></Text>
          ) : (!!redArrow) ? (
            <View style={styles.wrapArrowRed}>
              <Icon style={styles.arrowRed} active name="ios-arrow-forward" />
            </View>
          ) : (
                <Icon style={styles.arrow} active name="ios-arrow-forward" />
              )
          }
        </Right>
      </ListItem>
    );
  }
}

SpecializationItem.propTypes = {
  imageUri: PropTypes.string,
  headTxt: PropTypes.string,
  price: PropTypes.any,
  redArrow: PropTypes.bool
};

export default SpecializationItem
