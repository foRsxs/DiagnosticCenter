import React, { Component } from 'react';
import { Image, ActivityIndicator, Linking, TouchableOpacity, Modal } from 'react-native';
import { Container, Content, View, Icon } from 'native-base';
import HTMLView from 'react-native-htmlview';
import ImageViewer from 'react-native-image-zoom-viewer';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import Header from '../../components/common/Header';
import LinkBtn from '../../components/common/LinkBtn';
import { APP_IMG_URL, CALL_CENTRE_TEL } from '../../config';

import styles from './styles';
import { ACCENT_BLUE } from '../../styles/constants';

class VacantionDetailScreen extends Component {

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
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    (this.state.post_id) ? this.props.getVacantion(this.state.post_id) : this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post !== nextProps.post) {
      this.setState({
        image: { uri: `${APP_IMG_URL}storage/${nextProps.post.image}` },
        content: nextProps.post.body,
        loading: false
      });
    }
  }

  openPopup() {
    this.setState({ openPopup: true });
  }

  closePopup() {
    this.setState({ openPopup: false });
  }

  renderImage = () => {
    const { image, openPopup } = this.state;

    return (
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={this.openPopup} style={styles.iconList}>
          <Image
            resizeMode='contain'
            style={styles.iconList}
            source={image}
          />
        </TouchableOpacity>
        <Modal visible={openPopup} transparent={true} onRequestClose={this.closePopup}>
          <TouchableOpacity onPress={this.closePopup} style={styles.closeBtn}>
            <Icon style={{ color: '#ffffff' }} name='ios-close' />
          </TouchableOpacity>
          <ImageViewer imageUrls={[{ url: image.uri }]} enableSwipeDown={true} onSwipeDown={this.closePopup} />
        </Modal>
      </View>
    )
  }

  staticContent = () => {
    const { content } = this.state;

    return (
      <View style={styles.textWrap}>
        <HTMLView value={content} />
      </View>
    )
  }

  dynamicContent = () => {
    const { loading, content } = this.state;

    return (
      <View style={styles.textWrap}>
        {(!loading) ? <HTMLView value={content} /> : <ActivityIndicator size="large" color={ACCENT_BLUE} />}
      </View>
    )
  }

  render() {
    const { call, image, header_title, post_id, loading } = this.state;
    const { t, post } = this.props;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header backButton={true} text={header_title} navigation={this.props.navigation}/>
        <Content style={(image) ? { zIndex: 2 } : { marginTop: -10, zIndex: 1 }} contentContainerStyle={(loading) ? { flex: 1, justifyContent: 'center' } : {}}>
          {(post.image) && this.renderImage()}
          {!(post_id) && this.staticContent()}
          {(post_id) && this.dynamicContent()}
        </Content>
        {(call) && <LinkBtn label={t('common:actions_text.call_centre_text')} onClick={() => Linking.openURL(`tel:${CALL_CENTRE_TEL}`)} />}
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.content.listVacantion.post,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('common')(connect(mapStateToProps, mapDispatchToProps)(VacantionDetailScreen));
