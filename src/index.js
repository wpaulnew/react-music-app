import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import ReactDOM from 'react-dom';
import './index.css';
// Components
import App from './components/app/index.js';

ReactDOM.render(
    <App/>,
    document.getElementById('root'));
registerServiceWorker();