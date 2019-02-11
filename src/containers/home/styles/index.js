import { StyleSheet, Dimensions } from 'react-native';

const Height = Dimensions.get('window').height;

export default StyleSheet.create({
	wrapContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        height: '100%'
    },
    wrapCarousel: {
        height: Height/2.8, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});