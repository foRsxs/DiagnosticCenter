import React, {Component} from 'react';
import {StyleSheet, FlatList, Button, Text, View} from 'react-native';

import variables from '../../styles/variables'

export default class HeaderBottom extends Component {
    render(){
        return(
            <View style={styles.sortList}>
              <FlatList
                data={[
                  {key: 'по фамилии'},
                  {key: 'по рейтингу'},
                  {key: 'по стажу'},
                  {key: 'по категории'},
                ]}
              renderItem={({item}) => <Text onPress={()=> this.togleSortList()} style={styles.item}>{item.key}</Text>}
              />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sortList: {
      zIndex: 100,
      position: 'absolute',
      borderRadius: 10,
      width: 200,
      height: 225,
      backgroundColor: variables.colors.white
    },
    item: {
      color: variables.colors.mediumBlack,
      fontSize: 18,
      height: 45,
      lineHeight: 21,
      backgroundColor: variables.colors.white
    }
});

                