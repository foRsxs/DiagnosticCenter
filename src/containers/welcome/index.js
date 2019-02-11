import React, {Component} from 'react';
import { Image, ScrollView } from 'react-native';
import {Container, Content, Text} from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import CustomBtn from '../../components/common/CustomBtn';
import styles from './styles';

import { IMAGE_WELCOME_1, IMAGE_WELCOME_2, IMAGE_WELCOME_3 } from '../../styles/images';

class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <ScrollView contentContainerStyle={styles.wrapContainer}>
        <Container>
					<Content>
						<Text style={styles.title}>Как войти в приложение</Text>
						<Text style={styles.blueText}>Для полного доступа к приложению и к своим данным необходимо авторизироваться в приложении</Text>
						<Text style={styles.darkText}>Выберите <Text style={styles.textBold}>язык</Text></Text>
						<Image
							style={styles.image1}
							resizeMode='contain'
							source={IMAGE_WELCOME_1}
						/>
						<Text style={styles.darkText}>Введите  <Text style={styles.textBold}>номер мобильного телефона</Text> и <Text style={styles.textBold}>ИНН</Text>, для проверки ваших даних в Личном Кабинете Пациента и получения кода</Text>
						<Image
							style={styles.image2}
							resizeMode='contain'
							source={IMAGE_WELCOME_2}
						/>
						<Text style={styles.darkText}>Если все данные введены верно, нажмите кнопку <Text style={styles.textBold}>"Получить код"</Text> и ожидайте код</Text>
						<Text style={styles.darkText}>Введите полученный код</Text>
						<Image
							style={styles.image3}
							resizeMode='contain'
							source={IMAGE_WELCOME_3}
						/>
						<Text style={styles.darkText}>Нажмите кнопку <Text style={styles.textBold}>"Подтвердить"</Text> чтобы войти в систему</Text>
						<Text style={styles.blueText}>Теперь вы можете пользоваться полным фунционалом приложения</Text>
						<CustomBtn label='Продолжить' onClick={() => navigate('authorization')} />
					</Content>
        </Container>
      </ScrollView>
    )
  }
}

export default WelcomeScreen;
