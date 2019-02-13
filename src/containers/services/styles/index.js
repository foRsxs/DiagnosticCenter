import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        opacity: 1,
        height: '100%'
    },
    mainContentContainer: { 
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        height: '100%' 
    },
    content: { 
        marginTop: -10, 
        zIndex: 1, 
        paddingTop: 10 
    }
});