import React from 'react';
import { View,Text } from "react-native"
import { WIDTH } from '../constanta/Index';
import Animated from 'react-native-reanimated';

const MAX_HEIGHT = 100;
const COUNT_WAVE = 13;
const MIN_HEIGHT = 7;

const AudioWave = () => {
    return (
        <View style={{
            alignItems : 'center',
            flexDirection : 'row'
        }}>
            {new Array(COUNT_WAVE).fill('0').map((item,index) => {
                let height = index == (COUNT_WAVE / 2) ? MAX_HEIGHT : index < (COUNT_WAVE / 2) ?  
                    MAX_HEIGHT - ((COUNT_WAVE - (index + 1)) * MIN_HEIGHT) :  
                    MAX_HEIGHT - (index * MIN_HEIGHT)

                return (
                    <Animated.View style={{
                        width : WIDTH * 0.025,
                        height : height,
                        backgroundColor : 'white',
                        marginHorizontal : 3,
                        borderRadius : MAX_HEIGHT / 2,
                    }}
                    key={index}
                    >
                    </Animated.View>
                )            
            })}
        </View>
    )
}

export default AudioWave;