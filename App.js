import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import {withRelativeMeasurement} from "./hoc/withRelativeMeasurement";

const loadApp = async () => {
    await Font.loadAsync({
        'bebas-bold': require('./assets/fonts/BebasNeue-Bold.otf'),
        'bebas-regular': require('./assets/fonts/BebasNeue-Regular.otf'),
        'electro': require('./assets/fonts/Electro.otf')
    });
};

const App = ({vw, fvw}) => {
    const styles = StyleSheet.create({
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
            marginBottom: ((80 * vw) * 1.45) / 40,
            paddingHorizontal: (80 * vw) / 11
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: ((80 * vw) * 1.45) / 60,
            paddingHorizontal: (80 * vw) / 15,
        },
        priceWrap: {
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            width: (80 * vw) / 100 * 38,
        },
        price: {
            fontFamily: 'electro',
            fontSize: 14 * fvw,
            justifyContent: 'center',
            alignItems: 'center',
            transform: Platform.OS === 'ios' ? [{translateY: ((80 * vw) * 1.45) / 50}] : [{translateY: 0}]
        },
        headerItem: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerItemText: {
            fontSize: 10 * fvw,
            lineHeight: 10 * fvw,
            textTransform: 'uppercase',
            letterSpacing: -0.25 * fvw,
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
            width: 80 * vw,
            height: (80 * vw) * 1.45,
            paddingVertical: ((80 * vw) * 1.45) / 15,

            // transform: [{rotateY: '-26deg'}, {rotateX: '10deg'}]
        },
        headline: {
            fontSize: 20 * fvw,
            lineHeight: 20 * fvw,
            textTransform: 'uppercase',
            letterSpacing: -0.5 * fvw,
            fontFamily: 'bebas-bold',
        },
        currencyWrap: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        currency: {
            fontSize: 11 * fvw,
            lineHeight: 11 * fvw,
            paddingHorizontal: (80 * vw) / 40,
            textTransform: 'uppercase',
            letterSpacing: -0.25 * fvw,
            fontFamily: 'bebas-bold'
        }
    });
    const [isReady, setIsReady] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    const [responseBonus, setResponseBonus] = React.useState(null);
    const statusBar = <StatusBar barStyle={"light-content"}/>;

    useEffect(() => {
        fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then(response => response.json())
            .then(data => setResponse(data));

        fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4')
            .then(response => response.json())
            .then(data => setResponseBonus(data));
    }, []);

    if (!isReady) {
        return <AppLoading startAsync={loadApp}
                           onError={err => console.log(err)}
                           onFinish={() => setIsReady(true)}/>
    }

    const floorValue = (currency, attr) => {
        if (currency === 'RUR') {
            // return 0 + (parseFloat(attr) * 10).toFixed(2)
            // return 0 + parseFloat(attr).toFixed(2)
            return parseFloat(attr).toFixed(3)
        } else if (attr < 10 && currency !== 'RUR') {
            return parseFloat(attr).toFixed(3)
        } else return parseFloat(attr).toFixed(2);
    };

    return (
        <View style={styles.container}>
            {statusBar}
            <View style={styles.block}>
                <View style={styles.blockContent}>
                    <View style={styles.top}>
                        <Text style={styles.headline}>
                            Обмiн валют
                        </Text>
                    </View>
                    <View style={styles.content}>
                        {response && responseBonus && <View style={styles.header}>
                            <View style={styles.headerItem}>
                                <Text style={styles.headerItemText}>Купiвля</Text>
                            </View>
                            <View style={styles.headerItem}>
                                <Text style={styles.headerItemText}>Продаж</Text>
                            </View>
                        </View>}

                        {response ? response
                                .filter(item => item.ccy !== 'BTC')
                                .map((item, index) => (
                                    {
                                        id: index,
                                        ccy: item.ccy,
                                        buy: (() => floorValue(item.ccy, item.buy))(),
                                        sale: (() => floorValue(item.ccy, item.sale))(),
                                    }))
                                .map(item =>
                                    (<View key={item.id} style={styles.item}>
                                        <View style={styles.priceWrap}>
                                            <Text textAnchor="middle" style={styles.price}>
                                                {item.buy}
                                            </Text>
                                        </View>
                                        <View style={styles.currencyWrap}>
                                            <Text style={styles.currency}>
                                                {item.ccy}
                                            </Text>
                                        </View>
                                        <View style={styles.priceWrap}>
                                            <Text textAnchor="middle" style={styles.price}>
                                                {item.sale}
                                            </Text>
                                        </View>
                                    </View>)
                                )
                            : <Text>Загрузка данних</Text>}

                        {responseBonus ? responseBonus
                            .filter(item => item.ccy === 'PLZ')
                            .map(item =>
                                (<View key={4} style={styles.item}>
                                    <View style={styles.priceWrap}>
                                        <Text textAnchor="middle" style={styles.price}>
                                            {floorValue(item.ccy, item.buy)}
                                        </Text>
                                    </View>
                                    <View style={styles.currencyWrap}>
                                        <Text style={styles.currency}>
                                            {item.ccy}
                                        </Text>
                                    </View>
                                    <View style={styles.priceWrap}>
                                        <Text textAnchor="middle" style={styles.price}>
                                            {floorValue(item.ccy, item.sale)}
                                        </Text>
                                    </View>
                                </View>)
                            ) : <Text>Загрузка додаткових данних</Text>
                        }
                    </View>
                </View>

            </View>
        </View>
    )
};

export default withRelativeMeasurement(App);


