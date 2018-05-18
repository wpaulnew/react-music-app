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
                    <button className={this.props.settings.loop ? 'button-repeat disabled' : 'button-repeat'} onClick={this.props.repeat}></button>
                <div>
                    {
                        this.props.settings.left
                        ?
                        <button className='button-left' onClick={()=>this.props.left(this.props.id)}></button>
                        :
                        <button className='button-left-disabled' onClick={()=>this.props.left(this.props.id)} disabled></button>
                    }
                    {
                    this.props.inactive
                    ?
                    <button className='button-pause' onClick={()=>this.props.off(this.props.id)}></button>
                    :
                    <button className='button-play' onClick={()=>this.props.on(this.props.id)}></button>
                    }
                    {
                        this.props.settings.right
                        ?
                        <button className='button-right'onClick={()=>this.props.right(this.props.id)}></button>
                        :
                        <button className='button-right-disabled'onClick={()=>this.props.right(this.props.id)} disabled></button>
                    }
                </div>
                <button className='button-close' onClick={this.props.close}></button>
            </div>
        );
    }

}