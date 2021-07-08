import { BOT_SATUNETRA, UUID } from "../constanta";
import { RegistrationBlind } from "./registration-blind";

export const RegistrationGender = (props) => {
    props.home.chat.push({
        id : UUID(),
        text : BOT_SATUNETRA['registration-gender'],
        type : 'bot'
    })

    props.home.callback = 'registration-gender';
    props.setHome({...props.home});

    console.log(props.home.callback);
}

export const SetGender = (props,value) => {
    const TRUE = ['LAKI LAKI', 'PEREMPUAN', 'WANITA', 'CEWEK', 'COWOK'];
    value.replace('-',' ');
    
    TRUE.forEach(element => {
        if(value.toUpperCase() == element){
            setTimeout(() => {
                props.home.profile.gender = value;
                props.setHome({...props.home});
                return RegistrationBlind(props);
            },600)
        } 
    });

    return RegistrationGender(props);
}