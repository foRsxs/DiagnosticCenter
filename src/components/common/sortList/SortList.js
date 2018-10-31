import React, {Component} from 'react';
import {StyleSheet, FlatList, Button, Text, View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

import Item from './Item'
import variables from '../../../styles/variables'

export default class SortList extends Component {
  
  render(){
      
        return(
          <View style={styles.container}>
            <TouchableOpacity style={styles.backGround} onPress={() => this.props.onClick()}>
            </TouchableOpacity>
            <View style={styles.sortList}>
              <View style={styles.hContainer}>
                <View style={{width: '80%'}}>
                  <Text style={styles.hText} onPress={() => this.props.onClick()}>сортировать</Text>
                </View>
                <View>
                  <Image  style={{top:25}} source={require('../../../../assets/img/sortList_btn.png')} />
                </View>
              </View>
              <FlatList
                data={[
                  {key: 'по фамилии', value: 'fio'},
                  {key: 'по рейтингу', value: 'rating'},
                  {key: 'по стажу', value: 'experience'},
                  {key: 'по категории', value: 'kategory'},
                ]}
              renderItem={({item}) => <Item onClick={this.props.onClick} value={item.value} text={item.key}/>
                
              }
              />
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 2000,
      top: 0,
      zIndex: 5,
      position: 'absolute',
    }, 
    backGround: {
      width: '100%',
      height: '100%',
      top: 0,
      opacity: 0.5,
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 3
    },
    sortList: {
      zIndex: 100,
      top: 40,
      right: 0,
      position: 'absolute',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      width: 220,
      height: 275,
      backgroundColor: variables.colors.white,
      opacity: 1,
    },
    hContainer: {
      width: '100%',
      flexDirection: 'row'
    }, 
    hText:{
      top: 20,
      right: 10,
      textAlign: 'right',
      color: variables.colors.blue,
      fontSize: 18,
      height: 60,
      lineHeight: 21,
    },
    Item: {
      borderRadius: 5,
      backgroundColor: 'green',
      height: 45,
    },
    ItemActive: {
      backgroundColor: variables.colors.blue,
      height: 45,
      
    },
    Text: {
      textAlign: 'right',
      top: 15,
      right: 50,
      fontSize: 18,
      lineHeight: 21,
      color: variables.colors.mediumBlack,
    },
    TextActive: {
      textAlign: 'right',
      top: 15,
      right: 50,
      fontSize: 18,
      lineHeight: 21,
      color: variables.colors.white,
    },
});

                