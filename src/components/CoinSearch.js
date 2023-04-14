import React, { useState } from "react";
import CoinItem from "./CoinItem";

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="rounded-div m-[6px]">
      <div className="flex flex-col items-center pt-3 pb-3 mb-3">
        <h1 className="text-2xl font-bold mb-2">Search Crypto</h1>
        <form>
          <input
          className="w-[27vw]  bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            type="text"
            placeholder="Search a Coin"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>

      <table className="w-full border-collapse text-center">
        <thead className="border-b h-14">
          <tr>
            <th className="lg:w-5"></th>
            <th className="px-4 lg:w-10">#</th>
            <th className="text-left w-[12%]">Coins</th>
            <th className="lg:w-12"></th>
            <th className="lg:w-24">Price</th>
            <th className="lg:w-20">24h</th>
            <th className="hidden md:table-cell lg:w-[70px]">24h Volume</th>
            <th className="hidden sm:table-cell lg:w-[60px]">Market</th>
            <th className="w-[20%]">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins.filter((filterData) => {
            if(searchText === '')
            {
              return filterData;
            }
            else if(filterData.name.toLowerCase().includes(searchText.toLocaleLowerCase()))
            {
              console.log(filterData);
              return filterData;
            }
          }).map((coin) => (
            <CoinItem key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinSearch;
