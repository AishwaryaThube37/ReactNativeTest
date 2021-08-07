import React, { useState, useEffect } from 'react';
import { NativeModules, StyleSheet, Text, View } from 'react-native';
var KeyService = NativeModules.GetKey;

//Native module Integration for getting value from string.xml
function NativeModuleComponent() {
    const [key, setKey] = useState(0);
    useEffect(() => {
        var Servicekey = KeyService.getServiceKey();
        console.log("ServiceKey", Servicekey);
        setKey(Servicekey)
    },
        []
    );
    return (
        <View style={styles.text}>
            <Text>Service Key : {key}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
});
export default NativeModuleComponent;

