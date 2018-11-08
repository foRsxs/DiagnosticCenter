import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, FlatList} from 'react-native';

import variables from '../../styles/variables'
import NumberItem from '../common/NumberItem'

class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
       codeNumber: '',
    };
  }
  click = (value) =>{
    console.log(value)
    if(value !== 'x' && value !== '<'){
      this.setState({codeNumber: this.state.codeNumber + value})
    } else if (value === 'x'){
      this.setState({codeNumber: ''})
    } else if (value === '<'){
      this.setState({codeNumber: this.state.codeNumber.slice(0, -1)})
    }
  }
  render(){
    return(
      <View style={styles.container}>
			  <TextInput style={styles.input} value={this.state.codeNumber} onChangeText={(text)=> this.onChangeNumber(text)} editable = {false}/>
        <FlatList 
          data={[
            {key: '1', value: '1'},
            {key: '2', value: '2'},
            {key: '3', value: '3'},
            {key: '4', value: '4'},
            {key: '5', value: '5'},
            {key: '6', value: '6'},
            {key: '7', value: '7'},
            {key: '8', value: '8'},
            {key: '9', value: '9'},
            {key: 'x', value: 'x'},
            {key: '0', value: '0'},
						{key: '<', value: '<'},]}
					scrollEnabled={false}
          horizontal={false}
          vertical={true}
					numColumns={3}
					style={{width: 270, height: 360}}
          renderItem={({item}) => <NumberItem onClick={this.click} value={item.value} text={item.key}/>
          }
        />
				<Text style={styles.text}>не пришёл код?</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '75%'
	},
	input: {
		height: 50,
		fontSize: 45,
		lineHeight: 47,
		padding: 0,
    margin: 15,
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 10,
    color: variables.colors.darkBlue
	},
	text: {
		fontSize: 18,
		color: variables.colors.darkBlue
	}
})
export default InputNumber
