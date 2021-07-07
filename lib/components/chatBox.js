import React from 'react';
import {View} from 'react-native';
import { PADDING_HORIZONTAL } from '../constanta';

const ChatBox = ({children}) => (
    <View style={{
        flex: 1,
        paddingHorizontal : PADDING_HORIZONTAL,
    }}>
       {children} 
    </View>
)

export default ChatBox;
