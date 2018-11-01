import {StyleSheet} from 'react-native';
import variables from '../../styles/variables'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: variables.colors.backgroundBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },
  headerTxt: {
    paddingVertical: 20,
    fontSize: variables.fSize.main
  },
  footer: {
    paddingVertical: 15, 
    backgroundColor: 'transparent', 
    justifyContent: 'flex-start'
  }
});

export default styles;