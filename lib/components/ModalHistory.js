import React, { useEffect, useState } from 'react';
import { View , Text, FlatList, Pressable} from 'react-native';
import * as Icon from 'react-native-feather';
import { WIDTH, HEIGHT, PADDING_HORIZONTAL, PADDING} from '../constanta/Index';
import { History } from '../function/History';

const ModalHistory = ({ close }) => {
    const [data , setData] = useState([]);

    useEffect(() => {
        getDataHistory();
    }, [])
    
    async function getDataHistory(){
        let data = await History('','GET');
        setData(data);
    }

    return (
        <View style={{
            flex : 1,
            position: 'absolute',
            width : WIDTH,
            height : HEIGHT,
            justifyContent : 'center',
        }}>
            <Pressable onPress={() => close()} style={{
                position: 'absolute',
                backgroundColor : '#0D0946',
                opacity : 0.4,
                width : WIDTH,
                height : HEIGHT,
            }} />
            
            <View
                style={{
                    marginHorizontal : PADDING_HORIZONTAL,
                    height : HEIGHT / 1.3,
                    backgroundColor : '#fff',
                    borderRadius : 10,
                }}
            >
                <View style={{
                    padding : PADDING,
                    borderBottomWidth : 5,
                    borderBottomColor : '#E9E9E9',
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}>
                    <Text style={{
                        fontFamily : 'PoppinsBold',
                        fontSize : 20,
                    }}>Riwayat</Text>

                    <Pressable onPress={() => close()}>
                        <View>
                            <Icon.XCircle stroke="black" width={25} height={25} />
                        </View>
                    </Pressable>
                </View>

                <View style={{
                    padding : PADDING,
                    flex : 1,
                }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem = {({item,index}) => (
                            <View style={{
                                borderBottomWidth : 3,
                                padding : 10,
                                borderBottomColor : '#E9E9E9',
                            }} key={item.index}>
                                <Text style={{
                                    fontSize : 14,
                                    fontFamily : 'PoppinsBold',
                                }}>
                                    {item.history}
                                </Text>

                                <Text style={{
                                    fontSize : 12,
                                    fontFamily : 'PoppinsRegular'
                                }}>
                                    {item.createdAt}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

export default ModalHistory;