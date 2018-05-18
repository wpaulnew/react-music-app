import React from 'react';
import './index.css';
// Components


export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.timeline = this.timeline.bind(this);
    }
    timeline = (event) => {
        // console.log('Изменил время песни на', event.target.value);
        // this.props.timeline(time);
        const time = event.target.value;
        this.props.timeline(time)
    };
    render() {
        return (
            <div className='timeline'>
                <p className='now'>0:00</p>
                <input type='range' className='input-timeline' onChange={this.timeline} value={this.props.time} min='1' max={this.props.duration}/>
                <p className='end'>5:07</p>
            </div>
        );
    }

}