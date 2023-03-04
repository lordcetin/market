import React,{useEffect,useState} from "react";
import Auction from '../engine/Auction.json';
import Token from '../engine/Token.json';
import { cipherEth, cipherMM, simpleCrypto } from '../engine/configuration';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { useStateContext } from '../context/StateContext';
import Countdown from "./Countdown";
import {FaUser} from 'react-icons/fa'
import TimeAgo from "./TimeAgo";

const AllBidders = ({tokenId,winner,duration}) => {
  const {user,getUser,connectUser,auction,cri,rpc,cipher} = useStateContext();
  const [mmbidders,MumsetBidders] = useState([]);
  const [bidderuser,setBidderUser] = useState(null)
  const [count,setCount] = useState(15)

  useEffect(() => {
    loadBidders()
  },[])

  async function loadBidders() {
    let network = rpc
    const key = simpleCrypto.decrypt(cipherMM)
    const provider = new ethers.providers.JsonRpcProvider(network)
    const wallet = new ethers.Wallet(key, provider);
    let auctioncontract = new ethers.Contract(auction, Auction, wallet)
    const data = await auctioncontract.getBidders(tokenId)

    const items = await Promise.all(data.map(async i => {

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price:price,
        bidder:i.bidder,
        bidtime:i.timestamp.toNumber(),
        refunded:i.refunded,
        won:i.won
      }
      return item
    }))
    MumsetBidders(items.reverse().slice(0,`${count}`))
  }

  const handleClaim = async (x) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const gasPrice = ethers.utils.parseUnits('20', 'gwei');
    let cosmeta = new ethers.Contract(cri,Token,signer);

    const contract = new ethers.Contract(auction, Auction, signer)
    //await cosmeta.increaseAllowance(auction, bidprice)//ethers.utils.parseEther(price.toString())
    const transaction = await contract.claimPrize(tokenId,x,{gasPrice:gasPrice})
    await transaction.wait()
  }

  return (
    <div>
    <div className="flex items-center font-bold text-slate-50 mt-5 mb-1 gap-x-2"><span className="text-2xl">All Bidders</span><span className="bg-slate-700 rounded w-6 h-6 flex justify-center items-center text-center">{mmbidders.length}</span></div>
      <div className="flex-cols items-center w-full text-slate-400 h-64 overflow-y-scroll scroll-m-0 scrollbar-thin scrollbar-track-transparent">
        {mmbidders.map((i,x) => {
          return (
            <div key={x}>
            {winner == user && i.bidder == winner && Date.now() > duration + '000' ? <button className="border-[1px] border-yellow-300 bg-gradient-to-tl to-orange-400 from-yellow-300 text-yellow-200 text-xl font-bold rounded-md px-3 py-3 my-2 w-full animate-pulse" onClick={() => handleClaim(x)}>Claim Prize</button> : (
            <div className="border-[1px] border-slate-700 rounded-md px-3 py-3 my-2">
            <div className="flex justify-between items-center w-full gap-x-3">
            <div className="justify-start items-center flex gap-x-2"><FaUser size={14}/><span>{i.bidder.slice(0,5) + '...' + i.bidder.slice(38)}</span></div>
            <div className="flex justify-center items-center gap-x-1"><strong>{i.price}</strong><img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-5' title='Crypto International (CRI)' /></div>
            <div className="justify-end flex"><TimeAgo timestamp={i.bidtime + '000'}/></div>
            </div>
            </div>)}
            </div>
            )
        })}
      
      </div>
    </div>
    );
};

export default AllBidders;
