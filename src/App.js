import React from 'react';
import Header from './components/Header';
import Coin from './components/Coin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import Homepage from './components/Homepage';



function App() {
    return (<div>

<Router>
        <Header />
    <div className='container'>
<Routes>
<Route path="/" element={<Homepage />} exact/>

    <Route path="/home" element={<Homepage />} exact/>
    <Route path="/coin/:id" element={<Coin />} />
</Routes>
</div>

        
        </Router>
    </div>  );
}

export default App;