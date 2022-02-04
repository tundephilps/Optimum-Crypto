import React, { useEffect, useState } from 'react';
import "./Homepage.scss";
import axios from 'axios';
import { TrendingCoins } from '../Api/Api';
import { CryptoState } from '../Cryptocontext'; 
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {

const [trending, setTrending] = useState([]);

const { currency, symbol } = CryptoState();


    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

setTrending(data);
    };

    console.log(trending)

useEffect(() => {
    fetchTrendingCoins()
    // eslint-disable-next-line
}, [currency]);


const items = trending.map((coin) => {
let profit = coin.price_change_percentage_24h >= 0;


    return(
        <Link
        to={`/coin/${coin.id}`}
        className="caroitem">
            <img src={coin?.image}
            alt={coin.name}
            height="80"
            ></img>
            <span style={{fontSize: "1rem"}}>
                {coin?.symbol}
            &nbsp;
            <span style={{color: profit > 0 ? "green" : "red", fontWeight: 350}}>
{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
            </span>

            <span>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        
        </Link>
    )
});

const responsive = {
    0: {
        items: 2,
    },
    512: {
        items: 4,
    },
};

  return <div className="Caro">
      <AliceCarousel 
      mouseTracking
      infinite
      autoPlayInterval={1500}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      />
  </div>;
};

export default Carousel;
