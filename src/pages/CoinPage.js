import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MetroSpinner } from "react-spinners-kit";

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const params = useParams();

  console.log(coin.length)
  console.log(params);

  const getCoinData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=true&sparkline=true`
    );
    const data = await response.json();
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <div className="rounded-div m-[6px]">
    {Object.keys(coin).length > 0 ?  <div className="max-w-[1200px] mx-auto">
      <div className="flex py-8 justify-center">
        <img
          className="w-20 mr-8"
          src={coin?.image?.large}
          alt={coin?.image?.id}
        ></img>
        <div>
          <p className="text-3xl font-bold">{coin?.name} Price</p>
          <p>({coin?.symbol?.toUpperCase()} / INR)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between ">
            <p className="text-3xl font-bold">
              ₹ {coin?.market_data?.current_price?.inr.toLocaleString("en-IN")}
            </p>
            <p>7 Days</p>
          </div>

          <div>
            <Sparklines data={coin?.market_data?.sparkline_7d?.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-300 text-sm">Market Cap</p>
              <p>
                {" "}
                ₹ {coin?.market_data?.market_cap?.inr.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Volume(24h)</p>
              <p>
                {" "}
                ₹ {coin?.market_data?.total_volume?.inr.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-300 text-sm">24h High</p>
              <p>
                {" "}
                ₹ {coin?.market_data?.high_24h?.inr.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm mr-[49px]">24h Low</p>
              <p>
                {" "}
                ₹ {coin?.market_data?.low_24h?.inr.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-300 text-sm">Market Rank</p>
              <p>{coin?.market_cap_rank}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Hashing Algorithm</p>
              <p>{coin?.hashing_algorithm}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Trust Score</p>
              <p>{coin?.liquidity_score?.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-300 text-sm">Price Change(24h)</p>
              <p>
                {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Price Change(7d)</p>
              <p>
                {coin?.market_data?.price_change_percentage_7d?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Price Change(14d)</p>
              <p>
                {coin?.market_data?.price_change_percentage_14d?.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-300 text-sm">Price Change(30d)</p>
              <p>
                {coin?.market_data?.price_change_percentage_30d?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Price Change(60d)</p>
              <p>
                {coin?.market_data?.price_change_percentage_60d?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Price Change(1y)</p>
              <p>
                {coin?.market_data?.price_change_percentage_1y?.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="flex justify-between p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaReddit />
            <FaGithub />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="pt-4 pb-2">
        <p className="text-xl font-bold">About {coin?.name}</p>
        <p className="text-justify">{coin?.description?.en?.replace(/(<([^>]+)>)/gi, "")}</p>
        {/* removed the html tags in a paragraph */}
      </div>
      </div> : <div className="flex items-center justify-center"><MetroSpinner/></div>}
    </div> 
  );
};

export default CoinPage;
