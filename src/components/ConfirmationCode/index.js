import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { withNamespaces } from 'react-i18next';
import NumberItem from '../common/NumberItem';
import CustomBtn from '../common/CustomBtn';

import styles from './styles';
import {scale} from '../../styles/variables';

class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeNumber: '',
    };
  }
  click = (value) => {
    const { codeNumber } = this.state;
    if (value !== 'x' && value !== '<' && codeNumber.length <= 3) {
      this.setState({ codeNumber: codeNumber + value })
    } else if (value === 'x') {
      this.setState({ codeNumber: '' })
    } else if (value === '<') {
      this.setState({ codeNumber: this.state.codeNumber.slice(0, -1) })
    }
  }
  render() {
    const { codeNumber } = this.state;
    const { t, onPress, message, new_user } = this.props;

    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={this.state.codeNumber} onChangeText={(text) => this.onChangeNumber(text)} editable={false} />
        <FlatList
          data={[
            { key: '1', value: '1' },
            { key: '2', value: '2' },
            { key: '3', value: '3' },
            { key: '4', value: '4' },
            { key: '5', value: '5' },
            { key: '6', value: '6' },
            { key: '7', value: '7' },
            { key: '8', value: '8' },
            { key: '9', value: '9' },
            { key: 'x', value: 'x' },
            { key: '0', value: '0' },
            { key: '<', value: '<' }
          ]}
          scrollEnabled={false}
          horizontal={false}
          vertical={true}
          numColumns={3}
          style={{ width: scale(270), height: scale(290) }}
          renderItem={({ item }) => <NumberItem onClick={this.click} value={item.value} text={item.key} />}
        />
        {(!!message && message.length) ? <Text style={styles.message}>{message}</Text> : false}
        {/* <Text style={styles.text}>не пришёл код?</Text> */}
        {(codeNumber.length === 4) && <CustomBtn label={t(`common:actions.${new_user ? 'save' : 'exit'}`)} onClick={() => onPress(codeNumber)} />}
      </View>
    )
  }
}

export default withNamespaces('common')(InputNumber);