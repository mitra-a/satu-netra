import React,{useEffect, useReducer, useRef, useState} from 'react';
import { FlatList, Modal, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navbar, ChatBox, ChatPop, BottomPopUp, SatuNetraAudio } from '../components/Index';
import Voice from '@react-native-voice/voice';
import { PADDING, UUID } from '../constanta/Index';
import { SatuNetra } from '../function/SatuNetra';
import Tts from 'react-native-tts';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';
import ModalHistory from '../components/ModalHistory';

const initialState = {
    music : false,
    exit : false,
    mode : 'VOICE',
    partial : '',
    number : null,
    feedback : false,
    firstPlay : false,
    callback : false,
}

function reducer(state,action){
    switch (action.type) {
        case 'UPDATE':
            return action.data
    }
}

const Home = ({ route, navigation }) => {
    let selected = null;
    let touchX = null;
    let reducerCallback = initialState;
    let swipe = false;

    const [state,dispatch] = useReducer(reducer,initialState);

    const SNPlayer = useRef();
    const { profile } = route.params;
    const [speech , setSpeech] = useState(false);
    const [speak , setSpeak] = useState(false);
    const [history , setHistory] = useState(false);
    const listView = useRef();
    const doubleTapRef = useRef();

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
            const bot = SatuNetra('welcome' , 'welcome');

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
        if(reducerCallback.callback){
            reducerCallback = {...state}
            reducerCallback.callback = false;
        }
    },[state])

    useEffect(() => {
        if(reducerCallback.callback){         
            // @ts-ignore
            dispatch({type:'UPDATE',data : reducerCallback});
        }

        if(home.next == 'registration-name'){
            const bot = SatuNetra('welcome' , home.next);
           
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

        if(!state.exit){
            setTimeout(() => {
                // @ts-ignore
                listView.current.scrollToEnd();
            },800)
        }
    },[home])

    async function TtsStart(text){
        await Tts.speak(text);
    }

    function onTtsFinish(){
        if(state.firstPlay){
            // @ts-ignore
            SNPlayer.current.play();
        }

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
        
        if(state.feedback){
            //SIMPAN FEEDBACK
            
            let newData = {...state}
            let textExit = 'Terima kasih telah memberikan pendapat anda tentang aplikasi SatuNetra, Aplikasi akan menutup setelah suara ini berakhir';
            TtsStart(textExit);

            newData.exit = true;

            // @ts-ignore
            dispatch({type:'UPDATE',data : newData});
            return closeApp();
        }

        if(result.value[0] !== null || result.value[0] !== ''){
            
            //KALAU BUKA HISTORY
            let HISTORY = [
                'lihat riwayat',
                'buka riwayat',
                'buka history',
                'lihat history',
                'buka histori',
                'lihat histori'
            ];
            let historyCheck = false;

            HISTORY.forEach((item) => {    
                if(result.value[0].search(item) >= 0){
                    historyCheck = true;
                }
            })

            if(historyCheck){
                setHistory(true);
                return false;
            }


            //LANJUT
            const bot = SatuNetra(result.value[0] , home.next);

            if(bot.next == 'feedback'){
                reducerCallback.feedback = true;
            }

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
                reducerCallback.music = true;

                if((bot.selectedMusic).search('music') >= 0){
                    reducerCallback.mode = 'MUSIC';
                }else{
                    reducerCallback.mode = 'HIPNOTERAPI';
                }

                // @ts-ignore
                SNPlayer.current.changeData(selected+'-'+bot.selectedMusic);
                // @ts-ignore
                reducerCallback.number = SNPlayer.current.getIndex();
                reducerCallback.firstPlay = true;
            }

            reducerCallback.callback = true;
            setHome({...home});
        } 
    }

    function onSpeechPartialResults(partial){
        let newData = {...state}
        newData.partial = partial.value[0];

        // @ts-ignore
        dispatch({type:'UPDATE',data : newData});
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
                if(state.music){
                    doneApp();
                }
            }
        }

        swipe = false;
    }
    
    function singelTap(event){
        if(!swipe && !speak){
            if (event.nativeEvent.state === State.ACTIVE) {
                if(state.music){
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

            if(state.music){
                let newData = {...state}
                // @ts-ignore
                if(SNPlayer.current.isDone()){
                    const textNext = 'Berpindah kesesi selanjutnya';
    
                    // @ts-ignore
                    newData.number = SNPlayer.current.getIndex();


                    // @ts-ignore
                    dispatch({type:'UPDATE',data : newData});
                    TtsStart(textNext);
                }
            }
        }
    }

    function doneApp(){
         // @ts-ignore
         SNPlayer.current.close(function(){
             const bot = SatuNetra('welcome' , 'feedback');
    
             home.chat.push({
                 id : UUID(),
                 text : bot.text,
                 type : 'bot'
             })
    
             reducerCallback.feedback = true;
             reducerCallback.music = false;
             reducerCallback.number = false;
             reducerCallback.mode = 'VOICE';
             reducerCallback.firstPlay = false;

            Voice.onSpeechResults = onSpeechResult

             TtsStart(bot.text);
             setHome({...home});
         });
    }
    
    function screen(){
        return (
            <>
                <Navbar />

                <SatuNetraAudio
                    ref={SNPlayer}
                    done={() => doneApp}
                />

                <ChatBox>
                    <FlatList
                        scrollEnabled={false}
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

                <BottomPopUp
                    speech={speech}
                    partial={state.partial}
                    type={state.mode}
                    number={state.number}
                />
            </>
        )
    }

    function closeModal(){
        setHistory(false);
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

            { history && (
                <ModalHistory close={() => closeModal()} />
            )}
        </>
    )
}

export default Home;