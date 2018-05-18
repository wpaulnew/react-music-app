import React from 'react';
import './index.css';
// Components
import Search from '../search/index.js';
import MusicContainer from "../music-container/index";
import View from "../view/index";
import axios from 'axios';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            quest : null,
            thematic: false,
            text : null,
            view: false,
        });
        this.quest = this.quest.bind(this);
        this.view = this.view.bind(this);
        this.notview = this.notview.bind(this);
    }
    // Достает текст песни для показа
    view = (text) => {
        // console.log(text);
        this.setState(
            {
                text : text,
                view : true
            }
        );
    };

    componentDidMount() {
        // axios.get('http://192.168.0.89/api/index.php')
        // .then((audios) => {
        //     this.setState({
        //         audios : audios.data
        //     });
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    // Если я открыл тект я могу его закрыть
    notview = () => {
        console.log('Закрыл слова песни');
        this.setState(
            {
                text : '',
                view : false
            }
        );
    };

    // Что бы покласть данные в api
    quest = (data) => {
        this.setState(
            (prevState) => ({
                quest: prevState.quest = data
            })
        );
    };

    handleClick = () => {
        this.setState({
            thematic: !this.state.thematic
        });
        console.log('performers', this.state.thematic);
    };

    render() {
        return (
            <div className='app-container'>
                <div className='app'>
                    <Search quest={this.quest} />
                    {/*<div className='music-container' id='music-container'>*/}
                    <MusicContainer
                        quest = {this.state.quest}
                        view = {this.view}
                        audios = {this.state.audios}
                    />
                    <View
                        text = {this.state.text}
                        notview = {this.notview}
                        settings = {{view:this.state.view}}
                    />

                    {/*</div>*/}
                    {/*<View/>*/}
                    {/* <Performers /> */}
                    {/*{*/}
                        {/*this.state.thematic*/}
                            {/*? <Thematic />*/}
                            {/*: null*/}
                    {/*}*/}
                    {/*<Menu thematic={this.state.thematic} handleClick={this.handleClick.bind(this)} />*/}
                </div>
            </div>
        );
    }

}