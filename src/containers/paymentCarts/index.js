import React, { Component } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Container, View, Content } from "native-base";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation";
import { withNamespaces } from "react-i18next";
import { SwipeListView } from 'react-native-swipe-list-view';

import { getSavedCards, deleteCard, addCard, paymentBySavedCard, getLinkForPayment } from '../../actions/content';
import { ADD_NEW_CARD, BANK_CARD, BACK_GREEN } from "../../styles/images";
import Header from "../../components/common/Header";
import styles from "./styles";

class Payment extends Component {

  componentDidMount() {
    const { getSavedCards } = this.props;
    getSavedCards();
  }

  componentDidUpdate(prevProps) {
    const { payLink, isFocused, navigation } = this.props;
    if(prevProps.payLink !== payLink && payLink && isFocused) {
      navigation.navigate('payment');
    }
  }

  renderCards = () => {
    const { t, listOfCards, deleteCard, infoListTalonInfo, paymentBySavedCard } = this.props;

    return (<SwipeListView
      data={listOfCards}
      renderItem={({ item }, rowMap) =>{

        const { type, card_hash, card_id } = item;

        return (
          <View style={styles.itemOfCardContainer}>
           <Image style={styles.itemOfCardImage} resizeMode='cover' source={{uri: `http://89.218.154.86:8081/payment_systems/${type}.png`}}/>
            <Text style={styles.numberOfCard}>{card_hash}</Text>
            <TouchableOpacity onPress={()=>{
              paymentBySavedCard(card_id, infoListTalonInfo.rnumb_id, infoListTalonInfo.price)
            }} 
            style={{marginLeft: 'auto'}}
            >
            <Image style={styles.arrowLogo} resizeMode='contain' source={BACK_GREEN} />
            </TouchableOpacity>
          </View>
        )
      }}
      disableLeftSwipe
      renderHiddenItem={({ item }, rowMap) => {
       return(
        <TouchableOpacity onPress={()=>{deleteCard(item.id)}} style={styles.deleteContainer}>
          <Text style={styles.deleteText}>{t("recordings:delete_card")}</Text>
        </TouchableOpacity >
      )}}
      leftOpenValue={100}
      rightOpenValue={-100}
    />
    )
  };

  addCardClick = () => {
    const { addCard } = this.props;
    addCard();
  }

  bankCardClick = () => {
    const { getLinkForPayment, infoListTalonInfo } = this.props;

    getLinkForPayment(infoListTalonInfo.rnumb_id, infoListTalonInfo.price)
  }



  render() {
    const { t, navigation } = this.props;
    return (
      <Container>
        <Header
          backButton={true}
          text={t("recordings:card_payment")}
          navigation={navigation}
        />
        <Content style={styles.content}>
          <View style={styles.itemElement}>
            <Text style={styles.textStyle}>
              {t("recordings:payment_by_saved_card")}
            </Text>
          </View>
          {this.renderCards()}
          <View style={styles.addNewCardContainer}>
            <View style={styles.itemElement}>
              <Text style={styles.textStyle}>
                {t("recordings:add_new_card")}
              </Text>
            </View>
            <TouchableOpacity style={styles.addNewCard} onPress={this.addCardClick}>
              <Image style={styles.addCardIcon} resizeMode='contain' source={ADD_NEW_CARD} />
              <Text style={styles.textItemStyle}>{t("recordings:add_card")}</Text>
              <Image style={styles.arrowLogo} resizeMode='contain' source={BACK_GREEN} />
            </TouchableOpacity>
          </View>
          <View style={styles.bankCardContainer}>
            <View style={styles.itemElement}>
              <Text style={styles.textStyle}>
                {t("recordings:payment_without_saving_a_card")}
              </Text>
            </View>
            <TouchableOpacity style={styles.bankCard} onPress={this.bankCardClick}>
              <Image style={styles.bankCardIcon} resizeMode='contain' source={BANK_CARD} />
              <Text style={styles.textItemStyle}>{t("recordings:bank_card")}</Text>
              <Image style={styles.arrowLogo} resizeMode='contain' source={BACK_GREEN} />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listOfCards: state.content.listOfCards,
  payLink: state.content.payLink,
  infoListTalonInfo: state.content.infoListTalonInfo
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSavedCards,
  deleteCard,
  addCard,
  paymentBySavedCard,
  getLinkForPayment
}, dispatch);


export default compose(
  withNamespaces("recordings"),
  withNavigationFocus,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Payment);
