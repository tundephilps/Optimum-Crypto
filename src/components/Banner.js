import { Container } from 'react-bootstrap';
import React from 'react';
import "./Homepage.scss";
import { Typography } from '@material-ui/core';
import Carousel from './Carousel';

function Banner() {
    return (<div className='banner'>
        <Container className="content">
            <div className='Typo'>
                <Typography variant='h2'>
                Optimum
                </Typography>
<Typography>
    Top Crypto in the market
</Typography>

                </div> 
                <Carousel className="caro" />
                       </Container>
        
    </div>  );
}

export default Banner;