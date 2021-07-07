import React from 'react';
import { View, Image } from 'react-native';

const Splashscreen = () => {
    return (
        <View style={{
            flex : 1,
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