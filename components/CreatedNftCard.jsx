/* eslint-disable @next/next/no-img-element */
import {useState,useEffect} from "react";
import { motion } from "framer-motion";
import AudioPlayer from '../components/AudioPlayer'
import { useStateContext } from '../context/StateContext';
import Link from "next/link";
const CreatedNftCard = ({id,username,dbWallet,img,name,tokenId,desc,type,blockchain,price,createdWallet,ownerW}) => {
  const {user,getUser,connectUser} = useStateContext();

  return (

    <div className="w-[300px] text-slate-400 border-slate-800 border-r-slate-700 rounded-xl bg-gradient-to-tr to-slate-600 from-slate-900 overflow-hidden border-2">
    <a>
      <div className='cursor-pointer pb-5 object-cover'>
      <Link href={`/details/${id}`}><a>{type == "video/mp4"
      ? <video src={img} autoPlay loop muted/>
      : type == "image/png" || type == "image/jpeg" || type == "image/jpg" || type == "image/svg" || type == "image/webp"
      ? <img className='rounded-t-xl object-cover' src={img} alt={name}/>
      : type == "audio/mp3" ||  type == "audio/ogg" || type == "audio/wav" || type == "audio/mpeg"
      ? <AudioPlayer nft={img} nftname={name}/> : null
      }</a></Link>
          
        <div className='flex-col px-5'>
        <div className='flex justify-between items-center w-full my-3'>
          <div className="flex justify-start items-center w-full">
            <h3 className="text-md font-medium text-purple-500">{createdWallet == user ? 'Created by You' : `${username}`}</h3>
          </div>
          <div className='justify-end items-center w-full'>
          <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {tokenId}</h3>
          </div>
          </div>
          <h5 className='flex gap-x-2 text-lg font-bold my-3'>{name}</h5>
          <h5 className='flex gap-x-2 text-sm my-3'>{desc}</h5>
          <h5 className='flex gap-x-2 text-sm my-3'><strong>Price : </strong><span>{price}</span></h5>
          <h5 className='flex gap-x-2 text-sm my-3'><strong>Owner : </strong><span>{ownerW.slice(0,18)}</span></h5>
        </div>
      </div>
    </a>
  </div>

    );
};

export default CreatedNftCard;
