import { SetAge } from "./registration-age";
import { setBlind } from "./registration-blind";
import { SetGender } from "./registration-gender";
import { CekRegistrationName, SetName } from "./registration-name";

export const MASTER = (props , value) => {
    if(props.home.callback == 'registration-name'){
        return SetName(props,value);
    }
    
    if(props.home.callback == 'registration-name-acc'){
        return CekRegistrationName(props,value);
    }
    
    if(props.home.callback == 'registration-age'){
        return SetAge(props,value);
    }
    
    if(props.home.callback == 'registration-gender'){
        return SetGender(props,value);
    }

    if(props.home.callback == 'registration-blind'){
        return setBlind(props,value);
    }
}