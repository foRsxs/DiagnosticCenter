import React, { Component } from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel'

let Dheight = Dimensions.get('window').height;
let Dwidth = Dimensions.get('window').width;

class HomeCarousel extends Component {

    constructor(props){
      super();
      this.state = {
      }
      this.init();
    }
  
    init(){
      this.state = {
        items: [
          {
            id: "1",
          }, {
            id: "2",
          }, {
            id: "3",
          }
        ]
      };
  
    }
  
    _renderItem = ( {item, index} ) => {
      console.log("rendering,", index, item)
      return (
        <View style={styles.wrapSlide}>
              <Image
                resizeMode='contain'
                style={styles.iconList}
                source={require('../../../assets/img/slide1.png')}
              />
        </View>
      );
    }
    render = () => {
      return (
        <View>
          <Carousel
            ref={ (c) => { this._carousel = c; } }
            data={this.state.items}
            renderItem={this._renderItem.bind(this)}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            sliderWidth={Dwidth}
            itemWidth={Dwidth-80}
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

  const styles = StyleSheet.create({
    wrapSlide: {
      elevation: 5,
      width: '100%',
      height: Dheight/3.2,
      marginBottom: 20,
      marginTop: 20
    },
    iconList: {
      width: '100%',
      height: '100%',
      borderRadius: 8
    },
  });
  
  export default HomeCarousel;