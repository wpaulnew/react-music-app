import React from 'react';
import './index.css';
// Components
import Menu from '../menu/index.js';
import Audio from '../audio/index.js';
// import Performers from '../performers/index.js';
import Thematic from '../thematic/index.js';
import Search from '../search/index.js';
import View from '../view/index.js';
import MusicContainer from "../music-container/index";
// API
// import api from '../api/index.json';

export default class App extends React.Component {

    constructor() {
        super();
        this.state = ({
            thematic: false
        });
    }

    componentDidMount() {
        // console.log(api);
    }

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
                    <Search />
                    {/*<div className='music-container' id='music-container'>*/}
                        <MusicContainer/>
                    {/*</div>*/}
                    {/*<View/>*/}
                    {/* <Performers /> */}
                    {/*{*/}
                        {/*this.state.thematic*/}
                            {/*? <Thematic />*/}
                            {/*: null*/}
                    {/*}*/}
                    {/*<div className='walk-container'>*/}
                        {/*<div className="walk">*/}
                            {/*<About/>*/}
                            {/*<Timeline/>*/}
                            {/*<Control/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <Menu thematic={this.state.thematic} handleClick={this.handleClick.bind(this)} />
                </div>
            </div>
        );
    }

}