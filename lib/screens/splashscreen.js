import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image } from 'react-native';
import RNExitApp from 'react-native-exit-app';

const Splashscreen = ({ route , navigation }) => {
    const { data } = route.params;

    useEffect(() => {
        if(data !== null){
            setTimeout(() => {
                RNExitApp.exitApp();
            },12000)
        }else{
            Home();
        }

    }, [])

    async function getData(){
        try {
            const jsonValue = await AsyncStorage.getItem('@profile')
            if(jsonValue.search('nama')){
                return JSON.parse(jsonValue);
            }else{
                return false
            }
        } catch(e) {

        }
    }

    async function Home(){
        let data = await getData();
        setTimeout(() => {
            navigation.replace('Home',{
                profile : data
            })
        }, 1000)
    }

    return (
        <View style={{
            flex : 1,
            backgroundColor: '#fff',
            justifyContent : 'center',
            alignItems : 'center',
        }}>
            <Image 
                style={{
                    height:95,
                    width:190,
                    resizeMode: 'cover',
                }}
                // @ts-ignore
                source={require('../../assets/logo/dark.png')}
             />
        </View>
    )
}

export default Splashscreen;