import { createContext, useContext, useEffect, useState } from 'react';


const Crypto = createContext()


function Cryptocontext({children}) {
    const [currency, setCurrency] = useState("NGN")
const [symbol, setSymbol] = useState("N")


useEffect(() => {
    if (currency === "NGN") setSymbol("N");
    else if (currency === "USD") setSymbol("$");
}, [currency]);

    return (<Crypto.Provider value={{ currency, symbol, setCurrency }}>
        {children}
    </Crypto.Provider>  );
}   

export default Cryptocontext;

export const CryptoState = () => {
    return useContext(Crypto);
}