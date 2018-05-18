import React from 'react';
import './index.css';
// Components


export default class Control extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='control'>
                <button className='button-repeat'></button>
                <div>
                    <button className='button-left' onClick={()=>this.props.left(this.props.id)}></button>
                    {
                    this.props.inactive
                    ?
                    <button className='button-pause' onClick={()=>this.props.off(this.props.id)}></button>
                    :
                    <button className='button-play' onClick={()=>this.props.on(this.props.id)}></button>
                    }
                    <button className='button-right'onClick={()=>this.props.right(this.props.id)}></button>
                </div>
                <button className='button-close'></button>
            </div>
        );
    }

}