import React,{useEffect, useState} from 'react';
import { Pressable } from 'react-native';
import { Navbar,ChatBox,ChatPop,BottomPopUp } from '../components';
import Voice from '@react-native-voice/voice';

const Home = () => {
    const [speech , setSpeech] = useState(false); 
    const [chat , setChat] = useState([]);

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResult
        Voice.onSpeechEnd = onSpeechEnd
        Voice.onSpeechError = onSpeechError
    }, [])
    
    function onSpeechResult(){

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
                    <ChatPop type="bot" text="Sawadikap datang di Aplikasi Satunetra ketuk layar untuk melanjutkan registrasi" />
                    <ChatPop type="bot" text="Silakan masukkan nama anda dengan menekan bagian tengah layar smartphone anda kemudian ucapkan nama anda" />
                    <ChatPop type="user" text="Hidayah" />
                    <ChatPop type="bot" text="Selamat datang di Aplikasi Satunetra ketuk layar untuk melanjutkan registrasi" />
                    <ChatPop type="user" text="20" />
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