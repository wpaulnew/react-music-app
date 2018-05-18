import React from 'react';
import './index.css';
import icon from './img/icon.png';
// Components


export default class About extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='about'>
                {/*<img src={icon} className='img-about'/>*/}
                <div>
                    <p className='about-forename'>{this.props.forename}</p>
                    <p className='about-executor'>{this.props.executor}</p>
                </div>
                <div className='pull'>
                    <button className='button-view' onClick={()=>this.props.view(this.props.text)}></button>
                    <a href={this.props.download} className='button-download' download={this.props.forename}></a>
                </div>
            </div>
        );
    }

}