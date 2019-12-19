import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Modal } from 'react-native';
import { Container, Content, List } from 'native-base';

import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ContentActions from '../../actions/content';
import AnalizesItem from '../../components/AnalizesItem'
import Header from '../../components/common/Header';
import SimpleFilter from '../../components/common/SimpleFilter';

import styles from './styles';
import { ACCENT_BLUE } from '../../styles/constants';

class CardPatientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareLoading: false,
      openModal: false,
      filteredList: this.renderList(props.history_list, null)
    };
  }

  componentDidMount() {
    this.props.getHistory({ type: 'list' });
  }

  renderList = (list = [], date) => {
    let array = [];

    if (date) {
      for (day in date) {
        list.forEach((item) => {
          if (item.dat.indexOf(day) != -1) {
            array.push(item);
          }
        })
      }
      
    } else {
      list.forEach((item) => {
        array.push(Object.assign(item, {}))
      })
    }

    return array;
  }

  onFilterPress = () => {
    this.setState({ openModal: true })
  }

  removeFilter = () => {
    this.setState({
      filteredList: this.renderList(this.props.history_list, null),
    })
  }

  onFilter = (dates) => {
    const { history_list } = this.props;


    this.setState({
      filteredList: this.renderList(history_list, dates),
      openModal: false,
    })
  }


  render() {
    const { t, isRequest, lang_key } = this.props;
    const { shareLoading, filteredList, openModal } = this.state;

    return (
      <Container contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
        <Header
          backButton
          filterButton
          text={t('patient:title')}
          onFilterPress={this.onFilterPress}
          navigation={this.props.navigation}
        />
        <SimpleFilter
          openModal={openModal}
          onCancel={() => this.setState({openModal: false})}
          onSuccess={this.onFilter}
          onRemove={this.removeFilter}
          lang_key={lang_key}
        />
        {(!!shareLoading) && (<View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color={ACCENT_BLUE} />
        </View>)}
        <Content style={{ marginTop: -10, zIndex: 1, paddingTop: 10 }} contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {}} padder>
          {
            (!!isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) :
              (<List>
                {(filteredList.length > 0) ? (
                  filteredList.map((item, index) => (
                    <AnalizesItem
                      key={index}
                      headTxt={item.text}
                      dateTxt={item.dat}
                      pdf={item.pdf}
                      isLoading={(value) => this.setState({ shareLoading: value })}
                      onPress={() => {
                        this.props.navigation.navigate({
                          routeName: "cardPatientDetailScreen",
                          key: index,
                          params: {
                            keyid: item.keyid,
                            p_type: item.p_type,
                            pdf: item.pdf,
                            headTxt: item.text,
                            dateTxt: item.dat
                          }
                        });
                      }}
                    />
                  ))
                ) : <Text style={styles.text}>{t('history:no_histories_text')}</Text>
                }

              </List>)
          }
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    history_list: state.content.history.list,
    isRequest: state.content.isRequest,
    lang_key: state.authorization.language
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces(['patient', 'history'])(connect(mapStateToProps, mapDispatchToProps)(CardPatientScreen));
