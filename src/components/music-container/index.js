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
        'forename': 'Не знаю',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805331139.mp3'
    },
    {
        'id': 5,
        'forename': 'Тоже что-то',
        'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805292193.mp3'
    },
    {
        'id': 6,
        'forename': 'Лошадь',
        'audio': 'https://www.w3schools.com/html/horse.mp3'
    }
];

// https://www.w3schools.com/html/horse.mp3

export default class MusicContainer extends Component {
    constructor(props) {
        super(props);
        this.state = (
            {
                inactive : false, // Кнопки выключены у компонентов
                id: null,
                audio : null, // SRC песни

                loop : false
            }
        );
        this.toggle = this.toggle.bind(this);

        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.ended = this.ended.bind(this);
        this.repeat = this.repeat.bind(this);
        this.close = this.close.bind(this);

        // Наша дорожка
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
    left = (id) => {
        const next = id - 1;
        // Всего песен
        const lenght = api.length;
        if (next === 0) {
            console.log('Назад больше нельзя');
            return false;
        }

        if (next > 0 ) {
            console.log('Включина песня', id - 1);
            this.audios[id].setAttribute('class', 'music-button-play');
            this.setState(
                {
                    id: next,
                    audio: api[next-1].audio,
                    inactive : true
                }
            );
            this.audios[next].setAttribute('class', 'music-button-pause');
        }
    };
    right = (id) => {
        const next = id + 1;

        // Всего песен
        const lenght = api.length;
        if (next > lenght) {
            console.log('В перед больше нельзя');
            this.audios[id].setAttribute('class', 'music-button-play');
            this.setState(
                {
                    id: null,
                    audio: null,
                    inactive : false
                }
            );
            return false;
        }

        if (next <= lenght) {
            console.log('Включина песня', id + 1);
            this.audios[id].setAttribute('class', 'music-button-play');
            this.setState(
                {
                    id: next,
                    audio: api[next-1].audio,
                    inactive : true
                }
            );
            // this.audio.play();
            this.audios[next].setAttribute('class', 'music-button-pause');
        }
    };
    ended = () => {
        const id = this.state.id;
        console.log('Песня ' + id + ' завершилась');
        const lenght = api.length;
        if (id <= lenght) {
            this.right(id);
        }
    };
    repeat = () => {
        // console.log('repeat');
        if (this.state.loop === false) {
            console.log('Повтор включен');
            this.audio.loop = true;
            this.setState(
                {
                    loop : true
                }
            );
        }

        if (this.state.loop === true) {
            this.audio.loop = false;
            console.log('Повтор выключен');
            this.setState(
                {
                    loop : false
                }
            );
        }
    };
    close = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audios[this.state.id].setAttribute('class', 'music-button-play');
        this.setState(
            {
                id : null,
                audio : null,
                inactive : false,
                loop: false
            }
        );
    };
    render() {
        return (
            <div className='music-container'>
                <audio
                    src={this.state.audio}
                    ref={(ref) => {this.audio = ref}}
                    // controls
                    autoPlay
                    onEnded={this.ended}
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
                <div className='walk-container'>
                    <div className="walk">
                        <About/>
                        <Timeline/>
                        <Control
                            id = {this.state.id}
                            inactive = {this.state.inactive}
                            on = {this.on}
                            off = {this.off}
                            left={this.left}
                            right={this.right}
                            loop = {this.state.loop}
                            repeat = {this.repeat}
                            close = {this.close}
                        />
                    </div>
                </div>
            </div>
        );
    }

}