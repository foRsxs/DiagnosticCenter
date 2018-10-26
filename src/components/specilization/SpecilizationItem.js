import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, View, Icon} from 'native-base';
import variables from '../../styles/variables'

export default class SpecilizationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {imageUri, headTxt, subTxt} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onClick()}
        style={styles.specItem}
        >
        <View style={styles.itemWrap}>
          <Image
            style={styles.specIcon}
            resizeMode='contain'
            source={imageUri}
          />
          <View style={styles.wrapTxt}>
              <Text style={styles.specItemText}>
                  {headTxt}
              </Text>
              <Text style={styles.specItemSubText}>
                  {subTxt}
              </Text>
          </View>
        </View>
        <View style={styles.arrowWrap}>
          <Icon ios='ios-arrow-forward' android="md-arrow-forward" style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  specItem: {
    borderRadius: 10,
    alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: variables.colors.backgroundBlue,
    marginBottom: 10
  },
  itemWrap: {
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'row', 
    padding: 10
  },
  wrapTxt: {
    flexDirection: 'column',
  },
  specItemText: {
    fontSize: variables.fSize.medium,
    color: variables.colors.lightBlack,
  },
  specItemSubText: {
    fontSize: variables.fSize.normal,
    color: variables.colors.darkGray,
  },
  specIcon: {
    width: 30, 
    height: 30, 
    marginRight: 15
  },
  arrowWrap: {
    backgroundColor: variables.colors.green,
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10, 
    width: 30,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color:'white',  
    fontSize: variables.fSize.medium
  }
});