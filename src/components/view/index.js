import React from 'react';
import './index.css';
// Components
import icon from './img/icon.png';

export default class View extends React.Component {

    constructor() {
        super();

    }

    render() {
        return (
            <div className='view'>
                <div className='about'>
                    <img src={icon} className='img-about'/>
                    <div>
                        <p className='about-forename'>Прославлю Тебя в шторм</p>
                        <p className='about-executor'>Алексей Каратаев</p>
                    </div>
                    <div className='pull'>
                        <button className='button-close'></button>
                    </div>
                </div>
                <div className='view-text'>
                    <div className='text'>

                        <b>1 куплет:</b>
                        Закрыв глаза, я вижу Иерусалим
                        Где Иисус мой Царь и Бог мой ходил
                        (Он умолял, людей земли умолял
                        Принять Отца и любовь, Его понять)-2раза

                        <b>2 куплет:</b>
                        Но в слепоте греха весь мир погибал
                        И не узнав, Мессию громко кричал
                        (Смерть, смерть Ему на крест Его вознесём
                        И гвозди смело забьём в руки Его)-2раза

                        <b>3 куплет:</b>
                        Царь всей земли на древе свято страдал
                        И за мой грех жизнь добровольно отдал
                        (Подняв глаза к небу, Отцу Он сказал
                        Прости им Отче, они не ведают что творят)-2раза
                        <b>2 куплет:</b>
                        Но в слепоте греха весь мир погибал
                        И не узнав, Мессию громко кричал
                        (Смерть, смерть Ему на крест Его вознесём
                        И гвозди смело забьём в руки Его)-2раза
                    </div>
                </div>
            </div>
        );
    }

}