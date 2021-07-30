import React,{useEffect, useState} from 'react';
import { View, Text } from "react-native"
import { WIDTH } from '../constanta/Index';

import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const MAX_HEIGHT = 60;
const COUNT_WAVE = 13;

const AudioWave = () => {
    return (
        <View style={{
            alignItems : 'center',
            flexDirection : 'row'
        }}>
            {new Array(COUNT_WAVE).fill('0').map((item,index) => {
                let height = (index % 2) == 0 ? MAX_HEIGHT/1.4 : MAX_HEIGHT;

                return (
                    <StickWave
                        key={index}
                        height={height}
                        opacity={(index % 2) == 0}
                    />
                )            
            })}
        </View>
    )
}

const StickWave = ({height,opacity}) => {
    const width = useSharedValue(50);
    const [loop,setLoop] = useState(false);

    const style = useAnimatedStyle(() => {
        return {
            height: withTiming(width.value, {
                duration: 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
        };
    });

    useEffect(() => {
        if(width.value == height){
            width.value = height / 2;
        }else{
            width.value = height;
        }
    },[loop])

    return (
        <Animated.View style={[{
            width : WIDTH * 0.025,
            backgroundColor : 'white',
            marginHorizontal : 3,
            opacity : opacity ? 1 : 0.5,
            borderRadius : MAX_HEIGHT / 2,
        },style]}
        >
        </Animated.View>
    )
}

export default AudioWave;