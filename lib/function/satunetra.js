import satunetra from '../../satunetra.json'

export const SatuNetra = (value , key, stop = false) => {
    const TRUE = ['iya','benar','betul','ya'];
    const FALSE = ['tidak','salah','tidak mau','bukan'];
    const GENDER_MALE = ['laki-laki','cowok','laki','pria'];
    const GENDER_FEMALE = ['perempuan','cewek','wanita'];
    const BLIND = ['setengah','semua'];

    const INSOMNIA = ['insomnia','susah tidur'];
    const WORRIED = ['khawatir','cemas'];
    const STRESS = ['stres','capek','pegal'];

    function callApp(){
        let functionName = '';
        let array = key.split('-');
        
        array.forEach(item => {
            functionName += item.charAt(0).toUpperCase() + item.slice(1);
        });

        return eval(functionName)();
    }

    return callApp();
    
    function check(next , yes){
        let checkYes = false;
        let checkNo = false;

        //YES
        TRUE.forEach((item) => {
            if(value.search(item) >= 0){
                checkYes = true;
            }
        })

        if(checkYes){
            return {
                text : satunetra[yes],
                next : next,
                previous : key,
            }
        }

        //NO
        FALSE.forEach((item) => {
            if(value.search(item) >= 0){
                checkNo = true;
            }
        })

        if(checkNo){
            return {
                text : satunetra['false'],
                next : 'start-bot-search',
                previous : key,
            }
        }

        return {
            text : satunetra['wrong-key'],
            next : key,
            previous : key
        }
    }

    function Stop(){
        return {
            text : satunetra['stop-message'],
            next : key,
            previous : key
        }
    }

    function Welcome(){
        return {
            text : satunetra['welcome-message'],
            next : 'registration-name',
            previous : key
        }
    }

    function WelcomeName(){
        return {
            text : satunetra['welcome-message-name'].replace('*',value),
            next : 'start-bot-search',
            previous : key
        }
    }

    function RegistrationName(){
        return {
            text : satunetra['registration-name'],
            next : 'registration-name-accept',
            previous : key
        }
    }

    function RegistrationNameAccept(){
        return {
            text : satunetra['registration-name-accept'].replace('*',value),
            next : 'registration-name-done',
            previous : key,
            value : value
        }
    }

    function RegistrationNameDone(){
        let check = false;
        TRUE.forEach((item) => {
            if(value.toLowerCase() == item){
                check = true;
            }
        })

        if(check){
            return {
                text : satunetra['registration-gender'],
                next : 'registration-gender',
                previous : key,
                value : true,
            }
        }else{
            return {
                text : satunetra['registration-name'],
                next : 'registration-name-accept',
                previous : key,
                value : false,
            }
        }

    }

    function RegistrationGender(){
        let check = null;

        GENDER_MALE.forEach((item) => {
            if(value.toLowerCase() == item){
                check = 'male';
            }
        })

        GENDER_FEMALE.forEach((item) => {
            if(value.toLowerCase() == item){
                check = 'female';
            }
        })
        
        if(check == 'male'){
            return {
                text : satunetra['registration-age'],
                next : 'registration-age',
                previous : key,
                value : 'Laki Laki',
            }
        }else if(check == 'female'){
            return {
                text : satunetra['registration-age'],
                next : 'registration-age',
                previous : key,
                value : 'Perempuan',
            }
        }else{
            return {
                text : satunetra['registration-gender'],
                next : 'registration-gender',
                previous : key,
                value : true,
            }
        }
    }

    function RegistrationAge(){
        let check = null
        let data = value.split(' ')

        data.forEach(item => {
            if(parseInt(item) > 0){
                check = parseInt(item);
            }
        });

        if(check){
            return {
                text : satunetra['registration-blind'],
                next : 'registration-blind',
                previous : key,
                value : check,
            }
        }

        return {
            text : satunetra['registration-age'],
            next : 'registration-age',
            previous : key,
            value : false,
        }

    }

    function RegistrationBlind(){
        let check = false;
        BLIND.forEach((item) => {
            if(value.toLowerCase() == item){
                check = true;
            }
        })

        if(check){
            return {
                text : satunetra['start-bot'],
                next : 'start-bot-search',
                previous : key,
                value : value,
            }
        }else{
            return {
                text : satunetra['registration-blind'],
                next : 'registration-blind',
                previous : key,
                value : null,
            }
        }
    }

    function StartBot(){
        return {
            text : satunetra['start-bot'],
            next : 'start-bot-search',
            previous : key,
        }
    }

    function StartBotSelectHipnoterapi(){
        let SELECT = ['hipnoterapi','musik'];
        let selectCheck = false;

        SELECT.forEach((item) => {
            if(value.search(item) >= 0){
                selectCheck = true;
            }
        })

        if(selectCheck){
            return {
                text : satunetra['music-success'].replace('*',value),
                next : 'close',
                previous : key,
                value : value == 'hipnoterapi' ? 'music-hipnoterapi' : 'music'
            }
        }

        return {
            text : satunetra['music-hipnoterapi-fail'],
            next : key,
            previous : key
        }
    }

    function StartBotSelectNature(){
        let SELECTTEMPO = ['tempo','lambah'];
        let SELECTALAM = ['alam'];
        let tempoCheck = false;
        let alamCheck = false;

        SELECTTEMPO.forEach((item) => {
            if(value.search(item) >= 0){
                tempoCheck = true;
            }
        })

        if(tempoCheck){
            return {
                text : satunetra['music-success'].replace('*',value),
                next : 'close',
                previous : key,
                value : 'music-slow'
            }
        }

        SELECTALAM.forEach((item) => {
            if(value.search(item) >= 0){
                alamCheck = true;
            }
        })

        if(alamCheck){
            return {
                text : satunetra['music-success'].replace('*',value),
                next : 'close',
                previous : key,
                value : 'music-nature'
            }
        }

        return {
            text : satunetra['music-nature-fail'],
            next : key,
            previous : key
        }
    }

    function StartBotWorried(){
        return check('start-bot-select-hipnoterapi','music-hipnoterapi');
    }
    
    function StartBotStress(){
        return check('start-bot-select-hipnoterapi','music-hipnoterapi');
    }
    
    function StartBotInsomnia(){
        return check('start-bot-select-nature','music-nature');
    }

    function StartBotSearch(){
        let data = value.toLowerCase();

        let checkStress = false;
        let checkInsomnia = false;
        let checkWorried = false;

        //STRESS
        STRESS.forEach((item) => {
            if(data.search(item) >= 0){
                checkStress = true;
            }
        })

        if(checkStress){
            return {
                text : satunetra['stress'],
                next : 'start-bot-stress',
                previous : key,
            }
        }

        //INSOMNIA
        INSOMNIA.forEach((item) => {
            if(data.search(item) >= 0){
                checkInsomnia = true;
            }
        })

        if(checkInsomnia){
            return {
                text : satunetra['insomnia'],
                next : 'start-bot-insomnia',
                previous : key,
            }
        }

        //WORRIED
        WORRIED.forEach((item) => {
            if(data.search(item) >= 0){
                checkWorried = true;
            }
        })

        if(checkWorried){
            return {
                text : satunetra['worried'],
                next : 'start-bot-worried',
                previous : key,
            }
        }

        return {
            text : satunetra['not-found'],
            next : 'start-bot-search',
            previous : key,
        }
    }
}