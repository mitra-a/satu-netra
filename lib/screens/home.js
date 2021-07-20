import React,{useEffect, useRef, useState} from 'react';
import { Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navbar, ChatBox, ChatPop, BottomPopUp } from '../components/Index';
import Voice from '@react-native-voice/voice';
import { PADDING, UUID } from '../constanta/Index';
import { SatuNetra } from '../function/SatuNetra';
import Tts from 'react-native-tts';

const Home = ({ route,navigation  }) => {
    const { profile } = route.params;
    const [speech , setSpeech] = useState(false); 
    const [speak , setSpeak] = useState(false); 
    const listView = useRef();

    const [home , setHome] = useState({
        callback : null,
        chat : [],
        previous : null,
        next : null,
        profile : {
            name : '',
            age : '',
            blind : '',
            gender : '',
        }
    });

    useEffect(() => {
        Tts.setDefaultLanguage('id-ID');

        Voice.onSpeechResults = onSpeechResult
        Voice.onSpeechEnd = onSpeechEnd
        Voice.onSpeechError = onSpeechError
        Tts.addEventListener('tts-start', onTtsStart)
        Tts.addEventListener('tts-finish', onTtsFinish)

        if(profile){
            const bot = SatuNetra(profile.name , 'welcome-name');

            home.chat.push({
                id : UUID(),
                text : bot.text,
                type : 'bot'
            })

            home.previous = bot.previous
            home.next = bot.next

            home.profile.name = profile.name;
            home.profile.age = profile.age;
            home.profile.blind = profile.blind;
            home.profile.gender = profile.gender;

            setHome({...home});
            TtsStart(bot.text);
        }else{
            const bot = SatuNetra(null , 'welcome');
            home.chat.push({
                id : UUID(),
                text : bot.text,
                type : 'bot'
            })
            home.previous = bot.previous
            home.next = bot.next
            setHome({...home});
            TtsStart(bot.text);
        }
    }, [])

    useEffect(() => {
        if(home.next == 'registration-name'){
            console.log('asdadss');
            const bot = SatuNetra(null , home.next);
           
            home.chat.push({
                id : UUID(),
                text : bot.text,
                type : 'bot'
            })
            home.previous = bot.previous
            home.next = bot.next
            setHome({...home});
            TtsStart(bot.text);
        }

        setTimeout(() => {
            // @ts-ignore
            listView.current.scrollToEnd();
        },800)
    },[home])

    function TtsStart(text){
        Tts.speak(text);
    }

    function onTtsFinish(){
        setSpeak(false);
    }
    
    function onTtsStart(){
        setSpeak(true);
    }
    
    async function saveData(){
        try {
            const jsonValue = JSON.stringify(home.profile)
            await AsyncStorage.setItem('@profile', jsonValue)
        } catch (e) {
        }
    }

    async function onSpeechResult(result){
        const bot = SatuNetra(result.value[0] , home.next);
        home.chat.push(
        {
            id : UUID(),
            text : result.value[0],
            type : 'user'
        },{
            id : UUID(),
            text : bot.text,
            type : 'bot'
        })

        home.previous = bot.previous
        home.next = bot.next

        if(bot.next == 'registration-name-done'){
            home.profile.name = result.value[0]
        }

        if(bot.previous == 'registration-gender'){
            home.profile.gender = bot.value
        }

        if(bot.previous == 'registration-age'){
            home.profile.age = bot.value
        }

        if(bot.previous == 'registration-blind'){
            home.profile.blind = bot.value

            if(bot.value){
                await saveData();
            }
        }

        setHome({...home});
        await TtsStart(bot.text);
    }

    function onSpeechEnd(){
        setSpeech(false);
    }

    function errorMessage(){
        const errorMessage = SatuNetra(null , home.next, true);
        home.chat.push({
            id : UUID(),
            text : errorMessage.text,
            type : 'bot'
        })

        TtsStart(errorMessage.text);
        setHome({...home});
    }

    function onSpeechError(){
        setSpeech(false);
        errorMessage();
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
                        contentContainerStyle={{paddingTop : PADDING}} 
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
        <Pressable 
            style={{ flex:1,backgroundColor:'#fff'}} 
            onPress={() => speak ? false : speechStart()}
        >
            { screen() }
        </Pressable>
    )
}

export default Home;