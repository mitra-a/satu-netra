import React from 'react';
import { View , Text} from 'react-native';
import { PADDING_HORIZONTAL,PADDING_VERTICAL } from '../constanta/Index';

const Navbar = () => (
    <View style={{
        borderBottomWidth : 5,
        borderBottomColor : '#E9E9E9',
        paddingVertical : PADDING_VERTICAL,
        paddingHorizontal : PADDING_HORIZONTAL,
    }}>
        <View>
            <Text style={{
                fontSize : 20,
                fontFamily : 'PoppinsBold',
            }}>SatuNetra</Text>

            <View style={{
                marginTop : -10,
                flexDirection : 'row',
                alignContent: 'center'
            }}>
                <View style={{
                    width:10,
                    height:10,
                    borderRadius:10,
                    backgroundColor:'#5B7BF0',
                    alignSelf : 'center'
                }}></View>

                <Text style={{
                    marginBottom : -3,
                    marginLeft : 5,
                    fontSize : 12,
                    fontFamily : 'PoppinsRegular',
                    alignSelf : 'center'
                }}>Online</Text>
            </View>
        </View>
    </View>
)

export default Navbar;