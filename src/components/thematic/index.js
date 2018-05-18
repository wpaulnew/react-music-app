import React from 'react';
import './index.css';
// Components


export default class Thematic extends React.Component {

    render() {
        return (
            <div className='thematic'>
                <div>
                    <p className="letter">Б</p>
                    <p className='forename'>Благодарение</p>
                    <p className='forename'>Божья любовь</p>
                </div>
                <div>
                    <p className="letter">В</p>
                    <p className='forename'>Величие Бога</p>
                    <p className='forename'>Вера и упование</p>
                    <p className='forename'>Второе пришествие</p>
                </div>
            </div>
        );
    }

}