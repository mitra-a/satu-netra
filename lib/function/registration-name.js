import { BOT_SATUNETRA, UUID } from "../constanta";
import { RegistrationGender } from "./registration-gender";

export const RegistrationName = (props, welcome = false) => {
    if(welcome){
        props.home.chat.push({
            id : UUID(),
            text : BOT_SATUNETRA['welcome-message'],
            type : 'bot'
        });
    }

    props.home.chat.push({
        id : UUID(),
        text : BOT_SATUNETRA['registration-name'],
        type : 'bot'
    })

    props.home.callback = 'registration-name';

    props.setHome({...props.home});
}

export const SetName = (props,value) => {
    setTimeout(() => {
        props.home.chat.push({
            id : UUID(),
            text : BOT_SATUNETRA['registration-name-acc'].replace('*',value),
            type : 'bot'
        })

        props.home.profile.name = value;

        props.home.callback = 'registration-name-acc';
        props.setHome({...props.home});
    },500)
}

export const CekRegistrationName = (props,value) => {
    const TRUE = ['YA', 'IYA', 'BETUL'];

    TRUE.forEach(element => {
        if(value.toUpperCase() == element){
            setTimeout(() => {
                return RegistrationGender(props);
            },600)
        } 
    });

    setTimeout(() => {
        return RegistrationName(props);
    },600)
}