import React, {Component} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {Text, Button} from 'native-base';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  

  componentDidMount() {}


  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={ styles.mainContainer }>
            <View style={{flex: 1}}>
                <Text>
                Home
                </Text>
                <Button rounded
                onPress={()=>{ 
                    navigate('authorization'); 
                }}>
                <Text>go back</Text>
              </Button>
            </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  
});

export default HomeScreen;
