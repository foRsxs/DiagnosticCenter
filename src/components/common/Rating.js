import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Text, Button, Content} from 'native-base';
import variables from '../../styles/variables';
import StarRating from 'react-native-star-rating';
const { blue, lightBlue } = variables.colors;

export default class Rating extends Component {
  render() {
    const {ratingMinimal, rating} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <StarRating
          disabled={false}
          maxStars={5}
          starSize={(ratingMinimal)?12:20}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
