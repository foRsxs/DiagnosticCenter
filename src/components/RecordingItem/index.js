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
    let { title, placeholder, icon, onClick, contentContainerStyle, text } = this.props;

    return (
      <TouchableOpacity style={[styles.itemWrap, contentContainerStyle]} onPress={onClick}>
        <Image
          style={styles.itemImage}
          resizeMode='contain'
          source={icon}
        />
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          {(placeholder) && (
            <Text style={styles.itemPlaceholder}>{placeholder}</Text>
          )}
          {(text) && (
            <Text style={styles.itemText}>{text}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

RecordingItem.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.number,
  contentContainerStyle: PropTypes.object
};

export default RecordingItem
