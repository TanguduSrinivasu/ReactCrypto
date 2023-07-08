import React, { useState } from "react";
import CoinItem from "./CoinItem";
import { MetroSpinner } from "react-spinners-kit";

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="rounded-div m-[6px]">
      <div className="flex flex-col items-center pt-3 pb-3 mb-3">
        <h1 className="text-2xl font-bold mb-2">Search Crypto</h1>
        <form>
          <input
          className="w-[37vw]  bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            type="text"
            placeholder="Search a Coin"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>

     {coins.length>0 ? <table className="w-full border-collapse text-center">
        <thead className="border-b h-14">
          <tr>
          <th></th>
            <th className='px-4'>#</th>
            <th className='md:text-left md:w-[200px]'>Coin</th>
            <th className='hidden md:table-cell'></th>
            <th>Price</th>
            <th>24h</th>
            <th className='hidden md:table-cell'>24h Volume</th>
            <th className='hidden sm:table-cell'>Mkt</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins.filter((filterData) => {
            if(searchText === '')
            {
              return filterData;
            }
            else if(filterData.name.toLowerCase().includes(searchText.toLowerCase()))
            {
              console.log(filterData);
              return filterData;
            }
          }).slice(0,30).map((coin) => (
            <CoinItem key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table> : <div className="flex items-center justify-center"><MetroSpinner/></div>}
    </div>
  );
};

export default CoinSearch;
