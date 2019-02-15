import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

class RecordingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, placeholder, icon, onClick } = this.props;

    return (
      <TouchableOpacity style={styles.itemWrap} onPress={onClick}>
        <Image
          style={styles.itemImage}
          resizeMode='contain'
          source={icon}
        />
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemPlaceholder}>{placeholder}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

RecordingItem.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.number
};

export default RecordingItem
