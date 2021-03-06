import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { APP_IMG_URL } from '../../config';

import styles from './styles';
let Dwidth = Dimensions.get('window').width;

class HomeCarousel extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = ({ item, index }) => {
    const { navigate } = this.props;

    return (
      <View style={styles.wrapSlide}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigate('informationItem', { image: { uri: `${APP_IMG_URL}storage/${item.image}` }, call: true, header_title: item.title, content: item.body })}
        >
          <Image
            resizeMode='cover'
            style={styles.iconList}
            source={{ uri: `${APP_IMG_URL}storage/${item.image}` }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  render = () => {
    const { data } = this.props;

    return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={data}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={Dwidth}
          itemWidth={Dwidth - 80}
          layout={'default'}
          firstItem={1}
          loop={true}
          autoplay={true}
          autoplayDelay={0}
          autoplayInterval={5000}
        />
      </View>
    );
  }
}

export default HomeCarousel;