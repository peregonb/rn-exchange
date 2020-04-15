import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from "expo";
import Content from "./components/Content";
import Preloader from "./components/Preloader";

const loadApp = async () => {
    await Font.loadAsync({
        'bebas-bold': require('./assets/fonts/BebasNeue-Bold.otf'),
        'bebas-regular': require('./assets/fonts/BebasNeue-Regular.otf'),
        'electro': require('./assets/fonts/Electro.otf')
    });
};

const App = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#111',
            alignItems: 'center',
            justifyContent: 'center',
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

    const floorValue = (currency, attr) =>
        attr < 10 ?
            parseFloat(attr).toFixed(3) :
            parseFloat(attr).toFixed(2);

    return (
        <View style={styles.container}>
            {statusBar}
            {response && responseBonus ?
                <Content response={response} responseBonus={responseBonus} floorValue={floorValue}/> :
                <Preloader/>
            }
        </View>
    )
};

export default App;
