import React, { Component } from 'react';
import { Text, View, ListItem } from 'native-base';
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
    const { t, pdf, paidStatus, headTxt, timeTxt, nameTxt, docTxt, disable, onPress, isLoading } = this.props;

    return (
      <ListItem onPress={() => onPress()} style={styles.listWrap}>
        <View style={disable ? styles.receptionItemDisable : styles.receptionItem}>
          <View style={styles.headWrap}>
            <Text style={styles.txtTime}>{timeTxt}</Text>
            <Text style={paidStatus ? styles.txtPaymentPaid : styles.txtPaymentNotPaid}>{paidStatus ? t('common:actions.paid') : t('common:actions.not_paid')}</Text>
          </View>
          <View style={styles.subHeadWrap}>
            <Text style={styles.txtHead}>{headTxt} </Text>
          </View>
          <Text style={styles.txtName}>{nameTxt}</Text>
        </View>
        {(!!pdf && (!!docTxt || !!headTxt)) && (
          <CShare url={pdf} title={`${docTxt} ${headTxt}`} text={timeTxt} isLoading={(value) => isLoading(value)} />
        )}
      </ListItem>
    );
  }
}

export default withNamespaces(['recordings', 'common'])(ReceptionListItem);