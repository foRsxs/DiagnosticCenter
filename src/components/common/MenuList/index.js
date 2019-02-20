import React, { Component } from 'react';
import { Image } from 'react-native';
import { ListItem, Left, Right, Text, Icon, List } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class MenuList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		const { fields, onPress, valueName } = this.props;

		return (
			<List>
				{
					fields.map((x, i) => (
						<ListItem key={i} onPress={() => { onPress(x[valueName]) }} style={styles.listWrap}>
							<Left>
								<Image
									resizeMode='contain'
									style={styles.listIcon}
									source={x.icon}
								/>
								<Text style={styles.listText}>{x.text}</Text>
							</Left>
							<Right>
								<Icon style={styles.arrow} active name="ios-arrow-forward" />
							</Right>
						</ListItem>
					))
				}
			</List>
		);
	}
}

MenuList.propTypes = {
	onPress: PropTypes.func,
	fields: PropTypes.array.isRequired,
};

export default MenuList
