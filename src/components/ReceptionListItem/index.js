import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
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
      <View>
        <TouchableOpacity
          onPress={() => onPress()}
          activeOpacity={0.8}
        >
          <View style={disable ? styles.receptionItemDisable : styles.receptionItem}>
            <Text style={styles.txtTime}>{timeTxt}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <Text style={styles.txtHead}>{headTxt}</Text>
              <Text style={styles.txtHeadServ}>({servTxt})</Text>
            </View>
            <Text style={styles.txtName}>{nameTxt}</Text>
            {((!disable && pdf) && (<CShare url={pdf} title={`${docTxt} ${headTxt}`} text={timeTxt} isLoading={(value) => isLoading(value)} />))}
          </View>
        </TouchableOpacity>
        {(disable) && (<Text style={styles.disableText}>{t('recordings:item.cancel_recording')}</Text>)}
      </View>
    );
  }
}

export default withNamespaces(['recordings', 'common'])(ReceptionListItem);