import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Audio from '../audio/index.js';
import '../audio/index.css';
import Control from '../control/index.js';
import '../control/index.css';
import About from "../about/index";
import '../about/index.css';
import Timeline from "../timeline/index";
import '../timeline/index.css';
import './index.css';

const api = [
    {
        'id': 1,
        'forename': 'Лучший Друг',
        'audio': 'https://goo.gl/ZY8eso'
    },
    {
        'id': 2,
        'forename': 'Я склоняюсь',
        'audio': 'https://goo.gl/SKhRoi'
    },
    {
        'id': 3,
        'forename': 'Семья',
        'audio': 'https://goo.gl/DRKbYh'
    }
];

export default class MusicContainer extends Component {
    constructor(props) {
        super(props);
        this.state = (
            {
                inactive : false, // Кнопки выключены у компонентов
                id: null,
                audio : null // SRC песни
            }
        );
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.toggle = this.toggle.bind(this);

        // Для управления аудио
        this.audio = this.refs.audio;

        // Reds
        this.audios = [];
    }
    toggle = (id) => {
        // console.log('toggle', id);

        if(this.audio.paused === false && this.state.id !== null && this.state.id === id) {
            this.audios[id].setAttribute('class', 'music-button-play');
            this.setState(
                {
                    inactive : false
                }
            );
            this.audio.pause();
        }

        if (this.audio.paused === true && this.state.inactive === false) {
            this.audios[id].setAttribute('class', 'music-button-pause');
            this.setState(
                {
                    inactive : true
                }
            );
            // this.audio.play();
        }

        if (!this.state.inactive) {
            console.log('api', api);
            this.setState(
                {
                    id: id,
                    audio: api[id-1].audio,
                    inactive : true
                }
            );
            // this.audio.play();
        }

        if (this.state.id === null) {
            this.audios[id].setAttribute('class', 'music-button-pause');
            this.setState(
                {
                    id: id,
                    audio: api[id-1].audio,
                    inactive : true
                }
            );
            // this.audio.play();
        }

        if(this.state.id !== id && this.state.id !== null) {
            this.audios[this.state.id].setAttribute('class', 'music-button-play');
            this.audio.pause();
            this.setState(
                {
                    id: id,
                    audio: api[id-1].audio,
                    inactive : true
                }
            );
            this.audios[id].setAttribute('class', 'music-button-pause');
            // this.audio.play();
        }
    };
    on = (id) => {
        console.log('on', id);
        this.audios[id].setAttribute('class', 'music-button-pause');
        this.setState(
            {
                inactive : !this.state.inactive
            }
        );
        this.audio.play();
    };
    off = (id) => {
        console.log('off', id);
        this.audios[id].setAttribute('class', 'music-button-play');
        this.setState(
            {
                inactive : !this.state.inactive
            }
        );
        this.audio.pause();
    };
    componentDidMount() {
        // console.log(api[1].audio);
    }
    render() {
        return (
            <div className='music-container'>
                <audio
                    src={this.state.audio}
                    ref={(ref) => {this.audio = ref}}
                    // controls
                    autoPlay
                />
                <div className='roll'>
                    {
                        api.map((road)=>{
                            return(
                                <Audio
                                    key = {road.id}
                                    id = {road.id}
                                    inactive = {this.state.inactive}
                                    on = {this.on}
                                    off = {this.off}
                                    reference={(ref) => this.audios[road.id] = ref}
                                    toggle = {this.toggle}
                                />
                            );
                        })
                    }
                </div>
                {/*<br/>*/}
                {/*<p><b>{this.state.inactive ? 'Включина песня - ' + this.state.id: 'Выключина - ' + this.state.id}</b></p>*/}
                <div className='walk-container'>
                    <div className="walk">
                        <About/>
                        <Timeline/>
                        <Control
                            id = {this.state.id}
                            inactive = {this.state.inactive}
                            on = {this.on}
                            off = {this.off}
                        />
                    </div>
                </div>
            </div>
        );
    }

}