
import React, { useEffect } from 'react';
import { View,Text } from 'react-native';
import * as Icon from 'react-native-feather';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { PADDING_HORIZONTAL,BORDER_RADIUS, WIDTH } from '../constanta/Index';    

const BottomPopUp = ({
    speech, 
    partial = null,
    number = null,
    type = 'VOICE'
}) => {

//VOICE
//HIPNOTERAPI
//MUSIC

function icon() {
    if(type == 'VOICE'){
        return (<Icon.Mic stroke="white" width={36} height={36} />)
    }
    
    if(type == 'HIPNOTERAPI'){
        return (<Icon.Loader stroke="white" width={36} height={36} />)
    }
    
    if(type == 'MUSIC'){
        return (<Icon.Headphones stroke="white" width={36} height={36} />)
    }
}

function text(){
    // Anda sedang mendengarkan musik yang disediakan oleh kami

    if(type == 'HIPNOTERAPI'){
        return(
            <Text style={{
                color : '#fff',
                fontFamily:'PoppinsRegular',
                fontSize : 12
            }}>
                Anda sedang mendengarkan {"\n"}
                sesi Hipnoterapi
            </Text>
        )
    }

    if(type == 'MUSIC'){
        return(
            <Text style={{
                color : '#fff',
                fontFamily:'PoppinsRegular',
                fontSize : 12
            }}>
                Anda sedang mendengarkan {"\n"}
                sesi Musik
            </Text>
        )
    }

    return speech ? (
        <Text style={{
            color : '#fff',
            fontFamily:'PoppinsRegular',
            fontSize : 12
        }}>
            {partial}
        </Text>
    ) : (
        <Text style={{
            color : '#fff',
            fontFamily:'PoppinsRegular',
            fontSize : 12
        }}>
            Selamat datang {"\n"}
            Tap layar sekali untuk bicara
        </Text>
    )
}

return (
    <View style={{
        display:'flex',
        flexDirection : 'row',
        backgroundColor: '#0D0946',
        paddingHorizontal : PADDING_HORIZONTAL,
        paddingVertical : PADDING_HORIZONTAL + 10,
        alignItems :'center',
        overflow : 'hidden',
        position : 'relative'
    }}>
            {speech && (
                <>
                    <RingLoading delay={0} />
                    <RingLoading delay={300} />
                    <RingLoading delay={300} />
                </>
            )}

            <View style={{
                height : 70,
                width : 70,
                backgroundColor : type == 'VOICE' ? (speech ? '#5B7BF0' : '#1A1C63') : '#5B7BF0',
                borderRadius : BORDER_RADIUS,
                alignItems: 'center',
                justifyContent : 'center'
            }}>
                {icon()}
            </View>

            <View style={{
                paddingHorizontal : PADDING_HORIZONTAL,
                flex : 1,
                alignItems : 'baseline',
                height : '100%',
            }}>
                <View>
                    <View style={{
                    }}>
                        <Text style={{
                            color : '#fff',
                            fontFamily : 'PoppinsBold',
                            fontSize: 15
                        }}>{type} :</Text>
                    </View>
                </View>
                
                <View>
                    {text()}
                </View>
            </View>

            { number && (
                <View style={{
                    height : 70,
                    width : 70,
                    backgroundColor : '#1A1C63',
                    borderRadius : BORDER_RADIUS,
                    alignItems: 'center',
                    justifyContent : 'center'
                }}>
                    <Text style={{
                        fontSize : 22,
                        fontFamily: 'PoppinsRegular',
                        color:'#fff'
                    }}>{ number }</Text>
                </View>
            )}
    </View>
)
}

const RingLoading = ({delay}) => {
    const ring = useSharedValue(0);

    useEffect(() => {
        ring.value = withDelay(delay,withRepeat(
            withTiming(1,{
                duration : 1000,
            }),-1,
        false))
    }, [])

    const style = useAnimatedStyle(() => {
        return {
            opacity : 1 - ring.value,
            transform : [
                {scale : interpolate(ring.value,[0,1],[0,1.2])}
            ],
        }
    })

    return (
        <Animated.View style={[{
            width: WIDTH,
            height: WIDTH,
            backgroundColor : '#191367',
            borderRadius : WIDTH,
            position : 'absolute',
        },style]} />
    )
}

export default BottomPopUp;