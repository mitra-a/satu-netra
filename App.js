import React from 'react';
import { View,StatusBar,SafeAreaView } from 'react-native';
import Splashscreen from './lib/screens/splashscreen';
import Home from './lib/screens/home';

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      {/* <Splashscreen /> */}
      <Home />
    </SafeAreaView>
  )
}

export default App;
