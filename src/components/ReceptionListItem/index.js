import React, { Component } from 'react';
import { Text, View, ListItem, Left, Right } from 'native-base';
import { withNamespaces } from 'react-i18next';
import CShare from '../common/CShare';

import styles from './styles';

class ReceptionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
    };
  }

  render() {
    const { t, pdf, headTxt, servTxt, timeTxt, nameTxt, docTxt, disable, onPress, isLoading } = this.props;

    return (
      <ListItem onPress={() => onPress()} style={styles.listWrap}>
        <Left>
          <View style={disable ? styles.receptionItemDisable : styles.receptionItem}>
            <Text style={styles.txtTime}>{timeTxt}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <Text style={styles.txtHead}>{headTxt} </Text>
              <Text style={styles.txtHeadServ}>({servTxt})</Text>
            </View>
            <Text style={styles.txtName}>{nameTxt}</Text>
          </View>
        </Left>
        <Right>
          {(pdf && (docTxt || headTxt)) && (
            <CShare url={pdf} title={`${docTxt} ${headTxt}`} text={timeTxt} isLoading={(value) => isLoading(value)} />
          )}
        </Right>
      </ListItem>
    );
  }
}

export default withNamespaces(['recordings', 'common'])(ReceptionListItem);