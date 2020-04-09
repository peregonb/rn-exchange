import React, {useState} from 'react';
import {Dimensions} from 'react-native';

export const withRelativeMeasurement = Component => {
    return props => {
        const [deviceWidth] = useState(Dimensions.get('window').width);
        const [deviceHeight] = useState(Dimensions.get('window').height);

        let fontSize = (() => Platform.OS === 'ios' ? deviceWidth / 100 : deviceWidth / 115)();

        return <Component {...props} vh={deviceHeight / 100} vw={deviceWidth / 100} fvw={fontSize}/>
    };
};