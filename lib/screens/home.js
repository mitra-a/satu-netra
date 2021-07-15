import React,{useEffect, useRef, useState} from 'react';
import { Pressable, FlatList } from 'react-native';
import { Navbar, ChatBox, ChatPop, BottomPopUp } from '../components';
import Voice from '@react-native-voice/voice';
import { UUID } from '../constanta';
import { SatuNetra } from '../function/satunetra';

const Home = () => {
    const [speech , setSpeech] = useState(false); 
    const [partial , setPartial] = useState(''); 
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
        Voice.onSpeechResults = onSpeechResult
        Voice.onSpeechEnd = onSpeechEnd
        Voice.onSpeechError = onSpeechError
        Voice.onSpeechPartialResults = onSpeechPartialResults

        const bot = SatuNetra(null , 'welcome');

        home.chat.push({
            id : UUID(),
            text : bot.text,
            type : 'bot'
        })
        home.previous = bot.previous
        home.next = bot.next
        setHome({...home});
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
        }

        setTimeout(() => {
            // @ts-ignore
            listView.current.scrollToEnd();
        },800)
    },[home])
    
    function onSpeechPartialResults(result){
        setPartial(result.value[0]);
    }

    function onSpeechResult(result){   
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
        setHome({...home});
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
                    <BottomPopUp text={partial} />
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