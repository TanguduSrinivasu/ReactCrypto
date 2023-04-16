import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const SavedCoin = () => {

    const [savedCoins, setSavedCoins] = useState([]);
    const user = useSelector((store) => store.auth.user)

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setSavedCoins(doc.data()?.watchList);
            console.log(doc.data()?.watchList);
        })
    }, [user?.email])

    const coinRef = doc(db, 'users', `${user?.email}`);

    const deleteCoin = async(id) => {
        try {
            const result = savedCoins.filter((item) => item.id !== id)
            await updateDoc(coinRef, {
                watchList: result
            })
          } catch (error) {
              console.log(error.message)
          }
    } 

  return (
    <div>
        {savedCoins?.length === 0 ? (<p>You don't have any coins saved. Please save a coin to add it to your WatchList. 
            <Link> Click Here to Save the Coins</Link>
        </p>) : (
            <table className='w-full sm:max-w-[800px] mx-auto mb-5 text-center border-collapse'>
                <thead className='h-14'>
                    <tr className='border-b'>
                        <th className='px-4'>Rank #</th>
                        <th className='text-left pl-6 sm:pl-12'>Coin</th>
                        <th className='text-left'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {savedCoins?.map((coin) => (
                        <tr key={coin?.id} className='h-[60px] overflow-hidden'>
                            <td>{coin?.rank}</td>
                            <td>
                                <Link to={`/coin/${coin.id}`}>
                                    <div className='flex items-center'>
                                        <img className='w-8 mr-4' src={coin?.image} alt={coin.id}/>
                                        <div>
                                            <p className='hidden sm:table-cell'>{coin?.name}</p>
                                            <p className='text-gray-500 text-left text-sm'>{coin?.symbol?.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td onClick={() => deleteCoin(coin.id)}>
                                <AiOutlineClose className='cursor-pointer ml-6'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default SavedCoin