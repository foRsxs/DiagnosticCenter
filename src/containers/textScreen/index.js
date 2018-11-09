import React, {Component} from 'react';
import {Alert, StyleSheet, BackHandler} from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import i18n from '../../i18n';
import variables from '../../styles/variables';
import Header from '../../components/common/Header';
import HeaderBottom from '../../components/common/HeaderBottom';

class TextScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
    return (
      <Container contentContainerStyle={{justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
        <Header text="Текстовая" navigation = {this.props.navigation} backDisabled={true} inversion={true}/>
        <Content style={{marginTop: -10, zIndex: 1, paddingTop: 10}} padder>
          <Text style={styles.text}>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни. Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики. Великий Оксмокс предупреждал ее о злых запятых, диких знаках вопроса и коварных точках с запятой, но текст не дал сбить себя с толку. Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу. Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад, на силуэт своего родного города Буквоград, на заголовок деревни Алфавит и на подзаголовок своего переулка Строчка.  Грустный реторический вопрос скатился по его щеке и он продолжил свой путь. По дороге встретил текст рукопись.</Text>
        </Content >
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: variables.colors.lightBlack, 
    fontFamily: variables.fonts.mainFont,
    fontSize: variables.fSize.medium
  }
});

export default TextScreen;
