import React, { useEffect, useState } from "react";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const getTrendingData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/search/trending"
    );
    const data = await response.json();
    console.log(data?.coins);
    setTrending(data?.coins);
  };

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <div className="rounded-div m-[6px] text-primary">
      <h1 className="text-2xl font-bold mb-4">Trending Coins</h1>
      {/* grid cointainer */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trending.map((trendCoin, index) => (
          <div key={index} className="rounded-div m-[6px] flex justify-between p- hover:scale-105 duration-300">
            <div className="flex w-full gap-4">
              <img className="rounded-full" src={trendCoin?.item?.small} alt={trendCoin?.item?.id} />
              <div>
                <p className="font-bold">{trendCoin.item.name}</p>
                <p>{trendCoin.item.symbol}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mr-5">
              <img
                className='w-4'
                src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                alt="/"
              />
              <p>{trendCoin.item.price_btc.toFixed(7)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
