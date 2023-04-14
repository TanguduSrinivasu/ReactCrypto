import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

const CoinItem = ({ coin }) => {

    const numDifferentiation = (value) => {
        var val = Math.abs(value)
        if (val >= 10000000) {
          val = (val / 10000000).toLocaleString('en-IN') + ' Cr';
        } else if (val >= 100000) {
          val = (val / 100000).toLocaleString('en-IN') + ' Lac';
        }
        return val;
      }

      //console.log(coin)

  return (
    <tr className="border-b h-[80px]">
      <td>
        <AiOutlineStar />
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`coin/${coin.id}`}>
        <div className="flex items-center">
          <img
            className="w-9 mr-3 rounded-full"
            src={coin.image}
            alt={coin.id}
          />
          <p className="hidden lg:table-cell">{coin.name}</p>
        </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>₹{coin.current_price.toLocaleString('en-IN')}</td>
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
      <td className="hidden md:table-cell">₹{numDifferentiation(coin.total_volume)}</td>
      <td className="hidden sm:table-cell">₹{numDifferentiation(coin.market_cap)}</td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
