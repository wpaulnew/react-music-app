import React from 'react';
import './index.css';
// Components


export default class Search extends React.Component {

    render() {
        return (
            <div className='search'>
                <input type="text" className='input-search' placeholder='У тебя все получиться!'/>
                <button className='button-search'>
                    <span className='lnr lnr-chevron-down'></span>
                </button>
            </div>
        );
    }

}