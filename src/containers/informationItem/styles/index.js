import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: { 
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        height: '100%' 
    },
    textWrap: {
        backgroundColor: 'white', 
        padding: 15, 
        marginTop: 10
    },
    iconList: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 10
    },
    imageWrapper: { 
        paddingHorizontal: 10, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});