import React from 'react';
import {View , Text} from 'react-native';
import { WIDTH,PADDING,BORDER_RADIUS } from '../constanta/Index';

const ChatPop = ({type,text}) => (
    <View style={{
        maxWidth : WIDTH - (WIDTH * 0.3),
        backgroundColor : type == 'user' ? '#5B7BF0' : '#F5F5F5',
        padding : PADDING,
        borderRadius : BORDER_RADIUS,
        alignSelf : type == 'user' ? 'flex-end' : 'flex-start',
        borderWidth : 2,
        borderColor : type == 'user' ? '#E9E9E9' : '#fff',
        marginBottom : PADDING - (PADDING * 0.5),
    }}>
        <Text style={{
            fontFamily : 'PoppinsRegular',
            fontSize : 12,
            color : type == 'user' ? '#fff' : '#000'
        }}>{text}</Text>
    </View>
)

export default ChatPop;