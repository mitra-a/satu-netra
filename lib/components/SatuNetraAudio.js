import React from 'react';
import Video from 'react-native-video';

const DATA = {
    'worry-hipnoterapi' : [
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AAANo-mR176PH7DK7uu5ZTbna/hipnoterapi/anxiety/anxiety%20utama.mp3?dl=1', //UTAMA
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADMNh-dvs2vMJGwZs8bVTrHa/hipnoterapi/anxiety/0.mp3?dl=1', //0
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADAckUeY8aT3sZNfoWgq7C_a/hipnoterapi/anxiety/1.mp3?dl=1', //1
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AABPRk-MH4gUe2YUjWCHBrNEa/hipnoterapi/anxiety/2.mp3?dl=1', //2
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AABqZDPkaeZ9ek_baXKf6wg5a/hipnoterapi/anxiety/3.mp3?dl=1', //3
    ],
    'stress-hipnoterapi' : [
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AABkFR01u0Cb0hn8wtkqk1tsa/hipnoterapi/stress/stress%20utama.mp3?dl=1', //UTAMA
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADZO3EliRsotGvJLDxGZIEza/hipnoterapi/stress/0.mp3?dl=1', //0
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADQf31XR_GG3eezicVayp8ga/hipnoterapi/stress/1.mp3?dl=1', //1
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADr47SDZkfNoSAI8_wD_D9ta/hipnoterapi/stress/2.mp3?dl=1', //2
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AABnQR5TJE-_hehNYZNiRcWLa/hipnoterapi/stress/3.mp3?dl=1', //3
    ],
    'worry-music' : [
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AACmOJzRPHRfvRnao6b_fsAIa/musik/anxiety/1.mp3?dl=0',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AABSxfD4DH-u0jGiJmUWtW5Ra/musik/anxiety/2.mp3?dl=0',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADiqv62muo9mG_S1pmuFZe0a/musik/anxiety/3.mp3?dl=0',
    ],
    'insomnia-music-nature' : [
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AAC-mvympMkVGNAsVuREMlZ1a/musik/insomnia/musik%20suara%20alam/1.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AACduZxGOkKhH88TppuZ8AUUa/musik/insomnia/musik%20suara%20alam/2.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AAAsT-lwaIlt7m3D19USaePHa/musik/insomnia/musik%20suara%20alam/3.mp3?dl=1'
    ],
    'insomnia-music-lofi' : [
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AACXdSbZTKkoBBipRgQoy5Jea/musik/insomnia/tempo%20lambat/1.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AABusDkDvWCGaVnhHNsCM_Vfa/musik/insomnia/tempo%20lambat/2.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AAB7_m-Xj6RaOGH2OCWZHRKGa/musik/insomnia/tempo%20lambat/3.mp3?dl=1'
    ],
    'stress-music' : [
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AACC7yW2gG86y0T0B3NB_NcWa/musik/strss/1.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AAAkJSP8IFH6phLfX7-elzhIa/musik/strss/2.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AADgIQKkiGIqzEtC4PZXhacGa/musik/strss/3.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AAB6qEGRaCKQJZVnnJyZHjg-a/musik/strss/4.mp3?dl=1',
        'https://www.dropbox.com/sh/gsqz4v5hha0s4kk/AACGVs1dL0iVasMQZjKFO4uMa/musik/strss/5.mp3?dl=1',
    ],
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

    getIndex(){
        return this.index + 1;
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