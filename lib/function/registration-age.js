import { BOT_SATUNETRA, UUID } from "../constanta";
import { RegistrationGender } from "./registration-gender";

export const RegistrationAge = (props) => {
    props.home.chat.push({
        id : UUID(),
        text : BOT_SATUNETRA['registration-age'],
        type : 'bot'
    })

    props.home.callback = 'registration-age';

    props.setHome({...props.home});
}

export const SetAge = (props,value) => {
    props.home.profile.age = value;
    props.setHome({...props.home});
    return RegistrationGender(props);
}