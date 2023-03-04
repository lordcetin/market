import React,{useState,useEffect} from "react";
import {Navbar,Footer,Welcome} from './';
import Notify from "./Notify";
import Image from "next/image";
import { useStateContext } from "../context/StateContext";
import Logo from '../public/logo.png'
import {AiOutlineLoading} from 'react-icons/ai'
import { useRouter } from "next/router";
import {ethers} from 'ethers';
import Web3Modal from "web3modal";
import Token from '../engine/Token.json';
import Auction from '../engine/Auction.json';

const Layout = ({children}) => {
  const {user,getUser,connectUser,conWallet,setConWallet,cri,auction} = useStateContext();
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if(window.ethereum.selectedAddress == undefined){
      setConWallet(true);
    }
    if(window.ethereum.selectedAddress == !undefined){
      setConWallet(false)
    }
  })


  return (
    <div>
    {conWallet ? (
      <div className="fixed w-screen h-screen top-0 left-0 bg-slate-900 z-[999999]">
        <div className="flex container justify-center items-center text-center h-full">
          <div className="flex-col justify-center items-center text-center">
          <div className="overflow-hidden container flex w-72 my-3">
          <Image src={Logo} className="object-cover animate-pulse"/>
          </div>
            <div className="flex justify-center items-center">
            <div className="flex justify-center items-center my-3">
              <button onClick={connect} className={loading ? "border-[1px] border-orange-300 py-2 px-3 flex items-center gap-x-5 rounded-md text-orange-300" : "border-[1px] border-orange-300 py-2 px-7 rounded-md text-orange-300"}>Connect Wallet {loading ? <AiOutlineLoading size={22} className="text-orange-300 animate-spin"/> : null}</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      ) : null}
    <div className="bg-[#00051a]">
    <Navbar/>
    <Notify/>
    {children}
    </div>
    <Footer/> 
    </div>
    );
};

export default Layout;
