import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home';
import Details from './src/details/Details';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="Details" component={Details}/>

    </Stack.Navigator>
  </NavigationContainer>
);


export default App;
