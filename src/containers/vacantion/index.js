import React, { Component } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Left, Right, Icon, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';

import styles from './styles';
import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';
import variables from '../../styles/variables';
const { medium } = variables.fSize;

class VacantionScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getListVacantion();
	}

	render() {
		const { navigate } = this.props.navigation;
		const { t, isRequest, listVacantion } = this.props;

		return (
			<Container contentContainerStyle={styles.mainContainer}>
				<Header backButton={true} text={t('vacantion:title')} navigation={this.props.navigation} />
				<Content
					style={styles.mainContent}
					contentContainerStyle={isRequest ? { flex: 1, justifyContent: 'center' } : {}}
				>
					<List>
						{!!isRequest ? (
							<ActivityIndicator size="large" color={ACCENT_BLUE} />
						) : !!listVacantion && listVacantion.length ? (
							listVacantion.map((item, i) => (
								<ListItem
									key={i}
									onPress={() =>
										navigate({
											routeName: 'vacantionItem',
											params: { header_title: item.title, post_id: item.id },
											key: item.id
										})}
									style={styles.questionItem}
								>
									<Left>
										<Text style={styles.questionItemText}>{item.title}</Text>
									</Left>
									<Right>
										<Icon style={styles.arrow} active type="Fontisto" name="angle-right" />
									</Right>
								</ListItem>
							))
						) : (
							<Text style={{ textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT }}>
								{t('vacantion:no_information_text')}
							</Text>
						)}
					</List>
				</Content>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		listVacantion: state.content.listVacantion.list,
		isRequest: state.content.isRequest
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('vacantion')(connect(mapStateToProps, mapDispatchToProps)(VacantionScreen));
