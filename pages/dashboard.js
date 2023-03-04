/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useEffect} from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from "web3modal";
import NFT from '../engine/NFT.json';
import Market from '../engine/Market.json';
import Token from '../engine/Token.json';
import { mmnft, mmmarket } from '../engine/configuration';
import { goenft, goemarket } from '../engine/configuration';
import { hhnft, hhmarket,hhtoken } from '../engine/configuration';
import { bsctnft, bsctmarket } from '../engine/configuration';
import { Button, Input } from '@nextui-org/react';
import { client } from '../engine/configuration';
import { useStateContext } from '../context/StateContext';
import detectEthereumProvider from '@metamask/detect-provider';

import {MdVerified,MdEmail,MdCalendarToday} from 'react-icons/md'


const Dashboard = (props) => {
    const {user,getUser,connectUser,readData} = useStateContext();
    const [fee,setListingFee] = useState(0);
    const [mfee,setMintingFee] = useState(0);
    const [allUser,setAllUser] = useState(true);
    const [verifiedUser,setVerified] = useState(false)
    const [searchval,setVal] = useState(null);
    const [filt,setFilter] = useState([]);

    useEffect(()=>{
        connectUser();
        connectContract();
    },[getUser])

    async function connectContract() {

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        let contractnft = new ethers.Contract(hhnft, NFT, signer)
        let mintingFee = await contractnft.getMintingFee();
        mintingFee = ethers.utils.formatUnits(mintingFee ,'ether').toString()
        let contractmarket = new ethers.Contract(hhmarket, Market, signer)  
        let listingFee = await contractmarket.getListingFee();
        listingFee = ethers.utils.formatUnits(listingFee ,'ether').toString()
        setListingFee(listingFee);
        setMintingFee(mintingFee);
    }
    console.log("ReadData",readData)
    const data = readData.map(users => {
      return{userid:users._id,
            username:users.username,
            email:users.email,
            verified:users.role,
            admin:users.root,
            avatar:users.profile.avatar,
            banner:users.profile.banner,
            createdAt:users.createdAt
            }
    })

    const handleChange = async (e) => {
      e.preventDefault();
      setVal(e.target.value)

      
    }
    console.log(filt)
  return (
    <div className='flex justify-center items-center py-40'>


      <div className='justify-center items-center'>

        <div className='flex justify-between items-center w-full py-10 px-20 my-10 bg-gradient-to-t to-slate-900 from-transparent rounded-t-2xl'>
        <div className='flex w-full gap-x-3'>
        <div className='cursor-pointer border-[1px] border-slate-700 rounded-lg py-2 px-5 text-slate-700 hover:border-slate-50 hover:text-slate-50' onClick={() => setAllUser(true)}><span>All Users</span></div>
        <div className='cursor-pointer border-[1px] border-slate-700 rounded-lg py-2 px-5 text-slate-700 hover:border-slate-50 hover:text-slate-50' onClick={() => {setAllUser(false),setVerified(true)}}><span>Verified</span></div>
        </div>
        <div className='flex w-full justify-center items-center mx-10'>
        <input type="search" name="search" id="search" onChange={handleChange} placeholder='Search User' className='bg-slate-800 rounded-lg w-96 py-2 px-3 text-slate-400 placeholder:text-slate-400 selection:bg-slate-900'/>
        </div>
          <div className='flex-col w-full'>
          <div>Listing Fee : <span>{fee}</span> ether</div>
          <div>Minting Fee : <span>{mfee}</span> ether</div>
          </div>
        </div>

        <div className='grid grid-cols-5 gap-5'>
        {allUser ?
          data.map((users) =>
          <div key={users._id} className="bg-slate-900 rounded-xl w-72 pb-7">
            <img src={users.banner} className="object-cover rounded-t-xl" />
            <div className='flex w-full justify-center items-center'>
              <div className='relative bottom-10 border-2 border-slate-400 rounded-full w-20 h-20'>
                <img src={users.avatar} alt={users.username} className="rounded-full object-cover" />
              </div>
            </div>
            <div className='flex w-full relative bottom-8 justify-center items-center'>
              <div className='flex justify-center items-center'><strong className='text-slate-400'>@</strong><span className='text-lg'>{users.username}</span>{users.verified == 'verified' ? <MdVerified size={18} title="Verified" className='ml-1'/>: null}</div>
            </div>
            <div className='flex-col w-full px-5 gap-y-2'>
            <div className='flex items-center text-slate-400 gap-x-1'><strong title='User ID' className='flex justify-center items-center text-sm text-slate-400'>ID</strong> <span className='text-sm'>{users.userid}</span></div>
            <div className='flex items-center text-slate-400 gap-x-1'><MdCalendarToday size={18} title="Created at"/> <span className='text-sm'>{users.createdAt.slice(0,22)}</span></div>
            <div className='flex items-center text-slate-400 gap-x-1'><MdEmail size={18}/> <span className='text-sm'>{users.email}</span></div>
            </div>
          </div>
        ):null}
        </div>
        
        </div>


    </div>
    );
};

export default Dashboard;
