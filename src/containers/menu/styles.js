import {StyleSheet} from 'react-native';
import variables from '../../styles/variables'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'white',
    paddingBottom: 20
  },
  header: {
    backgroundColor: variables.colors.backgroundBlue,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },
  headerTxt: {
    paddingVertical: 30,
    fontSize: variables.fSize.main
  },
  footer: {
    height: 80, 
    backgroundColor: 'transparent', 
    justifyContent: 'flex-start'
  }
});

export default styles;