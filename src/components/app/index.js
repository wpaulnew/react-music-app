import React from 'react';
import './index.css';
// Components
import Search from '../search/index.js';
import MusicContainer from "../music-container/index";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = ({
            quest : null,
            thematic: false
        });
        this.quest = this.quest.bind(this);
    }

    componentDidMount() {

    }
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
                    <MusicContainer quest = {this.state.quest}/>
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