import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ScrollView
} from 'react-native';
import {Text, Input, List, ListItem} from 'native-base';
import variables from '../../styles/variables';

const {accentBlue} = variables.colors;
const { mainFont } = variables.fonts;
const { medium, large, main }  = variables.fSize;

export default class CustomBtn extends Component {
  constructor () {
    super();
    this.state = {
      opened: false,
      animationValues: ['0deg', '90deg'],
      value: ''
    }
    this.rotateValue = new Animated.Value(0)
  }


  rotate () {
    const {opened} = this.state;
    this.rotateValue.setValue((opened)? 1: 0)
    Animated.timing(
      this.rotateValue,
      {
        toValue: (opened)? 0: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start(()=> {this.setState({opened: !opened})})
  }

  renderDroppedBlock() {
    return (
      <ScrollView style={{height: 100, backgroundColor: 'white', zIndex: 2}}>
        <List style={{padding: 10, paddingTop: 0}}>           
          <ListItem style={{marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> {this.setState({value: 'Aaron Bennet', opened: false})}}
            >
              <Text style={{fontFamily: mainFont, fontSize: main}}>Aaron Bennet</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem style={{marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5}}>
            <Text style={{fontFamily: mainFont, fontSize: main}}>Aaron Bennet</Text>
          </ListItem> 
          <ListItem style={{marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5}}>
            <Text style={{fontFamily: mainFont, fontSize: main}}>Aaron Bennet</Text>
          </ListItem>
          <ListItem style={{marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5}}>
            <Text style={{fontFamily: mainFont, fontSize: main}}>Aaron Bennet</Text>
          </ListItem> 
          <ListItem style={{marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5}}>
            <Text style={{fontFamily: mainFont, fontSize: main}}>Aaron Bennet</Text>
          </ListItem>
        </List>
      </ScrollView>
    )
  }

  render() {
    const {opened, value} = this.state;
    const {contentContainerStyle} = this.props;
    const rotate = this.rotateValue.interpolate({
      inputRange:  [0, 1],
      outputRange: ['0deg', '90deg']
    })
    return (
      <View style={[{borderColor: accentBlue, borderWidth: 1, borderStyle: 'solid', borderRadius: 3, position: 'relative', flex: 1, backgroundColor: 'white'}, contentContainerStyle]}>
        <TouchableOpacity 
          style={{position: 'relative'}}
          onPress={()=> {
            this.rotate();
          }}
        >
          <Animated.Image
            style={{width: 20, height: 15, position: 'absolute', left: 5, top: 12, transform: [{rotate: rotate}] }}
            resizeMode='contain'
            source={require('../../../assets/img/arrow.png')}
          />
          {
            (opened) ?  <Input
              style={{color: 'black', fontFamily: mainFont, fontSize: main, marginLeft: 30, paddingLeft: 0, height: 40}}
              onChangeText={(value) => {this.setState({value: value})}}
              placeholder={'Исследования'}
              value={value}
            /> : <Text style={{color: 'black', fontFamily: mainFont, fontSize: main, paddingLeft: 30, height: 40, paddingTop: 10.5, paddingRight: 10, overflow: 'hidden' }}>Исследования</Text>
          }
        </TouchableOpacity>
        {(opened) && this.renderDroppedBlock()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
