import satunetra from '../../satunetra.json'

export const SatuNetra = (value , key, stop = false) => {
    const TRUE = ['iya','benar','betul','ya'];
    const FALSE = ['tidak','salah','tidak mau','bukan'];
    const GENDER_MALE = ['laki-laki','cowok','laki','pria'];
    const GENDER_FEMALE = ['perempuan','cewek','wanita'];
    const BLIND_TOTAL = ['total','semua'];
    const BLIND_HALF = ['penglihatana lemah','lemah','setengah'];

    const INSOMNIA = ['insomnia','susah tidur'];
    const WORRIED = ['khawatir','cemas'];
    const STRESS = ['stres','capek','pegal'];
    
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
    
    const fn = {
        'Stop' : function(){
            return {
                text : satunetra['stop-message'],
                next : key,
                previous : key
            }
        },
    
        'Welcome' : function(){
            return {
                text : satunetra['welcome-message'],
                next : 'registration-name',
                previous : key
            }
        },
    
        'WelcomeName' : function(){
            return {
                text : satunetra['welcome-message-name'].replace('*',value),
                next : 'start-bot-search',
                previous : key
            }
        },
    
        'RegistrationName' : function(){
            return {
                text : satunetra['registration-name'],
                next : 'registration-name-accept',
                previous : key
            }
        },
    
        'RegistrationNameAccept' : function(){
            return {
                text : satunetra['registration-name-accept'].replace('*',value),
                next : 'registration-name-done',
                previous : key,
                value : value
            }
        },
    
        'RegistrationNameDone' : function(){
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
    
        },
    
        'RegistrationGender' : function(){
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
        },
    
        'RegistrationAge' : function(){
            if(value == null){
                return fn['Stop'].call()
            }
            
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
    
        },
    
        'RegistrationBlind' : function(){
            let check = false;

            BLIND_HALF.forEach((item) => {    
                if(value.search(item) >= 0){
                    check = true;
                }
            })

            if(check){
                return {
                    text : satunetra['start-bot'],
                    next : 'start-bot-search',
                    previous : key,
                    value : 'Penglihatan Lemah',
                }
            }

            BLIND_TOTAL.forEach((item) => {
                if(value.search(item) >= 0){
                    check = true;
                }
            })
    
            if(check){
                return {
                    text : satunetra['start-bot'],
                    next : 'start-bot-search',
                    previous : key,
                    value : 'Buta Total',
                }
            }

            return {
                text : satunetra['registration-blind'],
                next : 'registration-blind',
                previous : key,
                value : null,
            }
        },
    
        'StartBot' : function(){
            return {
                text : satunetra['start-bot'],
                next : 'start-bot-search',
                previous : key,
            }
        },
    
        'StartBotSelectHipnoterapi' : function(){
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
                    selectedMusic : value == 'hipnoterapi' ? 'hipnoterapi' : 'music'
                }
            }
    
            return {
                text : satunetra['music-hipnoterapi-fail'],
                next : key,
                previous : key
            }
        },
    
        'StartBotSelectNature' : function(){
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
                    selectedMusic : 'slow'
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
                    selectedMusic : 'nature'
                }
            }
    
            return {
                text : satunetra['music-nature-fail'],
                next : key,
                previous : key
            }
        },

        'Close' : function(){
            return false;
        },
    
        'StartBotWorried' : function(){
            return check('start-bot-select-hipnoterapi','music-hipnoterapi');
        },

        'StartBotStress' : function(){
            return check('start-bot-select-hipnoterapi','music-hipnoterapi');
        },
             
        'StartBotInsomnia' : function(){
            return check('start-bot-select-nature','music-nature');
        },
    
        'StartBotSearch' : function(){
            if(value == null){
                return fn['Stop'].call()
            }

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
                    selected : 'stress'
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
                    selected : 'insomnia'
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
                    selected : 'worry'
                }
            }
    
            return {
                text : satunetra['not-found'],
                next : 'start-bot-search',
                previous : key,
            }
        }
    }

    function callApp(){
        let functionName = '';
        let array = key.split('-');
        
        array.forEach(item => {
            functionName += item.charAt(0).toUpperCase() + item.slice(1);
        });

        if(value === null || value == ''){
            return fn['Stop'].call();
        }

        return fn[functionName].call();
    }

    return callApp();
}