import React from "react";

const NftCard = ({mmnfts,filter}) => {
  return (
    mmnfts.slice(0,9).filter(i => filter).map((nft) => (
    <div>
    <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 overflow-hidden border-2 border-slate-800 border-r-slate-700 rounded-xl hover:shadow-2xl hover:shadow-purple-900">
    <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src='https://cryptologos.cc/logos/polygon-matic-logo.png' title='Polygon' className="object-cover w-5 absolute top-2 left-2 opacity-40 hover:opacity-100"/> 
        {nft.type == 'video/mp4'
        ? <video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/>
        : nft.type == 'image/png' || 'image/jpeg' ? <img className='rounded-t-xl object-cover' src={nft.image} />
        : nft.type == 'audio/mp3' || 'audio/wav' ? <AudioPlayer nft={nft.image} nftname={nft.name}/> : null
        }
        <div className='flex-col px-5'>
              <div className='flex justify-between items-center w-full my-3'>
                      
              <div className="flex justify-between items-center w-full">
              <div className='justify-start items-center'>
                <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified ? <MdVerified size={18}/>: null}</h3>
              </div>
              </div>
              <div className='flex justify-end items-center w-full'>
              <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
              </div>
              
              </div>
              <div>
              <h1 className='font-medium text-lg'>{nft.name}</h1>
              </div>
              <div className='flex justify-between my-5 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
              <div className='w-full '>
              <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
              </div>
              <div className='px-3'>
                <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
              </div>
                </div>
              </div>
              <div className='flex justify-between items-center w-full'>
              <div className='w-full'>
              <button className='bg-gradient-to-tr to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
              </div>
              <div className='w-full'>
              <button className='bg-gradient-to-tr to-slate-900 from-slate-900 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white'>Bid</button> 
              </div>
              </div>
              </div>
    </div>
    </div>
    ))
    );
};

export default NftCard;
