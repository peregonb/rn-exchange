import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 7,
        marginBottom: 10
    },
    priceWrap: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '39%'
    },
    price: {
        fontFamily: 'electro',
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerItem: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerItemText: {
        fontSize: 32,
        textTransform: 'uppercase',
        lineHeight: 32,
        letterSpacing: -1,
        fontFamily: 'bebas-bold'
    },
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockContent: {
        backgroundColor: '#fed700',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        height: '70%',
        paddingVertical: 30,
        // transform: [{rotateY: '-26deg'}, {rotateX: '10deg'}]
    },
    headline: {
        fontSize: 72,
        lineHeight: 72,
        textTransform: 'uppercase',
        letterSpacing: -2,
        fontFamily: 'bebas-bold'
    },
    currencyWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    currency: {
        fontSize: 46,
        textTransform: 'uppercase',
        lineHeight: 46,
        letterSpacing: -1,
        fontFamily: 'bebas-bold'
    }
});