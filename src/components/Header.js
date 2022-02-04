
import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CryptoState } from '../Cryptocontext';
import './Styles.scss';

function Header() {

let navigate = useNavigate();

function Homepage(e) {
  e.preventDefault();

  navigate('/home')


}


const { currency, setCurrency } = CryptoState() 

    return (<Container>
        <Navbar className="header">

     
     
    <Navbar.Brand className='logo' onClick={Homepage}>Optimum Crypto</Navbar.Brand>
    
    <Nav className="Nav">
      <Link to="/Coin/:id"><Nav.Link href="#Cryptocurrencies" style={{margin: "10px"}}>Cryptocurrencies</Nav.Link></Link>
      <Link to=''><Nav.Link href="#Exchanges" style={{margin: "10px"}}>Exchanges</Nav.Link></Link>
      <Link to=''><Nav.Link href="#Watchlist" style={{margin: "10px"}}>Watchlist</Nav.Link></Link>
    </Nav>

    <Select variant='outlined' style={{width: 100, height: 40, marginLeft: 15, color: 'gold'}}
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    >    
      <MenuItem value={"NGN"} style={{color: 'black'}}>NGN</MenuItem>
    <MenuItem value={"USD"} style={{color: 'black'}}>USD</MenuItem>
    </Select>

  </Navbar>
  
    </Container> );
}

export default Header;