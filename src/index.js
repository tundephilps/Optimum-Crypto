import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cryptocontext from './Cryptocontext';
import 'react-alice-carousel/lib/alice-carousel.css';




ReactDOM.render(
  <React.StrictMode>
<Cryptocontext>
    <App />
    </Cryptocontext>
  </React.StrictMode>,
  document.getElementById('root')
);
