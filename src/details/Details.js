import React, {  } from 'react';
import { SafeAreaView, Text, StyleSheet,View, Image,ScrollView } from 'react-native';
import { COLORS } from '../colors'

//This screen consist of code to display the details of selected product
function Details({ route, navigation }) {
    const { data } = route.params;
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.main}>
                    <Image source={{ uri: data.image }} style={styles.image}>
                    </Image>
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.price}>{data.price + "€"}</Text>
                    <Text style={styles.desc}>{data.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main:{
        margin: 20
    },
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
    price: {
        color: COLORS.black,
        fontSize: 17,
        alignSelf: 'center'
    },
    
    name:{
        fontWeight: 'bold', 
        fontSize: 18,
        color: COLORS.black,
        alignSelf: 'center'
    },
    desc:{
        color: COLORS.black,
        fontSize: 16
    },

});

export default Details;
