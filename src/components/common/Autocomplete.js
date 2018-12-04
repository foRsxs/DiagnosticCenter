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

const {accentBlue, activeGray} = variables.colors;
const { mainFont } = variables.fonts;
const { medium, large, main }  = variables.fSize;

export default class CustomBtn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      opened: false,
      sortedData: props.data,
      animationValues: ['0deg', '90deg'],
      value: this.setValue(props.selected),
      id: null
    }
    this.rotateValue = new Animated.Value(0)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.setState({sortedData: this.props.data, value: this.setValue(this.props.selected)});
  }

  setValue = (id) => {
    const {data} = this.props;
    let value = '';
    if (id) {
      data.forEach((item) => {
        const item_id = (item.docdep) ? +item.docdep: (item.servid) ? +item.servid: (item.id) ? +item.id: (item.res_id) ? +item.res_id : (item.spec_id) ? +item.spec_id : null
        if ( item_id === +id) {
          value = (item.lastname) ? `${item.lastname} ${item.firstname} ${item.secondname}`: (item.text) ? item.text: (item.value) ? item.value: (item.res_text) ? item.res_text : (item.spec_name) ? item.spec_name : ''
        };
      })
    }
    console.log(data, id, value)
    return value;
  }

  onPress = (id,value) => {
    this.setState({value: value, id: id, opened: false});
    this.rotate();
    this.props.onSelect(id);
  }
  
  onChange = (value) => {
    const {data} = this.props;
    let array = []
    data.forEach((item) => {
      const text = (item.lastname) ? `${item.lastname} ${item.firstname} ${item.secondname}`:(item.text) ? item.text: (item.value) ? item.value: (item.res_text) ? item.res_text : (item.spec_name) ? item.spec_name : null;
      if (text.toLowerCase().indexOf(value.toLowerCase()) !== -1) array.push(item);
    })
    this.setState({sortedData: array, value: value})
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
    const {sortedData} = this.state;
    let height = (sortedData.length > 5) ? 150: sortedData.length * 30 + 7;
    return (
      <ScrollView style={[{height: height }, styles.listWrap]}>
        <List style={ styles.listContainer }>
          {
            sortedData.map((item) => (
              <ListItem 
                key={(item.docdep) ? +item.docdep: (item.servid) ? +item.servid: (item.id) ? item.id: (item.res_id) ? +item.res_id : (item.spec_id) ? +item.spec_id : null} 
                style={{marginLeft: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5}}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{width: '100%'}}
                  onPress={()=> this.onPress(
                    (item.docdep) ? item.docdep: (item.servid) ? item.servid: (item.id) ? item.id: (item.res_id) ? item.res_id : (item.spec_id) ? item.spec_id : null, 
                    (item.lastname) ? `${item.lastname} ${item.firstname} ${item.secondname}`: (item.text) ? item.text: (item.value) ? item.value: (item.res_text) ? item.res_text : (item.spec_name) ? item.spec_name : null
                  )}
                >
                  <Text style={{fontFamily: mainFont, fontSize: main, width: '100%'}}>{(item.lastname) ? `${item.lastname} ${item.firstname} ${item.secondname}`:(item.text) ? item.text: (item.value) ? item.value: (item.res_text) ? item.res_text : (item.spec_name) ? item.spec_name : null}</Text>
                </TouchableOpacity>
              </ListItem>
            ))
          } 
        </List>
      </ScrollView>
    )
  }

  render() {
    const {opened, value} = this.state;
    const {contentContainerStyle, label, disabled} = this.props;
    const rotate = this.rotateValue.interpolate({
      inputRange:  [0, 1],
      outputRange: ['0deg', '90deg']
    })

    return (
      <View style={[(!disabled) ? styles.content: styles.contentDisabled, contentContainerStyle]}>
        <TouchableOpacity 
          style={{position: 'relative'}}
          activeOpacity={(disabled)? 1: 0.8}
          onPress={()=> {
            if (disabled) return;
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
              onChangeText={(value) => this.onChange(value)}
              value={value}
            /> : <Text style={(!disabled)? styles.text: styles.textDisabled}>{(value)? value: label}</Text>
          }
        </TouchableOpacity>
        {(opened) && this.renderDroppedBlock()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrap: {
    // left: 0,
    // position: 'absolute',
    // right: 0,
    // top: 30,       
    // zIndex: 1000, 
    borderBottomLeftRadius: 5, 
    borderBottomRightRadius: 5
  },
  listContainer: {    
    flex: 1, 
    backgroundColor: 'white', 
    position: 'relative',
    padding: 10, 
    paddingTop: 0
  },
  content: {
    position: 'relative',
    borderColor: accentBlue, 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 3, 
    flex: 1, 
    backgroundColor: 'white'
  },
  contentDisabled: {
    borderColor: accentBlue, 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 3, 
    position: 'relative', 
    flex: 1, 
    backgroundColor: 'rgba(94, 150, 197, 0.1)'
  },
  text: {
    color: 'black', 
    fontFamily: mainFont, 
    fontSize: main, 
    paddingLeft: 30, 
    height: 40, 
    paddingTop: 10.5, 
    paddingRight: 10, 
    overflow: 'hidden' 
  },
  textDisabled: {
    color: accentBlue, 
    fontFamily: mainFont, 
    fontSize: main, 
    paddingLeft: 30, 
    height: 40, 
    paddingTop: 10.5, 
    paddingRight: 10, 
    overflow: 'hidden' 
  }
});
