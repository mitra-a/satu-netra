import React from 'react';
import Splashscreen from './lib/screens/Splashscreen';
import Home from './lib/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Splashscreen"
            component={Splashscreen} 
            initialParams={{ data: null }}
            options={{ headerShown:false }} />
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown:false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;
