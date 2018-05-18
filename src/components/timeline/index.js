import React from 'react';
import './index.css';
// Components


export default class Timeline extends React.Component {

    render() {
        return (
            <div className='timeline'>
                <p className='now'>0:00</p>
                <input type='range' className='input-timeline' defaultValue='0' min='1' max='100'/>
                <p className='end'>5:07</p>
            </div>
        );
    }

}