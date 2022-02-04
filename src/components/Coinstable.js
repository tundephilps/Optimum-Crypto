import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../Api/Api';
import { CryptoState } from '../Cryptocontext';
import "./Homepage.scss";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from './Carousel';
import { Pagination } from '@material-ui/lab';



const Coinstable = () => {
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const navigate = useNavigate();
const { currency, symbol } = CryptoState();

const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
};

// eslint-disable-next-line
useEffect(() => {
    // eslint-disable-next-line
    fetchCoins();
    // eslint-disable-next-line
}, [currency]);

    


const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
});

const handleSearch = () => {
    return coins.filter(
        (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
};



    return (<ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
        <Typography variant="h3">
            Crypto Prices by Market Cap
            
        </Typography>

        <TextField label="search for crypto..." variant="outlined"
        style={{backgroundColor: "ash", width: "70%", margin: "1.5rem", borderRadius: "20px"}}
        onChange={(e)=>setSearch(e.target.value)}
        />
<TableContainer>
    {loading ? (
        <LinearProgress style={{backgroundColor: "gold"}} />
    
        ) : (
            <Table>
                <TableHead style={{backgroundColor: "gold"}}>
                <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (

                    
                    <TableCell style={{color: "black", fontWeight: "700"}}
                    key={head}
                    align={head === "Coin" ? "" : "right"}>
                        {head}
                        
                    </TableCell>
                    ))}
                </TableRow>
                </TableHead>

                <TableBody>
                    {handleSearch().slice((page -1) * 10, (page - 1) * 10 + 10).map((row) => {
                            const profit = row.price_change_percentage_24h > 0;
                            
                            return (
                                <TableRow
                                onClick={() => navigate(`/coin/${row.id}`)}
                               
                                className='row'
                                key={row.name}
                                >
                                    <TableCell
                                    component="th"
                                    scope="row"
                                    styles={{
                                        display:"flex",
                                        gap: 15,
                                    }}>
<img

src={row?.image}
alt={row.name}
height="50"
style={{marginBottom: 10}}


 />                            
 <div style={{display: "flex", flexDirection: "column"}}>
     <span styles={{
         fontsize:22
     }}>
         {row.symbol}
     </span>
     <span style={{color: "darkgrey"}}>
         {row.name}
     </span>
     </div>        
                                    </TableCell>
<TableCell align="right">
{symbol}{""}
{numberWithCommas(row.current_price.toFixed(2))}


</TableCell>

<TableCell align="right"
    style={{
color: profit > 0 ? "green" : "red"
}}
>
    {profit && "+"}
    {row.price_change_percentage_24h.toFixed(2)}%

</TableCell>
<TableCell align='right'>
{symbol}{""}
{numberWithCommas(
    row.market_cap.toString().slice(0, -6)
)}
M
</TableCell>
                                </TableRow>
                                
                            )
                    })}
                </TableBody>

            </Table>
        )
    }
</TableContainer>
<Pagination className="pagination"
count={(handleSearch()?.length / 10).toFixed(0)}
onChange={(_, value) => {
    setPage(value);
    window.scroll(0, 450);
}} 
/>

    </Container> 
    </ThemeProvider>
     );
};


export default Coinstable;