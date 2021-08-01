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
        this.state = { 
            url : 'nothing',
            pause: false 
        };
    }

    changeData(item){
        this.key = item
        console.log(item)
    }

    play(){
        this.count = DATA[this.key].length
        this.setState({ url : DATA[this.key][this.index]})
    }

    pause(){
        this.setState({ pause : !this.state.pause})
    }

    close(){
        this.setState({ pause : true})
    }

    isDone(){
        this.index++;

        if(this.index < this.count){
            return true;
        }else{
            this.props.done();
            return false;
        }
    }

    next(){
        this.setState({ url : DATA[this.key][this.index]})
    }

    render(){
        return (
            <>
                <Video
                    paused={this.state.pause}
                    autoplay={false}
                    source = {{uri : this.state.url}}
                    onEnd={() => this.next()}
                />
            </>
        )
    }
}

export default SatuNetraAudio;