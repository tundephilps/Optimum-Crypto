
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SingleCoin } from "../Api/Api";
import { CryptoState } from "../Cryptocontext";
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Coininfo from './Coininfo';
import { numberWithCommas } from './Carousel';

const Coin = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState();
    
    const { currency, symbol } = CryptoState();
    
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
    
        setCoin(data);
    };
    
    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line
    }, []);
    
    const useStyles = makeStyles((theme) => ({
        container: {
            display:"flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar:{
            width: "30%",
             [theme.breakpoints.down("md")]: {
             width: "100%",
             },    
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid grey",
},
        description:
        {
            width: "100%",
            padding:25,
            paddingBottom:15,
            paddingTop: 0,
            textAlign: "justify"
        }        


        }));
        
        const classes = useStyles();
        
if (!coin) return <LinearProgress style={{backgroundColor: "gold"}}></LinearProgress>

  return (<div className={classes.container}>
    <div className={classes.sidebar}>
<img
src={coin?.image.large}
alt={coin?.name}
height="200"
style={{marginBottom: 20}}
 />
<Typography variant='h3'>
    {coin?.name}
</Typography>
<Typography className={classes.description}>
    {coin?.description.en.split(". ")[0]}
</Typography><div>
    <span>
        <Typography>
            Rank: &nbsp;      {coin?.market_cap_rank}
        </Typography>
        
    </span>
    <span>
        <Typography>
            Current Price: &nbsp; {symbol}{" "}{numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
            )}
        </Typography>
    </span>
    <span>
        <Typography>
            Market Cap: &nbsp;    {symbol}{" "}{numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )} 
        </Typography>
        
    </span>
    
</div>
    </div>
    <Coininfo coin={coin} />
    </div>
    );
}

export default Coin;
