import AsyncStorage from "@react-native-async-storage/async-storage";

export const History = async (value,key) => {

    async function getData(){
        try {
            const jsonValue = await AsyncStorage.getItem('@history')
            return JSON.parse(jsonValue);
        } catch(e) {

        }
    }

    async function addData(value){
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@history', jsonValue)
        } catch (e) {
        }
    }

    if(key == 'GET'){
        return await getData();
    }

    if(key == 'ADD'){
        let oldValue = await getData();
        
        if(oldValue == null){
            let newData = [];
            newData?.push(value);
            addData(newData);
        }else{
            console.log('data lama');
            oldValue?.push(value);
            addData(oldValue);
        }
    }
}