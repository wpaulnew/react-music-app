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
import axios from 'axios';

// const api = [
//     {
//         'id': 1,
//         'forename': 'Лучший Друг',
//         'executor' : 'Они',
//         'audio': 'http://fonki.pro/plugin/sounds/uploads/2016031822245518.mp3'
//     },
//     {
//         'id': 2,
//         'forename': 'Я склоняюсь',
//         'executor' : 'Supernatural Worship',
//         'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040804041935.mp3'
//     },
//     {
//         'id': 3,
//         'forename': 'Семья',
//         'executor' : 'Спасение церковь г. Вишневое',
//         'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805060492.mp3'
//     },
//     {
//         'id': 4,
//         'forename': 'Не знаю',
//         'executor' : 'Ольга Вельгус',
//         'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805331139.mp3'
//     },
//     {
//         'id': 5,
//         'forename': 'Тоже что-то',
//         'executor' : 'Слово Жизни Youth',
//         'audio': 'http://fonki.pro/plugin/sounds/uploads/2016040805292193.mp3'
//     },
//     {
//         'id': 6,
//         'forename': 'Лошадь',
//         'executor' : 'Imprintband',
//         'audio': 'https://www.w3schools.com/html/horse.mp3'
//     }
// ];

// https://www.w3schools.com/html/horse.mp3

export default class MusicContainer extends Component {
    constructor(props) {
        super(props);
        this.state = (
            {
                inactive : false, // Кнопки выключены у компонентов
                id: null,
                audio : null, // SRC песни
                loop : false,
                time : 0,
                duration : 0,
                forename : null,
                executor : null,
                audios : []
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
        this.time = this.time.bind(this);
        this.timeline = this.timeline.bind(this);
        this.duration = this.duration.bind(this);

        // Наша дорожка
        this.audio = this.refs.audio;

        // Reds
        this.audios = [];
    }

    componentDidMount() {
        axios.get('http://192.168.0.89/')
        .then((audios) => {
            this.setState({
                audios : audios.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentWillReceiveProps(props) {
        if(this.state.inactive === true) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audios[this.state.id].setAttribute('class', 'music-button-play');
            this.setState(
                (prevState) => ({
                    inactive: false, // Кнопки выключены у компонентов
                    id: null,
                    audio: null, // SRC песни
                    loop: false,
                    time: 0,
                    duration: 0,
                    forename: null,
                    executor: null,
                    audios: prevState.audios = props.quest
                })
            );
        }
        if (this.state.inactive === false) {
            this.setState(
                (prevState) => ({
                    inactive: false, // Кнопки выключены у компонентов
                    id: null,
                    audio: null, // SRC песни
                    loop: false,
                    time: 0,
                    duration: 0,
                    forename: null,
                    executor: null,
                    audios: prevState.audios = props.quest
                })
            );
        }
    }

    quest = () => {
        console.log('Отображаю результаты');
        this.props.quest();
    };

    // Управление из кнопки уадиодорожки
    toggle = (id) => {
        // 1 Не играет и не выбрана
        if (this.state.id === null) {
            // console.log('Не играет и не выбрана');
            this.audios[id].setAttribute('class', 'music-button-pause');
            this.setState(
                {
                    id: id,
                    audio: this.state.audios[id-1].audio,
                    forename : this.state.audios[id-1].forename,
                    executor : this.state.audios[id-1].executor,
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
                        audio: this.state.audios[id-1].audio,
                        forename :  this.state.audios[id-1].forename,
                        executor :  this.state.audios[id-1].executor,
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
                        audio: this.state.audios[id-1].audio,
                        forename :  this.state.audios[id-1].forename,
                        executor :  this.state.audios[id-1].executor,
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

    // Продолжить играть
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

    // Приостановить
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

    // Возврат на один трек назад
    left = (id) => {
        const next = id - 1;
        // Всего песен
        const lenght = this.state.audios.length;
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
                    audio: this.state.audios[next-1].audio,
                    forename :  this.state.audios[id-1].forename,
                    executor :  this.state.audios[id-1].executor,
                    inactive : true
                }
            );
            this.audios[next].setAttribute('class', 'music-button-pause');
        }
    };

    // Для переключение на следующий трек
    right = (id) => {
        const next = id + 1;

        // Всего песен
        const lenght = this.state.audios.length;
        if (next > lenght) {
            console.log('В перед больше нельзя');

            /**
             * Начать играть треки с самого начала
             */

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
                    audio: this.state.audios[next-1].audio,
                    forename :  this.state.audios[id-1].forename,
                    executor :  this.state.audios[id-1].executor,
                    inactive : true
                }
            );
            // this.audio.play();
            this.audios[next].setAttribute('class', 'music-button-pause');
        }
    };

    // Если песня завершилась вызывется
    ended = () => {
        const id = this.state.id;
        console.log('Песня ' + id + ' завершилась');
        const lenght = this.state.audios.length;
        if (id <= lenght) {
            this.right(id);
        }
    };

    // Включение повтора песни
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

    // Для закрытия понели в месте с песней
    close = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audios[this.state.id].setAttribute('class', 'music-button-play');
        this.setState(
            {
                id : null,
                audio : null,
                forename :  null,
                executor :  null,
                inactive : false,
                loop: false
            }
        );
    };

    // Текущие веря дорожки
    time = () => {
        // console.log('Текущие время песни', this.audio.currentTime);
        // console.log('Общие время песни', this.audio.duration);
        this.setState(
            {
                time : this.audio.currentTime
            }
        );
    };

    // Для изменения значения дорожки
    timeline = (time) => {
        console.log('Изменил время с ', this.audio.currentTime, 'на', time);
        this.audio.currentTime = time;
        this.setState(
            {
                time : this.audio.currentTime
            }
        );
    };

    // Получает значение общего времени трека
    duration = ()=> {
        const duration = this.audio.duration;
        this.setState(
            {
                duration : duration
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
                    onPlay={this.duration}
                    onTimeUpdate={this.time}
                    onEnded={this.ended}
                />
                <div className='roll'>
                    {
                        this.props.quest
                        ?
                        this.props.quest.map((audio)=>{
                            return(
                                <Audio
                                    key = {audio.id}
                                    id = {audio.id}
                                    inactive = {this.state.inactive}
                                    on = {this.on}
                                    off = {this.off}
                                    reference={(ref) => this.audios[audio.id] = ref}
                                    toggle = {this.toggle}
                                    forename = {audio.forename}
                                    executor = {audio.executor}
                                />
                            );
                        })
                        :
                        this.state.audios.map((audio)=>{
                            return(
                                <Audio
                                    key = {audio.id}
                                    id = {audio.id}
                                    inactive = {this.state.inactive}
                                    on = {this.on}
                                    off = {this.off}
                                    reference={(ref) => this.audios[audio.id] = ref}
                                    toggle = {this.toggle}
                                    forename = {audio.forename}
                                    executor = {audio.executor}
                                />
                            );
                        })
                    }
                    <p className='roll-notification'>Подгружаю песни</p>
                </div>
                <div className='walk-container'>
                    <div className="walk">
                        <About
                            forename = {this.state.forename}
                            executor = {this.state.executor}
                        />
                        <Timeline
                            time = {this.state.time}
                            timeline = {this.timeline}
                            duration = {this.state.duration}
                        />
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