import React, {  } from 'react';
import { SafeAreaView, Text, StyleSheet,View, Image,ScrollView } from 'react-native';
import { COLORS } from '../colors'

//This screen consist of code to display the details of selected product
function Details({ route, navigation }) {
    const { data } = route.params;
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <Image source={{ uri: data.image }} style={styles.image}>
                    </Image>
                    <Text style={{ ...styles.textDetails, fontWeight: 'bold', fontSize: 18 }}>{data.name}</Text>
                    <Text style={styles.textDetails}>{data.price + "€"}</Text>
                    <Text style={{ ...styles.textDetails, fontSize: 16 }}>{data.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Transperent,
        left: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        padding: 10,
        justifyContent: 'space-around'
    },
    text: {
        fontWeight: 'bold',
        color: COLORS.white
    }
    ,
    image: {
        resizeMode: 'stretch',
        borderRadius: 5,
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginVertical: 20
    },
    textDetails: {
        color: COLORS.black,
        fontSize: 17,
        alignSelf: 'center'
    }

});

export default Details;
