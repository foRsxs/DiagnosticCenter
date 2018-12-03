import React, { Component } from 'react';
import { StyleSheet, BackHandler, Image, ActivityIndicator, Linking } from 'react-native';
import { Container, Content, View} from 'native-base';
import HTMLView from 'react-native-htmlview';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import LinkBtn from '../../components/common/LinkBtn';
import variables from '../../styles/variables';
import {APP_IMG_URL} from '../../config';

const {blue} = variables.colors;

class InfoDetailScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      call: (props.navigation.state.params) ? props.navigation.state.params.call : false,
      image: (props.navigation.state.params) ? props.navigation.state.params.image : false,
      header_title: (props.navigation.state.params) ? props.navigation.state.params.header_title : '',
      content: (props.navigation.state.params) ? props.navigation.state.params.content : '',
      post_id: (props.navigation.state.params) ? props.navigation.state.params.post_id : null,
      loading: true,
    };
  }

  componentDidMount() {
    if (this.state.post_id) this.props.getPost(this.state.post_id); 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post !== nextProps.post) {
      this.setState({
        image: {uri: `${APP_IMG_URL}storage/${nextProps.post.image}`},
        content: nextProps.post.body,
        loading: false
      })
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  renderImage = () => {
    const {image} = this.state;
    
    return (
      <View style={{paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode='contain'
          style={styles.iconList}
          source={image}
        />
      </View>
    )
  }

  staticContent = () => {
    const {content} = this.state;

    return (
      <View style={styles.textWrap}>
        <HTMLView
          value={content}
        />
      </View>
    )
  }

  dynamicContent = () => {
    const {loading, content} = this.state;

    return (
      <View style={styles.textWrap}>
        {(!loading) ? <HTMLView value={content}/> : <ActivityIndicator size="small" color={blue} />}
      </View>
    )
  }

  render() {
    const {call, image, header_title, post_id} = this.state;
    const { t } = this.props;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={header_title} navigation={this.props.navigation} />
        <HeaderBottom/>
        <Content style={(image) ? {marginTop: -50, zIndex: 2}: {marginTop: -10, zIndex: 1}}>
          {(image) && this.renderImage()}
          {!(post_id) && this.staticContent()}
          {(post_id) && this.dynamicContent()}
        </Content>
        { (call) && <LinkBtn label={ t('common:actions_text.call_centre_text') } onClick={()=> Linking.openURL('tel:+87252367132') }/>}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  textWrap: {
    backgroundColor: 'white', padding: 15, marginTop: 10
  },
  iconList: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
});

function mapStateToProps(state) {
  return {
    post: state.content.listInformation.post,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('common')(connect(mapStateToProps, mapDispatchToProps)(InfoDetailScreen));