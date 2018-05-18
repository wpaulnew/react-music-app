import React from 'react';
import './index.css';
// Components
import axios from 'axios';
import qs from 'qs';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.quest = this.quest.bind(this);
        this.state = (
            {
                text : ''
            }
        );
    }
    componentDidMount() {

    }
    quest = () => {
        // console.log(this.refs.input.value);
        this.setState(
            {
                text: this.refs.input.value
            }
        );
        axios({
            method:'POST',
            url:'http://192.168.0.89/quest.php',
            data: qs.stringify(
                {
                    'text': this.refs.input.value
                }
            )
        })
        .then((reply)=>{
            this.props.quest(reply.data)
        });
    };
    render() {
        return (
            <div className='search'>
                <input
                    type="text"
                    className='input-search'
                    onChange={this.quest}
                    ref='input'
                    value={this.state.text}
                    placeholder='У тебя все получиться!'
                />
                <button className='button-search'>
                    <span className='lnr lnr-chevron-down'></span>
                </button>
            </div>
        );
    }

}