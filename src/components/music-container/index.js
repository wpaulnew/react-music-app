import React, { Component } from 'react';
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
import qs from 'qs';
import View from "../view/index";

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
                download: null,
                audios : [],
                text : '',
                left : true,
                right : true,
                roundtime : 0 // Кружок под кнопкой
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
        this.download = this.download.bind(this);
        this.view = this.view.bind(this);

        // Наша дорожка
        this.audio = this.refs.audio;

        // Reds
        this.audios = [];
    }

    componentDidMount() {
        axios.get('http://192.168.0.89/api/index.php')
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
            if (props.quest !== null) {
                // this.audio.pause();
                // this.audio.currentTime = 0;
                if (this.state.id !== null) {
                    this.audios[this.state.id].setAttribute('class', 'music-button-play');
                    // Добавляет или удаляем круг времени
                    this.audios[this.state.id].childNodes[0].childNodes[0].setAttribute('class','circle-disabled');
                }
                this.setState(
                    (prevState) => ({
                        id: null,
                        left : false,
                        right : false,
                        audios: prevState.audios = props.quest
                    })
                );
            }
        }
        if (this.state.inactive === false) {
            if (props.quest !== null) {
                this.setState(
                    (prevState) => ({
                        inactive: false, // Кнопки выключены у компонентов
                        loop: false,
                        left : false,
                        right : false,
                        audios: prevState.audios = props.quest
                    })
                );
            }
        }
    }
    // Управление из кнопки уадиодорожки
    toggle = (id) => {
        // 1 Не играет и не выбрана
        if (this.state.id === null) {
            // Всего песен
            const lenght = this.state.audios.length;
            const right = id;
            const left = id;
            if (right ===  lenght) {
                this.setState(
                    {
                        right : false,
                        left : true
                    }
                );
            }
            if (left === 1) {
                this.setState(
                    {
                        left : false,
                        right : true
                    }
                );
            }
            // console.log('Не играет и не выбрана');
            this.audios[id].setAttribute('class', 'music-button-pause');

            // Добавляет или удаляем круг времени
            this.audios[id].childNodes[0].childNodes[0].setAttribute('class','circle');

            this.setState(
                {
                    id: id,
                    audio: this.state.audios[id-1].audio,
                    forename : this.state.audios[id-1].forename,
                    executor : this.state.audios[id-1].executor,
                    download : this.state.audios[id-1].audio,
                    text : this.state.audios[id-1].text,
                    inactive : true
                }
            );

        }

        // 2 Играет и выбрана
        if(this.audio.paused === false && this.state.id !== null && this.state.inactive === true) {
            // Всего песен
            const lenght = this.state.audios.length;
            const right = id;
            const left = id;
            if (right ===  lenght) {
                this.setState(
                    {
                        right : false,
                        left : true
                    }
                );
            }
            if (left === 1) {
                this.setState(
                    {
                        left : false,
                        right : true
                    }
                );
            }
            // console.log('Играет и выбрана');
            if (this.state.id === id) {
                // console.log('Номера песен равны');
                this.audios[id].setAttribute('class', 'music-button-play');

                // Добавляет или удаляем круг времени
                this.audios[id].childNodes[0].childNodes[0].setAttribute('class','circle');

                this.setState(
                    {
                        inactive : false
                    }
                );
                this.audio.pause();
            }

            if (this.state.id !== id) {
                // Всего песен
                const lenght = this.state.audios.length;
                const right = id;
                const left = id;
                if (right ===  lenght) {
                    this.setState(
                        {
                            right : false,
                            left : true
                        }
                    );
                }
                if (left === 1) {
                    this.setState(
                        {
                            left : false,
                            right : true
                        }
                    );
                }

                if (right !== lenght && left !== 1) {
                    this.setState(
                        {
                            right : true,
                            left : true
                        }
                    );
                }

                // console.log('Номера песен не равны');
                this.audios[this.state.id].setAttribute('class', 'music-button-play');

                // Добавляет или удаляем круг времени
                this.audios[this.state.id].childNodes[0].childNodes[0].setAttribute('class','circle-disabled');

                this.setState(
                    {
                        id: id,
                        audio: this.state.audios[id-1].audio,
                        forename :  this.state.audios[id-1].forename,
                        executor :  this.state.audios[id-1].executor,
                        download : this.state.audios[id-1].audio,
                        inactive : true
                    }
                );
                this.audios[id].setAttribute('class', 'music-button-pause');

                // Добавляет или удаляем круг времени
                this.audios[id].childNodes[0].childNodes[0].setAttribute('class','circle');


                // this.audio.pause();
            }
        }

        // 3 Не играет но выбрана
        if(this.audio.paused === true && this.state.id !== null && this.state.inactive === false) {
            // console.log('Не играет но выбрана');
            if (this.state.id !== id) {
                // console.log('Номера песен не равны');
                this.audios[this.state.id].setAttribute('class', 'music-button-play');

                // Добавляет или удаляем круг времени
                this.audios[this.state.id].childNodes[0].childNodes[0].setAttribute('class','circle-disabled');

                this.setState(
                    {
                        id: id,
                        audio: this.state.audios[id-1].audio,
                        forename :  this.state.audios[id-1].forename,
                        executor :  this.state.audios[id-1].executor,
                        download : this.state.audios[id-1].audio,
                        text : this.state.audios[id-1].text,
                        inactive : true
                    }
                );
                this.audios[this.state.id].setAttribute('class', 'music-button-play');

                // Добавляет или удаляем круг времени
                this.audios[this.state.id].childNodes[0].childNodes[0].setAttribute('class','circle-disabled');
                this.audio.play();
            }
            this.audios[id].setAttribute('class', 'music-button-pause');

            // Добавляет или удаляем круг времени
            this.audios[id].childNodes[0].childNodes[0].setAttribute('class','circle');

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
        // this.audios[id].setAttribute('class', 'music-button-pause');
        if (this.state.id !== null) {
            this.audios[this.state.id].setAttribute('class', 'music-button-play');
        }
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
        // this.audios[id].setAttribute('class', 'music-button-play');
        if (this.state.id !== null) {
            this.audios[this.state.id].setAttribute('class', 'music-button-play');
        }
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

        if (next === 0) {
            console.log('Назад больше нельзя');
            return false;
        }

        if (next > 0 ) {
            const left = next - 1;
            if (left === 0) {
                this.setState(
                    {
                        left : false
                    }
                );
            }
            console.log('Включина песня', id - 1);
            this.audios[id].setAttribute('class', 'music-button-play');
            this.setState(
                {
                    id: next,
                    audio: this.state.audios[next-1].audio,
                    forename :  this.state.audios[next-1].forename,
                    executor :  this.state.audios[next-1].executor,
                    download : this.state.audios[next-1].audio,
                    inactive : true,
                    right : true
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


            if (this.state.id !== null) {
                this.audios[this.state.id].setAttribute('class', 'music-button-play');
            }
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
            const right = next + 1;
            if (right > lenght) {
                this.setState(
                    {
                        right : false
                    }
                );
            }
            console.log('Включина песня', id + 1);
            this.audios[id].setAttribute('class', 'music-button-play');
            this.setState(
                {
                    id: next,
                    audio: this.state.audios[next-1].audio,
                    forename :  this.state.audios[next - 1].forename,
                    executor :  this.state.audios[next - 1].executor,
                    download : this.state.audios[next -1].audio,
                    inactive : true,
                    left : true
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
                download : null,
                loop: false
            }
        );
    };

    // Текущие веря дорожки
    time = () => {
        // console.log('Текущие время песни', this.audio.currentTime);
        // console.log('Общие время песни', this.audio.duration);

        // console.log(this.audios[this.state.id].childNodes[0].childNodes[0].childNodes[0].childNodes[1].setAttribute('stroke-dashoffset',));
        // console.log(this.audio.duration);

        // Полное время песни
        const duration = this.audio.duration;

        // Число на кружке
        const roundtime = duration / 339.292;
        this.setState(
            {
                roundtime : this.state.roundtime + roundtime
            }
        );
        // console.log(339.292 - this.state.roundtime);
        console.log(this.audios[this.state.id].childNodes[0].childNodes[0].childNodes[0].childNodes[1].setAttribute('stroke-dashoffset',339.292 - this.state.roundtime));
        console.log(this.audios[this.state.id].childNodes[0].childNodes[0].childNodes[0].childNodes[1].setAttribute('stroke','#2196f3'));

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

    // Для загрузки дорожки
    download = () => {
        axios({
            method:'POST',
            url:'http://192.168.0.89/download.php',
            data: qs.stringify(
                {
                    'download': this.state.download
                }
            )
        })
        .then((reply)=>{

        });
    };

    // Для просмотра слов песни
    view = (text, forename, executor) => {
        this.props.view(text, forename, executor);
    };

    // Для изменения времени круга
    roundtime = () => {
        console.log('round');

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
                                    text = {audio.text}
                                    view={this.view}
                                    round = {this.state.round}
                                />
                            );
                        })
                        :
                        this.state.audios
                        ?
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
                                    text = {audio.text}
                                    view ={this.view}
                                    round = {this.state.round}
                                />
                            );
                        })
                        :
                        null
                    }
                    {/*<p className='roll-notification'>Подгружаю песни</p>*/}
                </div>
                <div className='walk-container'>
                    <div className="walk">
                        <About
                            text = {this.state.text}
                            view = {this.view}
                            forename = {this.state.forename}
                            executor = {this.state.executor}
                            download = {this.state.download}
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
                            settings = {{'loop':this.state.loop, 'left' : this.state.left, 'right' : this.state.right}}
                            right={this.right}
                            repeat = {this.repeat}
                            close = {this.close}
                        />
                    </div>
                </div>
            </div>
        );
    }

}