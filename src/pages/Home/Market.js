import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet, FlatList, View, Image, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../../colors'
const productsData = require('../../../assets/products.json');
const imageWidth = Dimensions.get('window').width;
import { useIsFocused } from '@react-navigation/native';
import { CONST } from '../../constants';

function Market({ navigation }) {
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState(null);
  const [pirateValue, setpirateValue] = useState([]);
  const startValue = new Animated.Value(1);
  const endValue = 1.1;
  const duration = 2000;


  useEffect(() => {

    //Code for filtering array for each category
    let arrayFiltered = []
    let piratedData = productsData.filter((item) => {
      return item.category == "Pirate"
    })
    piratedData = piratedData.sort((a, b) => a.order - b.order);

    arrayFiltered.push({ catname: "Pirate", data: piratedData });

    let culinaryData = productsData.filter((item) => {
      return item.category == "Culinary"
    })
    culinaryData = culinaryData.sort((a, b) => a.order - b.order);
    arrayFiltered.push({ catname: "Culinary", data: culinaryData });

    let scifiData = productsData.filter((item) => {
      return item.category == "Sci-Fi"
    })
    scifiData = scifiData.sort((a, b) => a.order - b.order);
    arrayFiltered.push({ catname: "Sci-Fi", data: scifiData });

    for (let i = 0; i < arrayFiltered.length; i++) {
      arrayFiltered[i].data.map(itemNew => {
        return itemNew.isAnimated = false
      })
    }
    setpirateValue(arrayFiltered)
  },
    [isFocused]
  );

  function RenderItem({item}){
    return (
      <TouchableOpacity onPress={() => {
        item.isAnimated = true
        setSelectedId(item.id)
        setTimeout(function () {
          navigation.navigate('Details', {
            data: item,
          })
          isAnimated = false  
        }, 1000);
      }}>
        {item.isAnimated ?
          <Animated.View style={{ ...styles.card, transform: [{ scale: startValue },] }}>
            <Image source={{ uri: item.image }} style={styles.roundedImage}></Image>
            <Text style={styles.horizontalText}>{item.name}</Text>
          </Animated.View>
          :
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.roundedImage}></Image>
            <Text style={styles.horizontalText}>{item.name}</Text>
          </View>
        }
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [startValue, endValue, duration]);

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text style={styles.topText}>{CONST.info1}</Text>
        <Text style={{...styles.topText,fontWeight:'bold'}}>{CONST.info2}</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={pirateValue}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>

          <View>
            <View style={styles.main} >
              <Text style={styles.title}>{item.catname}</Text>
              <FlatList
                data={item.data}
                extraData={selectedId}
                keyExtractor={(item, index) => item.id}
                horizontal={true}
                renderItem={({ item, index }) => 
                <RenderItem item={item} />
              }
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
  view:{
    margin: 10 
  },
  main: {
    margin: 5,
    flexDirection: 'column',
    flex: 1,
  },
  title:{
    color:COLORS.black,
    marginHorizontal:15,
    fontWeight:'bold',
    fontSize:16
  },
  flatList:{
    marginBottom: 90 
  },
  text: {
    fontWeight: 'bold',
    color: COLORS.white
  },
  topText: { 
    color: COLORS.black, 
    fontSize: 17 },
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
    fontSize: 17,
    alignSelf: 'center',
    color: COLORS.black 
  },
  roundedImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center'
  },
  card: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 1,
    borderWidth: 1, 
    flexDirection: 'column', 
    margin:10,
    padding:10
  }
});

export default Market;
