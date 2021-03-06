import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { withNamespaces } from 'react-i18next';
import HTMLView from 'react-native-htmlview';
import { styles } from './styles'

import { NEW_ARROW, NEW_ARROW_BLUE } from '../../styles/images'

class CatalogListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false
    };
  }

  render() {
    let { imageUri, name, position, info, contentContainerStyle, t, category } = this.props;
    const { moreInfo } = this.state;
    return (
      <TouchableOpacity onPress={() => this.props.onClick()}>
        <View style={[styles.block, contentContainerStyle]}>
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
            {(!!position) && (<Text style={styles.special}>{position}</Text>)}
            {(!!category) && (<Text style={styles.category}>{category}</Text>)}
            {(!!info) && (
              <View>
                {(!!moreInfo) && (<HTMLView value={(info) ? info : ''} />)}
                <TouchableOpacity onPress={() => this.setState({ moreInfo: !moreInfo })} style={styles.more}>
                  <Text style={styles.openInfo}>{(moreInfo) ? t('listdoctors:hide_desc') : t('listdoctors:show_desc')}</Text><Image source={NEW_ARROW_BLUE} style={(moreInfo) ? styles.arrowActive : styles.arrow} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.btn}>
              <Image source={NEW_ARROW} style={styles.iconBtn} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNamespaces('listdoctors')(CatalogListItem);
