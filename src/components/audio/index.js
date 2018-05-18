import React from 'react';
import './index.css';
// Components


export default class Audio extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='music'>
                <div className='music-button'>
                    <button ref={this.props.reference} className='music-button-play' onClick={()=>this.props.toggle(this.props.id)}>Возпроизвести эту песню {this.props.id}</button>

                    <div className='circle-container'>
                        <div className='circle'>
                            <svg width='40' height='40' viewBox='0 0 120 120'>
                                <circle cx='60' cy='60' r='54' fill='none' stroke='#e6e6e6' strokeWidth='10'/>
                                <circle cx='60' cy='60' r='54' fill='none' stroke='#2196f3' strokeWidth='10'
                                        strokeDasharray='339.292' strokeDashoffset='322.61197178968575'/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='music-information'>
                    <div className='music-about'>
                        <p className='music-forename'>Название</p>
                        <p className='music-executor'>Автор</p>
                    </div>
                    <div className='music-internal'>
                        <p className='music-time'>5:04</p>
                        <button className='button-speech'></button>
                    </div>
                </div>
            </div>
        );
    }

}