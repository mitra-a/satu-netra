import React,{useEffect, useRef, useState} from 'react';
import { FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navbar, ChatBox, ChatPop, BottomPopUp, SatuNetraAudio } from '../components/Index';
import Voice from '@react-native-voice/voice';
import { PADDING, UUID } from '../constanta/Index';
import { SatuNetra } from '../function/SatuNetra';
import Tts from 'react-native-tts';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';

const Home = ({ route, navigation }) => {
    let selected = null;
    let touchX = null;
    let swipe = false;

    const SNPlayer = useRef();
    const { profile } = route.params;
    const [speech , setSpeech] = useState(false);
    const [speak , setSpeak] = useState(false); 
    const listView = useRef();
    const doubleTapRef = useRef();

    const [home , setHome] = useState({
        callback : null,
        chat : [],
        previous : null,
        next : null,
        music : false,
        exit : false,
        mode : 'VOICE',
        partial : '',
        number : null,
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
        Voice.onSpeechPartialResults = onSpeechPartialResults 
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

        if(!home.exit){
            setTimeout(() => {
                // @ts-ignore
                listView.current.scrollToEnd();
            },800)
        }else{
            return closeApp();
        }
    },[home])

    async function TtsStart(text){
        await Tts.speak(text);
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
        if(result.value[0] !== null || result.value[0] !== ''){
            const bot = SatuNetra(result.value[0] , home.next);

            if(bot == false){
                return false
            }

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

            if(bot.selected !== undefined){
                selected = bot.selected;
            }

            await TtsStart(bot.text);
            
            if(bot.selectedMusic !== undefined){
                home.music = true;

                if((bot.selectedMusic).search('music') >= 0){
                    home.mode = 'MUSIC';
                }else{
                    home.mode = 'HIPNOTERAPI';
                }

                // @ts-ignore
                SNPlayer.current.changeData(selected+'-'+bot.selectedMusic);
                // @ts-ignore
                home.number = SNPlayer.current.getIndex();
                // @ts-ignore
                SNPlayer.current.play();
            }

            setHome({...home});
        } 
    }

    function onSpeechPartialResults(value){
        console.log(value);
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

    function closeApp(){
        navigation.replace('Splashscreen',{
            data : true
        })
    }

    async function doubleTap(event){
        if(!swipe && !speak){
            if (event.nativeEvent.state === State.ACTIVE) {
                if(home.music){
                    doneApp();
                }
            }
        }

        swipe = false;
    }
    
    function singelTap(event){
        if(!swipe && !speak){
            if (event.nativeEvent.state === State.ACTIVE) {
                if(home.music){
                    // @ts-ignore
                    SNPlayer.current.pause();
                }else{
                    speechStart();
                }
            }
        }

        swipe = false;
    }

    function swipeRight(){
        if(!speak){
            swipe = true;

            if(home.music){
                // @ts-ignore
                if(SNPlayer.current.isDone()){
                    // @ts-ignore
                    SNPlayer.current.next();
                    const textNext = 'Berpindah kesesi selanjutnya';
    
                    // @ts-ignore
                    home.number = SNPlayer.current.getIndex();
                    setHome({...home});
                    
                    TtsStart(textNext);
                }
            }
        }
    }

    function doneApp(){
        // @ts-ignore
        SNPlayer.current.close();
        const textExit = 'Terima kasih telah menggunakan SatuNetra';

        home.chat.push({
            id : UUID(),
            text : textExit,
            type : 'bot'
        })

        home.exit = true;

        setHome({...home});
        TtsStart(textExit);
    }
    
    function screen(){
        return (
            <>
                <Navbar />

                <SatuNetraAudio
                    ref={SNPlayer}
                    done={() => doneApp()}
                />

                <ChatBox>
                    <FlatList
                        scrollEnabled={false}
                        ref={listView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingTop : PADDING}} 
                        data={home.chat}
                        keyExtractor={(item) => item.id}
                        // @ts-ignore
                        renderItem = {({item,index}) => (
                            <ChatPop 
                                type={item.type} 
                                text={item.text}
                                key={item.id}   
                            />
                        )}
                     />
                </ChatBox>

                <BottomPopUp
                    speech={speech}
                    partial={home.partial}
                    type={home.mode}
                    number={home.number}
                />
            </>
        )
    }

    return (
        <>
            <GestureHandlerRootView style={{flex:1,backgroundColor:'#fff'}}>
                <TapGestureHandler 
                    onHandlerStateChange={singelTap}
                    waitFor={doubleTapRef}
                >
                    <TapGestureHandler 
                        ref={doubleTapRef}
                        onHandlerStateChange={doubleTap}
                        numberOfTaps={2}
                    >
                        <View 
                            onTouchStart={e=> touchX = e.nativeEvent.pageX}
                            onTouchEnd={e => {
                                if(touchX - e.nativeEvent.pageX < -50){
                                    swipeRight()
                                }
                            }}
                            style={{flex:1}}
                        >
                            { screen() }
                        </View>
                    </TapGestureHandler >
                </TapGestureHandler >
            </GestureHandlerRootView>
        </>
    )
}

export default Home;