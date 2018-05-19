import React from 'react';
import './index.css';
// Components
import icon from './img/icon.png';

export default class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = (
            {
                text : null,
                forename : null,
                executor : null
            }
        );
    }
    componentDidMount() {
        // console.log(this.props);
    }
    componentWillReceiveProps(props){
        if (props.text !== undefined) {
            // console.log(props.text);
            this.setState(
                {
                    text : props.text,
                    forename: props.forename,
                    executor: props.executor
                }
            );
            const div = this.refs.text;
            const text = props.text;
            div.innerHTML = text;
        }
    };
    render() {
        return (
            <div className={this.props.settings.view ? 'view' : 'view-disabled'}>
                <div className='about'>
                    {/*<img src={icon} className='img-about'/>*/}
                    <div>
                        <p className='about-forename'>{this.state.forename}</p>
                        <p className='about-executor'>{this.state.executor}</p>
                    </div>
                    <div className='pull'>
                        <button className='button-close' onClick={this.props.notview}></button>
                    </div>
                </div>
                <div className='view-text'>
                    <div className='text' ref='text'></div>
                </div>
            </div>
        );
    }

}