import React from 'react';
import './index.css';
import icon from './img/icon.png';
// Components


export default class About extends React.Component {

    componentDidMount() {
        // console.log(this.props.thematic);
    }

    render() {
        return (
            <div className='about'>
                <img src={icon} className='img-about'/>
                <div>
                    <p className='about-forename'>Прославлю Тебя в шторм</p>
                    <p className='about-executor'>Алексей Каратаев</p>
                </div>
                <div className='pull'>
                    <button className='button-view'></button>
                    <button className='button-download'></button>
                </div>
            </div>
        );
    }

}