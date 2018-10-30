import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Button, Content} from 'native-base';
import variables from '../../styles/variables';
import StarRating from 'react-native-star-rating';
const { blue, lightBlue, lightBlack } = variables.colors;

export default class Rating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generalStarCount: props.rating,
      showDetail: props.ratingDetail
    };
  }

  onGeneralStarRatingPress(rating) {
    this.setState({
      generalStarCount: rating,
    });
  }

  render() {
    const {ratingMinimal, rating, like, unlike} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
        { (this.state.showDetail) ? (
          <View>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{marginHorizontal: 2}}
                  resizeMode='contain'
                  source={require('../../../assets/img/goodsmile.png')}
                />
                <Text style={{fontSize: 15, color: lightBlack}}>{like} |</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{marginHorizontal: 4}}
                  resizeMode='contain'
                  source={require('../../../assets/img/badsmile.png')}
                />
                <Text style={{fontSize: 15, color: lightBlack}}>{unlike}</Text>
              </View>
            </View>
            <Text style={{fontSize: 15, color: lightBlack, marginBottom: 5}}>
              рейтинг {this.state.generalStarCount}
            </Text>
          </View>
        ): false}
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={(ratingMinimal)?12:16}
          fullStarColor={blue}
          emptyStarColor={lightBlue}
          halfStarColor={lightBlue}
          halfStarEnabled={true}
          emptyStar={'star'}
          halfStar={'star'}
          activeOpacity={1}
          buttonStyle={{margin: 1}}
          containerStyle={{justifyContent: 'center'}}
          rating={rating}
          selectedStar={rating => this.onGeneralStarRatingPress(rating)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
