import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class ReceptionListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {disable: false};
  }

  onPressActive() {
    
    Alert.alert('asasd')
  }

  render() {
    let {disable} = this.state;
    let {headTxt, servTxt, timeTxt, nameTxt} = this.props;
    return (
      <View 
      style={
        disable
          ? styles.receptionItemDisable
          : styles.receptionItem
        }>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
          <Text style={styles.txtHead}>{headTxt}</Text>
          <Text style={styles.txtHeadServ}>{servTxt}</Text>
        </View>
        <Text style={styles.txtTime}>{timeTxt}</Text>
        <Text style={styles.txtName}>{nameTxt}</Text>
        { (disable) ? (
        <Text style={styles.disableText}>
          запись отменена
        </Text>
        ):(
        <TouchableOpacity
          onPress={() => this.setState({disable: true})}
          style={styles.deleteIcon}>
          <Image
              resizeMode='contain'
              source={require('../../../assets/img/delete.png')}
          />
        </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receptionItem: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  receptionItemDisable: {
    borderRadius: 10,
    alignItems: "flex-start",
    width: '100%',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
    opacity: 0.5
  },
  txtHead: {
    color: variables.colors.mediumBlack,
    fontSize: variables.fSize.medium
  },
  txtHeadServ: {
    color: variables.colors.mediumBlack,
    fontSize: variables.fSize.normal
  },
  txtTime: {
    color: variables.colors.blue,
    fontSize: variables.fSize.main
  },
  txtName: {
    color: variables.colors.lightBlack,
    fontSize: variables.fSize.small
  },
  deleteIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 10,
    right: 5
  },
  disableText: {
    width: 50,
    height: 30,
    fontSize: variables.fSize.small,
    color: variables.colors.blue,
    position: 'absolute',
    bottom: 10,
    right: 5
  }
});