import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet, FlatList, View, Image, TouchableOpacity, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { COLORS } from '../../colors'
const productsData = require('../../../assets/products.json');
const imageWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';

function Market({ navigation }) {
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState(null);
  const [pirateValue, setpirateValue] = useState([]);
  const startValue = new Animated.Value(1);
  const endValue = 1.1;
  const duration = 2000;


  useEffect(() => {

    //Code for filtering array for each category
    var arrayFiltered = []
    var piratedData = productsData.filter((item) => {
      return item.category == "Pirate"
    })
    piratedData = piratedData.sort((a, b) => a.order - b.order);

    arrayFiltered.push({ catname: "Pirate", data: piratedData });

    var culinaryData = productsData.filter((item) => {
      return item.category == "Culinary"
    })
    culinaryData = culinaryData.sort((a, b) => a.order - b.order);
    arrayFiltered.push({ catname: "Culinary", data: culinaryData });

    var scifiData = productsData.filter((item) => {
      return item.category == "Sci-Fi"
    })
    scifiData = scifiData.sort((a, b) => a.order - b.order);
    arrayFiltered.push({ catname: "Sci-Fi", data: scifiData });

    for (var i = 0; i < arrayFiltered.length; i++) {
      arrayFiltered[i].data.map(itemNew => {
        return itemNew.isAnimated = false
      })
    }
    setpirateValue(arrayFiltered)
  },
    [isFocused]
  );

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue, endValue, duration]);

  return (
    <SafeAreaView>
      <View style={{ margin: 10 }}>
        <Text style={{ color: COLORS.black, fontSize: 17 }}>Scroll horizontally for more products of each category</Text>
        <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>Click on Product for more details...</Text>
      </View>
      <FlatList
        style={{ marginBottom: 90 }}
        data={pirateValue}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>

          <View>
            <View style={styles.main} >
              <Text style={{ ...styles.horizontalText, fontWeight: 'bold', fontSize: 19 }}>{item.catname}</Text>
              <FlatList
                data={item.data}
                extraData={selectedId}
                keyExtractor={(item, index) => item.key}
                horizontal={true}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity onPress={() => {
                      item.isAnimated = true
                      setSelectedId(item.id)
                      setTimeout(function () {
                        item.isAnimated = false
                        navigation.navigate('Details', {
                          data: item,
                        })
                      }, 2000);
                    }}>
                      {item.isAnimated ?
                        <Animated.View style={{ ...styles.card, borderWidth: 1, flexDirection: 'column', margin: 10, transform: [{ scale: startValue },] }}>
                          <Image source={{ uri: item.image }} style={styles.roundedImage}></Image>
                          <Text style={{ ...styles.horizontalText, alignSelf: 'center', color: COLORS.black }}>{item.name}</Text>
                        </Animated.View>
                        :
                        <View style={{ ...styles.card, borderWidth: 1, flexDirection: 'column', margin: 10 }}>
                          <Image source={{ uri: item.image }} style={styles.roundedImage}></Image>
                          <Text style={{ ...styles.horizontalText, alignSelf: 'center', color: COLORS.black }}>{item.name}</Text>
                        </View>
                      }
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
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
    justifyContent: 'space-around'
  },
  main: {
    backgroundColor: COLORS.Transperent,
    margin: 10,
    flexDirection: 'column',
    flex: 1
  },
  text: {
    fontWeight: 'bold',
    color: COLORS.white
  }
  ,
  image: {
    width: imageWidth,
    resizeMode: 'stretch',
    borderRadius: 5,
    aspectRatio: 4 / 3
  },
  horizontalText: {
    color: COLORS.white,
    padding: 5,
    width: imageWidth / 2,
    fontSize: 17
  },
  roundedImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center'
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flex: 1
  }
});

export default Market;
