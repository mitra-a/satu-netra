import React from 'react';
import Video from 'react-native-video';

const DATA = {
    'insomnia-nature' : [
        'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
        'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3',
        'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3',
    ],
    'insomnia-slow' : [],
    'worry-music' : [],
    'worry-hipnoterapi' : [],
    'stress' : [],
};

class SatuNetraAudio extends React.Component{
    constructor() {
        super();

        this.index = 0;
        this.count = 0;
        this.key = '';
        this.state = { url : 'nothing' };
    }

    changeData(item){
        this.key = item
        console.log(item)
    }

    play(){
        this.count = DATA[this.key].length
        this.setState({ url : DATA[this.key][this.index]})
    }

    next(){
        if(this.index < this.count){
            this.index++
            this.setState({ url : DATA[this.key][this.index]})
        }
    }

    render(){
        return (
            <>
                <Video
                    autoplay={false}
                    source = {{uri : this.state.url}}
                    onEnd={() => this.next()}
                />
            </>
        )
    }
}

export default SatuNetraAudio;