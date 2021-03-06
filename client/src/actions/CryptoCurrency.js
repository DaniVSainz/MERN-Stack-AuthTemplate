import axios from "axios";
import { GET_CRYPTOCURRENCIES, GET_CRYPTOCURRENCY} from "./types";
let url;

// url = "http://159.89.48.60:3001"
// url = "http://localhost:3001";

if(process.env.REACT_APP_ENV === 'dev'){
  url = "http://localhost:3001";
}else{
  url = "http://159.89.48.60:3001"
}

export const getAllCryptoCurrencies = () => async dispatch =>{
  let res = await axios.get(`${url}/coinmarketcap/getall`).catch(err => {
    return err.response;
  });
  dispatch({ type: GET_CRYPTOCURRENCIES, payload: res.data });
}

//Returns the selected cryptocurrency with a pairing from the database. Pairing is not specified and returns in USDT>BTC>ETH>BNB(BinanceCoin)
export const getCryptoCurrency = (symbol) => async (dispatch) =>{
  let res = await axios.get(`${url}/binance/getpairdata/${symbol}`).catch(err => {
    return err.response;
  });
  if(res.data.msg !== "Sorry we dont have any historical data for that cryptocurrency"){
    dispatch({ type: GET_CRYPTOCURRENCY, payload: res.data });
  }else{
    dispatch({ type: GET_CRYPTOCURRENCY, payload: [{},{days:false},{}] });
  }
}

export const getCryptoCurrencyPairing = (symbol,quote_asset) => async (dispatch) =>{
  // /getpairdata/:symbol/:pairing
  let res = await axios.get(`${url}/binance/getpairdata/${symbol}/${quote_asset}`).catch(err => {
    return err.response;
  });
  if(res.data.msg !== "Sorry we dont have any historical data for that cryptocurrency"){
    console.log(res.data)
    dispatch({ type: GET_CRYPTOCURRENCY, payload: res.data });
  }else{
    dispatch({ type: GET_CRYPTOCURRENCY, payload: [{},{days:false},{}] });
  }
}