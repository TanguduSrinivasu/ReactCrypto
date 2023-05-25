import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const CoinItem = ({ coin }) => {
  const [watchlistCoin, setWatchListCoin] = useState(false);
  const [savedCoins, setSavedCoins] = useState([]);

  const user = useSelector((store) => store.auth.user);

  const coinPath = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        setSavedCoins(doc.data()?.watchList);
        //console.log(doc.data()?.watchList);
    })
}, [user?.email])

  const saveCoin = async () => {
    if (user?.email) {
      setWatchListCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };


  const deleteCoin = async(id) => {
    try {
        setWatchListCoin(false);
        const result = savedCoins.filter((coin) => coin.id !== id)
        await updateDoc(coinPath, {
            watchList: result
        })
      } catch (error) {
          console.log(error.message)
      }
} 


  const numDifferentiation = (value) => {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = (val / 10000000).toLocaleString("en-IN") + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toLocaleString("en-IN") + " Lac";
    }
    return val;
  };

  //console.log(coin)

  return (
    <tr className="border-b h-[90px]">
       <td>
        {watchlistCoin ? <AiFillStar onClick={() => deleteCoin(coin.id)}/> : <AiOutlineStar onClick={saveCoin}/>}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`coin/${coin.id}`}>
          <div className="flex flex-col md:flex-row items-center">
            <img
              className="w-9 mr-3 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="lg:table-cell max-w-[100px] md:max-w-none">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td className="w-3 hidden md:table-cell">{coin.symbol.toUpperCase()}</td>
      <td>₹{coin.current_price.toLocaleString("en-IN")}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      {/* <td className="w-[180px] hidden md:table-cell">₹{coin.total_volume.toLocaleString('en-IN')}</td>
      <td className="w-[180px] hidden sm:table-cell px-1">₹{coin.market_cap.toLocaleString('en-IN')}</td> */}
      <td className="w-[180px] hidden md:table-cell">
        ₹{numDifferentiation(coin.total_volume)}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ₹{numDifferentiation(coin.market_cap)}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
