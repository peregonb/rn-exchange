import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import {styles} from "./styles";

const loadApp = async () => {
    await Font.loadAsync({
        'bebas-bold': require('./assets/fonts/BebasNeue-Bold.otf'),
        'bebas-regular': require('./assets/fonts/BebasNeue-Regular.otf'),
        'electro': require('./assets/fonts/Electro.otf')
    });
};

export default () => {
    const [isReady, setIsReady] = React.useState(false);
    const statusBar = <StatusBar barStyle={"light-content"}/>;
    const data = [
        {
            'id': '1',
            'name': 'USD',
            'left': '25.54',
            'right': '26.32'
        },
        {
            'id': '2',
            'name': 'EUR',
            'left': '29.24',
            'right': '30.23'
        },
        {
            'id': '3',
            'name': 'RUB',
            'left': '03.80',
            'right': '04.15'
        },
        {
            'id': '4',
            'name': 'PLN',
            'left': '08.34',
            'right': '08.97'
        },
    ];

    if (!isReady) {
        return <AppLoading startAsync={loadApp}
                           onError={err => console.log(err)}
                           onFinish={() => setIsReady(true)}/>
    }
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
                        <View style={styles.header}>
                            <View style={styles.headerItem}>
                                <Text style={styles.headerItemText}>Купiвля</Text>
                            </View>
                            <View style={styles.headerItem}>
                                <Text style={styles.headerItemText}>Продаж</Text>
                            </View>
                        </View>

                        {data.map(item => (
                            <View key={item.id} style={styles.item}>
                                <View style={styles.priceWrap}>
                                    <Text style={styles.price}>
                                        {item.left}
                                    </Text>
                                </View>
                                <View style={styles.currencyWrap}>
                                    <Text style={styles.currency}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.priceWrap}>
                                    <Text style={styles.price}>
                                        {item.right}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        
                    </View>
                </View>

            </View>
        </View>
    )
}


