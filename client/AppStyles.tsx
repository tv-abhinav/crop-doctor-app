import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007aff',  // A typical iOS blue color for navigation bars
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingTop: 30
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    bodyText: {
        fontSize: 20,
        marginBottom: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row', // Align children horizontally
        alignItems: 'center', // Center children vertically in the container
        justifyContent: 'center', // Center children horizontally in the container
        backgroundColor: '#fff',
    },
    
});