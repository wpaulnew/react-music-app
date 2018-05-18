import React from 'react';
import './index.css';
// Components


export default class Menu extends React.Component {

    componentDidMount() {
        // console.log(this.props.thematic);
    }

    render() {
        return (
            <div className='menu'>
                <button className='button-music pressed'></button>
                <button className='button-loading'></button>
                <button 
                    className='button-thematic'
                    onClick = {this.props.handleClick}
                ></button>
            </div>
        );
    }

}