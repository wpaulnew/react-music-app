import React from 'react';
import './index.css';
// Components


export default class Performers extends React.Component {

    render() {
        return (
            <div className='performers'>
                <div>
                    <p className="letter">A</p>
                    <p className='forename'>A-SIDE</p>
                    <p className='forename'>Alaniaworshipband</p>
                    <p className='forename'>Anelle</p>
                </div>
                <div>
                    <p className="letter">B</p>
                    <p className='forename'>Bae Da Hae</p>
                    <p className='forename'>Bethel Music</p>
                </div>
            </div>
        );
    }

}