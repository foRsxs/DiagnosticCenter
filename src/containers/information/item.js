import React, { Component } from 'react';
import { StyleSheet, BackHandler, Image, ActivityIndicator, Linking, TouchableOpacity, Modal } from 'react-native';
import { Container, Content, View} from 'native-base';
import HTMLView from 'react-native-htmlview';
import ImageViewer from 'react-native-image-zoom-viewer';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';
import LinkBtn from '../../components/common/LinkBtn';
import variables from '../../styles/variables';
import { APP_IMG_URL, CALL_CENTRE_TEL } from '../../config';

const {accentBlue} = variables.colors;

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
      openPopup: false
    };

    this.openPopup = this.openPopup.bind(this);
  }

  componentDidMount() {
    (this.state.post_id) ? this.props.getPost(this.state.post_id) : this.setState({loading: false});
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
      });
    }
  }

  handleBackButtonClick = () => {
    let { popupOpened } = this.state;

    if (popupOpened) {
      this.setState({ openPopup: false });
    } else {
      this.props.navigation.goBack(null);
      return true;
    }
  }

  openPopup() {
    this.setState({ openPopup: true });
  }

  renderImage = () => {
    const {image, openPopup} = this.state;

    return (
      <View style={{paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.openPopup} style={styles.iconList}>
          <Image
            resizeMode='contain'
            style={styles.iconList}
            source={image}
          />
        </TouchableOpacity>
        <Modal visible={openPopup} transparent={true} onRequestClose={() => this.setState({ openPopup: false }) }>
          <ImageViewer imageUrls={[{url: image.uri}]}/>
        </Modal>
      </View>
    )
  }

  staticContent = () => {
    const {content} = this.state;

    return (
      <View style={styles.textWrap}>
        <HTMLView value={content} />
      </View>
    )
  }

  dynamicContent = () => {
    const {loading, content} = this.state;

    return (
      <View style={styles.textWrap}>
        {(!loading) ? <HTMLView value={content}/> : <ActivityIndicator size="large" color={accentBlue} />}
      </View>
    )
  }

  render() {
    const {call, image, header_title, post_id, loading} = this.state;
    const { t } = this.props;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header text={header_title} navigation={this.props.navigation} />
        <HeaderBottom/>
        <Content style={(image) ? {marginTop: -50, zIndex: 2}: {marginTop: -10, zIndex: 1}} contentContainerStyle={(loading)?{flex: 1, justifyContent: 'center'}: {}}>
          {(image) && this.renderImage()}
          {!(post_id) && this.staticContent()}
          {(post_id) && this.dynamicContent()}
        </Content>
        { (call) && <LinkBtn label={ t('common:actions_text.call_centre_text') } onClick={()=> Linking.openURL(`tel:${CALL_CENTRE_TEL}`) }/>}
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
