import React, { Component } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Container, View, Content } from 'native-base';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { withNamespaces } from 'react-i18next';
import { SwipeListView } from 'react-native-swipe-list-view';

import { getSavedCards, deleteCard, addCard, paymentBySavedCard, getLinkForPayment } from '../../actions/content';
import { ADD_NEW_CARD, BACK_GREEN } from '../../styles/images';
import Header from '../../components/common/Header';
import styles from './styles';

class PaymentMethods extends Component {
	componentDidMount() {
		this.props.getSavedCards();
	}

	componentDidUpdate(prevProps) {
		const { payLink, isFocused, navigation } = this.props;
		
		if (prevProps.payLink !== payLink && payLink && isFocused) {
			navigation.navigate('payment', { type: 'add_cart' });
		}
	}

	renderCards = () => {
		const { t, listOfCards, deleteCard} = this.props;

		return (
			<SwipeListView
				keyExtractor={item => item.card_id}
				data={listOfCards}
				renderItem={({ item }, rowMap) => {
					const { type, card_hash } = item;

					return (
						<View style={styles.itemOfCardContainer}>
							<Image
								style={styles.itemOfCardImage}
								resizeMode="cover"
								source={{ uri: `http://89.218.154.86:8081/payment_systems/${type}.png` }}
							/>
							<Text style={styles.numberOfCard}>{card_hash}</Text>
							<Image style={styles.arrowLogo} resizeMode="contain" source={BACK_GREEN} />
						</View>
					);
				}}
				disableRightSwipe
				renderHiddenItem={({ item }, rowMap) => {
					const { card_id } = item;

					return (
						<View style={styles.deleteContainer}>
							<TouchableOpacity
								onPress={() => deleteCard(card_id)}
								style={styles.deleteBtn}
							>
								<Text style={styles.deleteText}>{t('payment:delete_card')}</Text>
							</TouchableOpacity>
						</View>
					);
				}}
				leftOpenValue={0}
				rightOpenValue={-100}
			/>
		);
	};

	addCardClick = () => {
		this.props.addCard();
	};

	render() {
		const { t, navigation } = this.props;

		return (
			<Container>
				<Header backButton={true} text={t('payment:title')} navigation={navigation} />
				<Content style={styles.content}>
					<View style={styles.itemElement}>
						<Text style={styles.textStyle}>{t('payment:saved_card')}</Text>
					</View>
					{this.renderCards()}
					<View style={styles.addNewCardContainer}>
						<View style={styles.itemElement}>
							<Text style={styles.textStyle}>{t('payment:add_new_card')}</Text>
						</View>
						<TouchableOpacity style={styles.addNewCard} onPress={this.addCardClick}>
							<Image style={styles.addCardIcon} resizeMode="contain" source={ADD_NEW_CARD} />
							<Text style={styles.textItemStyle}>{t('payment:add_card')}</Text>
							<Image style={styles.arrowLogo} resizeMode="contain" source={BACK_GREEN} />
						</TouchableOpacity>
					</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	listOfCards: state.content.listOfCards,
	payLink: state.content.payLink,
	payLinkTimeout: state.content.payLinkTimeout,
	infoListTalonInfo: state.content.infoListTalonInfo
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getSavedCards,
			deleteCard,
			addCard,
			paymentBySavedCard,
			getLinkForPayment
		},
		dispatch
	);

export default compose(withNamespaces(['payment', 'common']), withNavigationFocus, connect(mapStateToProps, mapDispatchToProps))(PaymentMethods);
