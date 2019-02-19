import React, { Component } from 'react';
import { Text, ListItem, Right, Body, } from 'native-base';

import CShare from '../common/CShare';
import styles from './styles';

export default class AnalizesItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { headTxt, dateTxt, pdf, isLoading } = this.props;

    return (
      <ListItem onPress={this.props.onPress} style={styles.listWrap}>
        <Body>
          <Text style={styles.txtHead}>{headTxt}</Text>
          <Text style={styles.txtDate}>{dateTxt}</Text>
        </Body>
        <Right>
          <CShare url={pdf} title={headTxt} text={dateTxt} isLoading={(value) => isLoading(value)} />
        </Right>
      </ListItem>
    );
  }
}
