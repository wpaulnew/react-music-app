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
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016031822245518.mp3'
    },
    {
        'id': 2,
        'forename': 'Я склоняюсь',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040804041935.mp3'
    },
    {
        'id': 3,
        'forename': 'Семья',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805060492.mp3'
    },
    {
        'id': 4,
        'forename': 'Не плачь',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805060492.mp3'
    },
    {
        'id': 5,
        'forename': 'Иерусалим',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805331139.mp3'
    },
    {
        'id': 6,
        'forename': 'Измени меня',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805292193.mp3'
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
        // 1 Не играет и не выбрана
        if (this.state.id === null) {
            // console.log('Не играет и не выбрана');
            this.audios[id].setAttribute('class', 'music-button-pause');
            this.setState(
                {
                    id: id,
                    audio: api[id-1].audio,
                    inactive : true
                }
            );
        }

        // 2 Играет и выбрана
        if(this.audio.paused === false && this.state.id !== null && this.state.inactive === true) {
            // console.log('Играет и выбрана');
            if (this.state.id === id) {
                // console.log('Номера песен равны');
                this.audios[id].setAttribute('class', 'music-button-play');
                this.setState(
                    {
                        inactive : false
                    }
                );
                this.audio.pause();
            }

            if (this.state.id !== id) {
                console.log('Номера песен не равны');
                this.audios[this.state.id].setAttribute('class', 'music-button-play');
                this.setState(
                    {
                        id: id,
                        audio: api[id-1].audio,
                        inactive : true
                    }
                );
                this.audios[id].setAttribute('class', 'music-button-pause');
                // this.audio.pause();
            }
        }

        // 3 Не играет но выбрана
        if(this.audio.paused === true && this.state.id !== null && this.state.inactive === false) {
            // console.log('Не играет но выбрана');
            if (this.state.id !== id) {
                // console.log('Номера песен не равны');
                this.audios[this.state.id].setAttribute('class', 'music-button-play');
                this.setState(
                    {
                        id: id,
                        audio: api[id-1].audio,
                        inactive : true
                    }
                );
                this.audios[this.state.id].setAttribute('class', 'music-button-play');
                this.audio.play();
            }
            this.audios[id].setAttribute('class', 'music-button-pause');
            this.setState(
                {
                    inactive : !this.state.inactive
                }
            );
            this.audio.play();
        }
    };
    on = (id) => {
        // console.log('on', id);
        this.audios[id].setAttribute('class', 'music-button-pause');
        this.setState(
            {
                inactive : !this.state.inactive
            }
        );
        this.audio.play();
    };
    off = (id) => {
        // console.log('off', id);
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
                                    forename = {road.forename}
                                />
                            );
                        })
                    }
                    <p className='roll-notification'>Подгружаю песни</p>
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