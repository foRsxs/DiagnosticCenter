import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Container, Content, List } from 'native-base';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import * as ContentActions from '../../actions/content';
import AnalizesItem from '../../components/AnalizesItem'
import Header from '../../components/common/Header';
import SimpleFilter from '../../components/common/SimpleFilter';

import styles from './styles.js';
import { ACCENT_BLUE, MAIN_FONT } from '../../styles/constants';
import variables from '../../styles/variables';
const { medium } = variables.fSize;

class AnalizesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareLoading: false,
      openModal: false,
      filteredList: this.renderList(props.analizes_list, null)
    };
  }

  componentDidMount() {
    this.props.getAnalizes({ type: '_list' })
  }

  renderList = (list = [], date) => {
    let array = [];

    if (date) {
      for (day in date) {
        list.forEach((item) => {
          if (item.dat_string.indexOf(moment(day).format('DD.MM.YYYY')) != -1) {
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

  onFilter = (dates) => {
    const { analizes_list } = this.props;

    this.setState({
      filteredList: this.renderList(analizes_list, dates),
      openModal: false,
    })
  }

  removeFilter = () => {
    this.setState({
      filteredList: this.renderList(this.props.analizes_list, null),
    })
  }

  render() {
    const { t, isRequest, lang_key } = this.props;
    const { shareLoading, openModal, filteredList } = this.state;

    return (
      <Container contentContainerStyle={styles.mainContainer}>
        <Header 
          backButton
          filterButton
          text={t('analizes:title')} 
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
        <Content style={styles.mainContent} contentContainerStyle={(isRequest) ? { flex: 1, justifyContent: 'center' } : {}} padder>
          {(!!isRequest) ? (<ActivityIndicator size="large" color={ACCENT_BLUE} />) :
          (<List>
            {
              (filteredList.length) ? (
                filteredList.map((item, index) => (
                  <AnalizesItem
                    key={index}
                    headTxt={item.text}
                    dateTxt={item.dat_string}
                    pdf={item.pdf}
                    isLoading={(value) => this.setState({ shareLoading: value })}
                    onPress={() => {
                      this.props.navigation.navigate({
                        routeName: "analizesItem",
                        key: index,
                        params: {
                          res_id: item.res_id,
                          date: item.dat_string,
                          pdf: item.pdf,
                          headTxt: item.text,
                          dateTxt: item.dat_string
                        }
                      });
                    }}
                  />
                ))
              ) : (<Text style={{ textAlign: 'center', fontSize: medium, fontFamily: MAIN_FONT }}>{t('analizes:no_analizes_text')}</Text>)
            }
          </List>)}
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    analizes_list: state.content.analizes.list,
    isRequest: state.content.isRequest,
    lang_key: state.authorization.language
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ContentActions, dispatch);
}

export default withNamespaces('analizes')(connect(mapStateToProps, mapDispatchToProps)(AnalizesScreen));
