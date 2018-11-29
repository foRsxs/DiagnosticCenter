import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, BackHandler, Text, ActivityIndicator } from 'react-native';
import { Container, Content, View } from 'native-base';
import i18n from '../../i18n';
import * as ContentActions from '../../actions/content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import variables from '../../styles/variables';

const {backgroundBlue, black, blue} = variables.colors;
const {mainFont} = variables.fonts;
const {main} = variables.fSize;

class InfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getListInformation();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    const {navigate} = this.props.navigation;
    const {listInformation: {list}} = this.props;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text="ИНФОРМАЦИЯ" navigation={this.props.navigation} />
        <HeaderBottom text={'к сведению пациента'} />
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} padder>
          {
            (list) ? (
              list.map((item)=>(
                <View style={styles.questionItem} key={item.id}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=> navigate({routeName:'informationItem', params: {header_title: item.title, post_id: item.id }, key: item.id})} >
                    <Text style={styles.questionItemText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : <ActivityIndicator size="small" color={blue} />
          }
          
          
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  questionItem: {
    borderRadius: 10,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: backgroundBlue,
    marginBottom: 10,
    padding: 10,
    position: 'relative'
  },
  questionItemText: {
    fontSize: main,
    fontFamily: mainFont,
    color: black,
    textAlign: 'left',
    width: '100%'
  },
});

function mapStateToProps(state) {
  return {
    listInformation: state.content.listInformation,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);
