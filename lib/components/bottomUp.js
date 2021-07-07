
import React from 'react';
import { View,Text } from 'react-native';
import * as Icon from 'react-native-feather';
import { PADDING_HORIZONTAL,BORDER_RADIUS } from '../constanta';    

const BottomPopUp = () => {
return (
    <View style={{
        display:'flex',
        flexDirection : 'row',
        backgroundColor: '#0D0946',
        paddingHorizontal : PADDING_HORIZONTAL,
        paddingVertical : PADDING_HORIZONTAL + 10,
        alignItems :'center',
    }}>
            <View style={{
                height : 70,
                width : 70,
                backgroundColor : '#5B7BF0',
                borderRadius : BORDER_RADIUS,
                alignItems: 'center',
                justifyContent : 'center'
            }}>
                <Icon.Mic stroke="white" width={36} height={36} />
            </View>

            <View style={{
                paddingHorizontal : PADDING_HORIZONTAL,
                flex : 1,
            }}>
                <Text style={{
                    color : '#fff',
                    fontFamily : 'PoppinsRegular'
                }}>
                    Disini akan tampil text yang didengarkan oleh aplikasi, jika sedang dalam mode mendegarkan....
                </Text>
            </View>
    </View>
)
}

export default BottomPopUp;