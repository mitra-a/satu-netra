import { Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const PADDING_HORIZONTAL = 20;
export const PADDING_VERTICAL = 20;
export const PADDING = 15;
export const BORDER_RADIUS = 10;

export const UUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}