import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../colors'
const productsData = require('../../../assets/products.json');

function Product() {
    const [newProductData, setProductData] = useState([]);
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            (window) => {
                setDimensions(Dimensions.get('window').width);
            }
        );
        return () => subscription?.remove();
    });

    //Function extracted to display in flatlist
    function RenderItem({ item }) {
        let floating_price = (item.price / 100).toFixed(Math.max((((item.price / 100) + '').split(".")[1] || "").length, 2));
        let discount_floating_price = (item.discountPrice / 100).toFixed(Math.max((((item.discountPrice / 100) + '').split(".")[1] || "").length, 2));
        return (
            <View>
                <Image source={{ uri: item.image }} style={{ ...styles.image, width: dimensions }}>
                </Image>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.name}</Text>
                        <View style={styles.middle}>
                            <Text style={{ ...styles.text, textDecorationLine: item.discount == null ? null : 'line-through' }}>{item.price == 0 ? "Free" : floating_price + "€"}</Text>
                            {item.discount == null ? null : <Text style={styles.priceText}>{item.discountPrice == 0 ? "Free" : discount_floating_price + "€"}</Text>}
                        </View>
                        <Text style={styles.shortDescription}>{item.short_description}</Text>
                    </View>
                    <View style={styles.roundedAvatar}>
                        <Image source={{ uri: item.image }} style={styles.roundedImage}></Image>
                    </View>

                </View>
            </View>
        )

    }

    useEffect(() => {
        //Code for calculating discount price 
        let newData = productsData.map(function (element) {
            if (element.discount != null && element.discount_type == "amount") {
                element.discountPrice = element.price - element.discount;
            }
            else if (element.discount != null && element.discount_type == "percentage") {
                let discount = (element.price * element.discount / 100);
                element.discountPrice = element.price - discount;
            }
            else {
                element.discountPrice = element.price;
            }
            return element;
        })
        setProductData(newData)
    }, []);

    return (
        <SafeAreaView>
            <FlatList
                data={newProductData}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) =>
                    <RenderItem item={item} />
                }
            />
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
        color: COLORS.white,
        fontSize: 16
    },
    middle:
    {
        flexDirection: "row"
    },
    image: {
        resizeMode: 'stretch',
        borderRadius: 5,
        aspectRatio: 4 / 3
    },
    roundedImage: {
        height: 50,
        width: 50,
        borderRadius: 50, margin: 10
    },
    row: {
        flex: 0.8
    },
    shortDescription: {
        color: COLORS.white, fontSize: 15
    },
    roundedAvatar:
    {
        flex: 0.2
    },
    priceText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 17
    }
});

export default Product;
