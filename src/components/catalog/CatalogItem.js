import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { styles } from './styles'

export default class CatalogListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false
    };
  }

  render() {
    let {imageUri, name, position, category, experience} = this.props; 
    const {moreInfo} = this.state;
    return (
      <View style={styles.block}>
        <View style={styles.blockImg}>
          <Image
            style={styles.img}
            resizeMode='cover'
            source={imageUri}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={styles.special}>травматолог</Text>
          <Text style={styles.category}>Категория</Text>
          {(moreInfo)&&(<Text style={styles.moreInfoText}>ааааа ааааааа ааааааааа аааааааааа ааааааааа ааааааааааааааа аааааааааааа ааааааааааа аааа</Text>)}
          <TouchableOpacity onPress={() => this.setState({moreInfo: !moreInfo})} style={styles.more}>
            <Text style={styles.openInfo}>{(moreInfo) ? 'Скрыть описание' : 'Посмотреть описание'}</Text><Image source={require('../../../assets/img/new_arrow_blue.png')} style={(moreInfo) ? styles.arrowActive : styles.arrow}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onClick()} style={styles.btn}>
            <Image source={require('../../../assets/img/new_arrow.png')} style={styles.iconBtn}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

