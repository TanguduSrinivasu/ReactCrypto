import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./utils/store";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CoinPage from "./pages/CoinPage";
import Footer from "./components/Footer";



function App() {

  const [coins, setCoins] = useState([]);

  const getCoinData = async() => {
    //const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en');
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&sparkline=true&locale=en');
    const data = await response.json();
    //console.log(data);
    setCoins(data);
  }

  useEffect(() => {
    getCoinData();
  }, [])


  return (
      <Provider store={store}>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home coins={coins}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/coin/:coinId' element={<CoinPage/>}></Route>
      </Routes>
      <Footer/>
      </Provider>
  );
}

export default App;
