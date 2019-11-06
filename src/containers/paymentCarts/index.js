import React, { Component } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Container, View, Content } from "native-base";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withNavigationFocus } from "react-navigation";
import { withNamespaces } from "react-i18next";
import { SwipeListView } from 'react-native-swipe-list-view';

import { getSavedCards, deleteCard } from '../../actions/content';
import { ADD_NEW_CARD, BANK_CARD, BACK_GREEN } from "../../styles/images";
import Header from "../../components/common/Header";
import styles from "./styles";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        icon: `https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fsvg%2F281%2F281656.svg&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fcredit-card_281656&docid=zEONkOli-GxR3M&tbnid=a0UD2CFNGplSSM%3A&vet=10ahUKEwi-tfuf49XlAhWCqIsKHUeJDS8QMwhOKAowCg..i&w=800&h=800&bih=986&biw=2133&q=card%20icon&ved=0ahUKEwi-tfuf49XlAhWCqIsKHUeJDS8QMwhOKAowCg&iact=mrc&uact=8`,
        number: `400303-XX-XXXX-1494`
      },
      {
        icon: `https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn3.vectorstock.com%2Fi%2F1000x1000%2F77%2F52%2Fid-card-icon-vector-22537752.jpg&imgrefurl=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fid-card-icon-vector-22537752&docid=TP5_yo2BBIi7PM&tbnid=qp99HUJa_K5odM%3A&vet=10ahUKEwi-tfuf49XlAhWCqIsKHUeJDS8QMwhJKAcwBw..i&w=1000&h=1080&bih=986&biw=2133&q=card%20icon&ved=0ahUKEwi-tfuf49XlAhWCqIsKHUeJDS8QMwhJKAcwBw&iact=mrc&uact=8`,
        number: `623357-XX-XXXX-1494`
      },
      {
        icon: `https://www.google.com/imgres?imgurl=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fsvg%2F281%2F281656.svg&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fcredit-card_281656&docid=zEONkOli-GxR3M&tbnid=a0UD2CFNGplSSM%3A&vet=10ahUKEwi-tfuf49XlAhWCqIsKHUeJDS8QMwhOKAowCg..i&w=800&h=800&bih=986&biw=2133&q=card%20icon&ved=0ahUKEwi-tfuf49XlAhWCqIsKHUeJDS8QMwhOKAowCg&iact=mrc&uact=8`,
        number: `426434-XX-XXXX-1494`
      },
      ]
    };

  }

  componentDidMount() {
    const { getSavedCards } = this.props;
    getSavedCards();
  }

  renderCards = () => {
    const { t, listOfCards, deleteCard } = this.props;
    
    return (<SwipeListView
      data={listOfCards}
      renderItem={({ item }, rowMap) =>{

        const { type, card_hash } = item;
      
        return (
          <View style={styles.itemOfCardContainer}>
           <Image style={styles.itemOfCardImage} resizeMode='cover' source={{uri: `http://89.218.154.86:8081/payment_systems/${type}.png`}}/>
            <Text style={styles.numberOfCard}>{card_hash}</Text>
            <TouchableOpacity style={{marginLeft: 'auto'}}>
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

  }

  bankCardClick = () => {

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
  listOfCards: state.content.listOfCards
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSavedCards,
  deleteCard
}, dispatch);

export default compose(
  withNamespaces("recordings"),
  withNavigationFocus,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Payment);
