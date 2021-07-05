import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import * as Icon from 'react-native-feather';

const WIDTH = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 20;
const PADDING_VERTICAL = 20;
const PADDING = 15;
const BORDER_RADIUS = 10;

const Home = () => {
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

    const ChatBox = ({children}) => (
        <View style={{
            flex: 1,
            paddingHorizontal : PADDING_HORIZONTAL,
        }}>
           {children} 
        </View>
    )

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

    return (
        <View style={{ flex:1 }}>
            <Navbar />
            <ChatBox>
                <ChatPop type="bot" text="Selamat datang di Aplikasi Satunetra ketuk layar untuk melanjutkan registrasi" />
                <ChatPop type="bot" text="Silakan masukkan nama anda dengan menekan bagian tengah layar smartphone anda kemudian ucapkan nama anda" />
                <ChatPop type="user" text="Hidayah" />
                <ChatPop type="bot" text="Selamat datang di Aplikasi Satunetra ketuk layar untuk melanjutkan registrasi" />
                <ChatPop type="user" text="20" />
            </ChatBox>
            <BottomPopUp />
        </View>
    )
}

export default Home;