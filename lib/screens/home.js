import React,{useEffect, useRef, useState} from 'react';
import { Pressable, FlatList, ListView } from 'react-native';
import { Navbar, ChatBox, ChatPop, BottomPopUp } from '../components';
import Voice from '@react-native-voice/voice';
import { RegistrationName } from '../function/registration-name';
import { MASTER } from '../function/master';
import { UUID } from '../constanta';

const Home = () => {
    const [speech , setSpeech] = useState(false); 
    const listView = useRef();

    const [home , setHome] = useState({
        callback : null,
        chat : [],
        profile : {
            name : '',
            age : '',
            blind : '',
            gender : '',
        }
    });

    const PROPS = {
        setHome,
        home
    };

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResult
        Voice.onSpeechEnd = onSpeechEnd
        Voice.onSpeechError = onSpeechError

        if(!home.profile.name || 
           !home.profile.age || 
           !home.profile.gender || 
           !home.profile.blind){
            RegistrationName(PROPS,true);
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            listView.current.scrollToEnd();
        },800)
    },[home])
    
    function onSpeechResult(result){   
        setTimeout(() => {
            home.chat.push({
                id : UUID(),
                text : result.value[0],
                type : 'user'
            })

            setHome({...home});
        }, 500);

        MASTER(PROPS,result.value[0]);
    }

    function onSpeechEnd(){
        setSpeech(false);
    }

    function onSpeechError(){
        setSpeech(false);
    }

    function speechStart(){
        Voice.start('id_ID');
        setSpeech(true);
    }

    function screen(){
        return (
            <>
                <Navbar />
                
                <ChatBox>
                    <FlatList
                        ref={listView}
                        showsVerticalScrollIndicator={false}
                        data={home.chat}
                        keyExtractor={(item) => item.id}
                        renderItem = {({item,index}) => (
                            <ChatPop 
                                type={item.type} 
                                text={item.text}
                                key={item.id}   
                            />
                        )}
                     />
                </ChatBox>

                { speech && (
                    <BottomPopUp />
                )}
            </>
        )
    }

    return (
        <Pressable style={{flex:1}} onPress={() => speechStart()}>
            { screen() }
        </Pressable>
    )
}

export default Home;