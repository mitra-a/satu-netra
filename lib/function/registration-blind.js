import { BOT_SATUNETRA, UUID } from "../constanta";

export const RegistrationBlind = (props) => {
    props.home.chat.push({
        id : UUID(),
        text : BOT_SATUNETRA['registration-blind'],
        type : 'bot'
    })

    props.home.callback = 'registration-blind';

    props.setHome({...props.home});
}

export const setBlind = (props,value) => {
    const TRUE = ['FULL', 'SETENGAH', 'SEMUA'];
    value.replace('-','');

    TRUE.forEach(element => {
        if(value.toUpperCase() == element){
            props.home.chat.push({
                id : UUID(),
                text : 'Selamat anda telah selesai registrasi',
                type : 'bot'
            })

            props.setHome({...props.home});
        } 
    });

    return RegistrationBlind(props);
}