/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect,useRef,useReducer, Fragment} from 'react';
import { useStateContext } from "../context/StateContext";
import { ethers } from 'ethers';
import next from 'next';
import axios from 'axios';
import {AiOutlineLoading} from 'react-icons/ai'
import Web3Modal from "web3modal";
import { useRouter } from 'next/router';
import NFTCollection from '../engine/NFTCollection.json'
import Resell from '../engine/Resell.json';
import NFT from '../engine/NFT.json';
import Market from '../engine/Market.json';
import Token from '../engine/Token.json';
import { Text, Button, Container } from '@nextui-org/react';
import { hhnft, hhmarket, hhresell, hhnftcol, hhrpc,hhtoken } from '../engine/configuration';
//import { goenft, goemarket, goeresell, goenftcol, goerpc,goetoken } from '../engine/configuration';
//import { bsctnft, bsctmarket, bsctresell, bsctnftcol, bsctrpc,bsctoken } from '../engine/configuration';
import { mmnft, mmmarket, mmresell, mmnftcol, mmrpc,mmtoken } from '../engine/configuration';
import { cipherHH, cipherEth, simpleCrypto,client } from '../engine/configuration';
import Carousel from "react-multi-carousel";
import Link from 'next/link';
import "react-multi-carousel/lib/styles.css";
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs';
import {FaFilter} from 'react-icons/fa'
import {MdVerified,MdClose} from 'react-icons/md';
import ConnectChain from '../engine/connectchain';
import uniqid from 'uniqid';
import detectEthereumProvider from '@metamask/detect-provider';
import { bscChain, polyChain, ethChain, hardChain, bscTest, ethTest, polyTest } from '../engine/chainchange';
import {BiSearch} from 'react-icons/bi'
import {MdKeyboardArrowDown,MdKeyboardArrowUp,MdRadioButtonUnchecked} from 'react-icons/md'
import jwt from 'jsonwebtoken';
import { motion } from "framer-motion"
import {AiFillCheckCircle} from 'react-icons/ai'
import AudioPlayer from '../components/AudioPlayer';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/Loading';
import Auction from '../engine/Auction.json'
import Media from 'react-media';
import { LiveAuctionNftCard } from '../components';
import { AllAuctionNftCard }  from '../components';
import CountdownWhite from '../components/CountdownWhite';
import Countdown from '../components/Countdown';
import AllBidders from '../components/AllBidders';

const Home = () => {

  //const [hhlist, hhResellNfts] = useState([])
  const [hhnfts, hhsetNfts] = useState([])
//const [goelist, goeResellNfts] = useState([])
//const [goenfts, goesetNfts] = useState([])
//const [bsctlist, bsctResellNfts] = useState([])
//const [bsctnfts, bsctsetNfts] = useState([])
//const [mmlist, MumResellNfts] = useState([])
const [mmnfts, MumsetNfts] = useState([])
const [mumliveauction, MumLiveAuction] = useState([])
const [mumallauction, MumAllAuction] = useState([])
const [cs,bn] = useState(null);
  const [uid,setUid] = useState(null);
  const [type,setFileType] = useState(null);
  const [openPrice,setOpenPrice] = useState(true);
  const [openVerify,setOpenVerify] = useState(false);
  const [openNetwork,setOpenNetwork] = useState(false);
  const [openNft,setOpenNft] = useState(true);
  const [process,setProcess] = useState(false);
  const [usertok,setToken] = useState(null);
  const [lowprice,setLowCheckPrice] = useState(false);
  const [highprice,setHighCheckPrice] = useState(false);
  const [checkImage,setCheckImage] = useState(true);
  const [checkVideo,setCheckVideo] = useState(true);
  const [checkMusic,setCheckMusic] = useState(true);
  const [eth,setEthereum] = useState(false);
  const [poly,setPolygon] = useState(false);
  const [bsc,setBinance] = useState(false);
  const [verifiedartist,setVerifiedArtist] = useState(false);
  const [verifiedseller,setVerifiedSeller] = useState(false);
  const [defaultState,setDefaultState] = useState(false);
  const [openFilter,setOpenFilter] = useState(false)
  const [lanft,setLaNft] = useState(true)
  const [laauc,setLaAuc] = useState(false)
  const [count,setCount] = useState(15)
  const [hoverBid,setHoverBid] = useState(false)
  const [openBidModal,setOpenBid] = useState(false)
  const [formInput,updateFormInput] = useState({bidprice:''})

  const rad = useRef();

  const {
    user,
    getUser,
    connectUser,
    bscChain,
    polyChain,
    ethChain,
    hardChain,
    bscTest,
    ethTest,
    polyTest,
    nfts,
    setNfts,
    setContAddr,
    contAdr,
    getNfts,
    getChain,
    getOwners,
    setNftResell,
    setNftCustom,
    setTokenCol,
    setNftCol,
    setMarket,
    cipherMM,
    auction,
    setRpc,
    chain,
    getChainName,
    rpc,
    getRpc,
    marketcol,
    getMarket,
    nftcol, getNftCol,
    cri,setTokenCri,
    nftcustom, getNftCustom,
    nftresell, getNftResell,
    owners,setOwners,
    readData} = useStateContext();

  useEffect(() => {
    connectUser()
    getChain()
    setNftCustom()
    setTokenCol()
    setMarket()
    setRpc()
    setUid(uniqid())
    const token = localStorage.getItem('token')
    if(token){
      const usertoken = jwt.decode(token)
      setToken(usertoken.email)
      if(!usertoken){
        localStorage.removeItem('token')
        router.push('/login')
      }else{
        //populateQuate()
        console.log('Error')
      }
    }
    //loadHardHatResell()
    //loadHHSaleNFTs()
    //loadGoerliResell()
    //loadBsctResell()
    //loadMumResell()
    loadMumSaleNFTs()
    loadLiveAuction()
    loadAllAuction()
  }, [getUser,mmnfts,getChain,MumsetNfts,getNftCustom,getNftResell,getRpc,getChainName,
    //hhnfts,hhsetNfts,hhResellNfts, hhsetNfts,goeResellNfts,MumsetNfts,goesetNfts,bsctResellNfts, bsctsetNfts,MumsetNfts
  ])

  const router = useRouter();

  // async function loadMumResell() {
  //   const provider = new ethers.providers.JsonRpcProvider(mmrpc)
  //   const key = simpleCrypto.decrypt(cipherEth)
  //   const wallet = new ethers.Wallet(key, provider);
  //   const contract = new ethers.Contract(mmnftcol, NFTCollection, wallet);
  //   const market = new ethers.Contract(mmresell, Resell, wallet);
  //   const itemArray = [];
  //   contract.totalSupply().then(result => {
  //     for (let i = 0; i < result; i++) {
  //       let token = i + 1;     
  //       let owner = contract.ownerOf(token)
  //       let getOwner = Promise.resolve(owner)
  //       getOwner.then(address => {
  //       if (address == mmresell) {
  //       const rawUri = contract.tokenURI(token)
  //       const Uri = Promise.resolve(rawUri)
  //       const getUri = Uri.then(value => {
  //         let str = value
  //         let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
  //         //console.log("CleanUri",cleanUri)
  //         let metadata = axios.get(cleanUri).catch(function (error) {
  //           //console.log(error.toJSON());
  //         });
  //         return metadata;
  //       })
  //       getUri.then(value => {
  //         let rawImg = value.data.image
  //         var name = value.data.name
  //         var desc = value.data.description
  //         let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
  //         const price = market.getPrice(token)
  //         Promise.resolve(price).then(_hex => {
  //         var salePrice = Number(_hex);
  //         var txPrice = salePrice.toString()
  //         Promise.resolve(owner).then(value => {
  //           let ownerW = value;
  //           let outPrice = ethers.utils.formatUnits(salePrice.toString(), 'ether')
  //           let meta = {
  //             name: name,
  //             image: image,
  //             cost: txPrice,
  //             val: outPrice,
  //             tokenId: token,
  //             wallet: ownerW,
  //             desc
  //           }
  //           //console.log("Mumbai Meta:",meta)
  //           itemArray.push(meta)
  //         })
  //       })
  //     })
  //   }})
  //   }})
  //   await new Promise(r => setTimeout(r, 2000));
  //   MumResellNfts(itemArray)
  //   loadMumSaleNFTs();
  // }

  async function loadMumSaleNFTs() {
    const network = rpc
    const key = simpleCrypto.decrypt(cipherEth)
    const provider = new ethers.providers.JsonRpcProvider(network)
    const wallet = new ethers.Wallet(key, provider);
    let marketContract = new ethers.Contract(marketcol, Market, wallet)
    let tokenContract = new ethers.Contract(nftcustom, NFT, wallet)
    const data = await marketContract.getAvailableNft()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      //const fdata = await axios.get(meta.data.image);
      //const ftype = fdata.headers.get('content-type')
      setFileType(meta.data.fileType)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        id: meta.data.id,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        type: meta.data.fileType,
        verified:meta.data.role,
        username:meta.data.username,
        avatar:meta.data.avatar,
        wichNet:meta.data.wichNet
      }
      return item
    }))
    MumsetNfts(items.slice(0,`${count}`))
  }
  async function buyNewMum(nft) {
    setProcess(true)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    let price = ethers.utils.parseUnits(nft.price, 'ether')
    price = price.toString()
    let cosmeta = new ethers.Contract(cri,Token,signer);
    const gasPrice = new ethers.utils.parseUnits('20', 'gwei')
    // await cosmeta.approve(user,price)
    // await cosmeta.approve(nftcustom,price);
    // await cosmeta.approve(marketcol,price);
    const contract = new ethers.Contract(marketcol, Market, signer)
    await cosmeta.increaseAllowance(marketcol, price)//ethers.utils.parseEther(price.toString())
    const transaction = await contract.CosmetaMarketSale(nftcustom, nft.tokenId, {gasPrice:gasPrice,value: price})
    await transaction.wait()
    setProcess(false)
    loadMumSaleNFTs()
  }
  async function loadLiveAuction() {
    let network = rpc
    const key = simpleCrypto.decrypt(cipherMM)
    const provider = new ethers.providers.JsonRpcProvider(network)
    const wallet = new ethers.Wallet(key, provider);
    let auctioncontract = new ethers.Contract(auction, Auction, wallet)
    const data = await auctioncontract.getLiveAuctions()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await auctioncontract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      //const fdata = await axios.get(meta.data.image);
      //const ftype = fdata.headers.get('content-type')
      setFileType(meta.data.fileType)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        id: meta.data.id,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        winner: i.winner,
        sold:i.sold,
        live:i.live,
        biddable:i.biddable,
        bids:i.bids.toNumber(),
        duration:i.duration.toNumber(),
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        type: meta.data.fileType,
        verified:meta.data.role,
        username:meta.data.username,
        avatar:meta.data.avatar,
        wichNet:meta.data.wichNet
      }
      return item
    }))
    MumLiveAuction(items.slice(0,`${count}`))
  }
  async function loadAllAuction() {
    let network = rpc
    const key = simpleCrypto.decrypt(cipherMM)
    const provider = new ethers.providers.JsonRpcProvider(network)
    const wallet = new ethers.Wallet(key, provider);
    let auctioncontract = new ethers.Contract(auction, Auction, wallet)
    const data = await auctioncontract.getAllAuctions()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await auctioncontract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      //const fdata = await axios.get(meta.data.image);
      //const ftype = fdata.headers.get('content-type')
      setFileType(meta.data.fileType)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        id: meta.data.id,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        winner: i.winner,
        sold:i.sold,
        live:i.live,
        biddable:i.biddable,
        bids:i.bids.toNumber(),
        duration:i.duration.toNumber(),
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        type: meta.data.fileType,
        verified:meta.data.role,
        username:meta.data.username,
        avatar:meta.data.avatar,
        wichNet:meta.data.wichNet
      }
      return item
    }))
    MumAllAuction(items.slice(0,`${count}`))
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };
  const CustomLeftArrow = ({ onClick }) => {
    return <button type='button' className="custom-left-arrow p-5 rounded-full bg-slate-50 absolute left-4 shadow-2xl shadow-slate-800 top-52" onClick={() => onClick()}><BsChevronLeft size={22} className="text-slate-900"/></button>;
  };
  const CustomRightArrow = ({ onClick }) => {
    return <button type='button' className="custom-right-arrow p-5 rounded-full bg-slate-50 absolute right-20 shadow-2xl shadow-slate-800 top-52" onClick={() => onClick()}><BsChevronRight size={22} className="text-slate-900"/></button>;
  };

  return (
    <div>
    <Media queries={{
      small: "(max-width: 599px)", // < 600px
      medium: "(min-width: 1024px) and (max-width: 1366px)", // < 1366px
      large: "(min-width: 1400px)" // >= 1400px
    }}>
    {matches => (
      <Fragment>
      {matches.small &&
//********************** SMALL *******************************
      <Fragment>
    {
    }
    {process ?
      <div className='bg-black fixed top-0 left-0 w-screen h-screen z-50 opacity-80'>
      <div className='flex justify-center items-center  p-20'>
      <div className='flex justify-center items-center'>
      <div className='flex-col relative top-60 justify-center items-center'>
      <h1 className='text-5xl font-black w-80'>Please do not leave or close this page!<span className='w-10 h-10 border-tb-2 rounded-full animate-spin'>&nbsp;</span></h1>
      <p className='w-80 text-2xl my-3'>When the metamask signature process is finished,we will direct you to the home page.</p>
      </div>
      </div>
      </div>
      </div>
      : null
    }
    
<div className="w-full flex-col justify-center items-center py-20 welcomebg antialiased overflow-hidden">
    <motion.div
    initial={{opacity:0,y:10}}
    animate={{opacity:1,y:-100}}
    transition={{
      duration:1,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 1280 1080" className='w-[1280px] absolute -top-96' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 780L24.7 782.2C49.3 784.3 98.7 788.7 147.8 763C197 737.3 246 681.7 295.2 645.8C344.3 610 393.7 594 443 586.2C492.3 578.3 541.7 578.7 590.8 615.7C640 652.7 689 726.3 738.2 737.3C787.3 748.3 836.7 696.7 886 657.8C935.3 619 984.7 593 1034 609C1083.3 625 1132.7 683 1181.8 696.3C1231 709.7 1280 678.3 1329.2 676.5C1378.3 674.7 1427.7 702.3 1477 712.2C1526.3 722 1575.7 714 1624.8 699.7C1674 685.3 1723 664.7 1772.2 656.8C1821.3 649 1870.7 654 1895.3 656.5L1920 659" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
    <motion.div
    initial={{y:20,opacity:0}}
    animate={{opacity:1,y:-200}}
    transition={{
      duration: 2,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 1280 1080" className='w-[1280px] absolute -top-96' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 680L17.8 691.7C35.7 703.3 71.3 726.7 106.8 747.7C142.3 768.7 177.7 787.3 213.2 820.7C248.7 854 284.3 902 320 899.5C355.7 897 391.3 844 426.8 811.8C462.3 779.7 497.7 768.3 533.2 771.3C568.7 774.3 604.3 791.7 640 776C675.7 760.3 711.3 711.7 746.8 726C782.3 740.3 817.7 817.7 853.2 832C888.7 846.3 924.3 797.7 960 790.5C995.7 783.3 1031.3 817.7 1066.8 835.8C1102.3 854 1137.7 856 1173.2 871.8C1208.7 887.7 1244.3 917.3 1280 934.5C1315.7 951.7 1351.3 956.3 1386.8 957.7C1422.3 959 1457.7 957 1493.2 946.5C1528.7 936 1564.3 917 1600 873C1635.7 829 1671.3 760 1706.8 754.2C1742.3 748.3 1777.7 805.7 1813.2 819.3C1848.7 833 1884.3 803 1902.2 788L1920 773" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
    <motion.div
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:-300}}
    transition={{
      duration: 3,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 1280 1080" className='w-[1280px] absolute -top-96' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 819L21.3 850.3C42.7 881.7 85.3 944.3 128 976.2C170.7 1008 213.3 1009 256 961.7C298.7 914.3 341.3 818.7 384 794.3C426.7 770 469.3 817 512 841C554.7 865 597.3 866 640 850.2C682.7 834.3 725.3 801.7 768 818.8C810.7 836 853.3 903 896 921.8C938.7 940.7 981.3 911.3 1024 894.2C1066.7 877 1109.3 872 1152 888C1194.7 904 1237.3 941 1280 916.3C1322.7 891.7 1365.3 805.3 1408 757.7C1450.7 710 1493.3 701 1536 738C1578.7 775 1621.3 858 1664 891.5C1706.7 925 1749.3 909 1792 900.8C1834.7 892.7 1877.3 892.3 1898.7 892.2L1920 892" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>

      <div className='justify-center items-center w-full'>

        <div className='flex-col justify-center items-center w-screen h-full p-7'>
        <div className='text-slate-50 font-bold inset-3 px-2 -skew-y-3 bg-gradient-to-tl to-pink-500 from-purple-500 w-full text-[38px]'><div className='justify-center items-center text-center'><span className='relative top-3'>Create and Sell</span><br/><span className='relative left-14 bottom-3'>your NFT</span></div></div>
        <p className='text-slate-50 font-light text-[45px]'>in the Marketplace</p>
        </div>

      </div>
      
      <div className='flex justify-center items-centers'>
      <Container xs css={{marginBottom:'$3'}}>
      <Carousel
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        autoPlay={true}
        centerMode={false}
        className=""
        containerClass="container-padding-bottom"
        dotListClass=""
        draggable={true}
        focusOnSelect={false}
        itemClass=""
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        responsive={responsive}
        ssr={true}
        infinite={true}
        keyBoardControl={true}
        transitionDuration={800}
        removeArrowOnDeviceType={["tablet", "mobile"]}>
        {
          mmnfts.filter(i => i.type == 'value/mp4' || i.type == 'image/png' || i.type == 'image/jpeg' || i.type == 'image/jpg' || i.type == 'audio/mp3' || i.type == 'auido/ogg' || i.type == 'audio/wav' || i.type == 'audio/mpeg').map((nft) => (
              <div key={nft.tokenId} className="mx-2 border-[1px] border-slate-400 h-[442px] justify-center items-center p-1 rounded-xl overflow-hidden object-cover">
              {nft.type == 'video/mp4'
              ? <video src={nft.image} className="w-full h-[250px] bg-transparent" autoPlay muted loop/>
              : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' ? <img src={nft.image} className="w-full h-[296px] rounded-lg object-cover bg-transparent" />
              : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || 'audio/mpeg' ? <AudioPlayer nftname={nft.name} nftid={nft.id} nft={nft.image}/> : null
              }
              <div className='relative top-5 bg-slate-50 px-3 rounded-lg opacity-90 w-full'>
                <div className='flex-col items-center'>
                    <div className='flex-col justify-start items-center py-3'>
                        <h1 className='text-sm font-bold text-slate-800 my-1' key={uid}>{nft.name}</h1>
                        <h1 className='text-sm font-bold text-purple-500 flex items-center gap-x-1 my-1'>{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h1>
                        <div className='flex items-center px-3 rounded-md font-bold text-slate-600 bg-slate-300'>
                        <h1 className='font-bold text-sm flex items-center gap-x-2 my-2 text-slate-500'>{nft.price} CRI<img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></h1>
                        </div>
                    </div>
                </div>
            </div>
              </div>
          ))
        }
        {/*<CustomLeftArrow/><CustomRightArrow />*/}
        </Carousel>
        </Container>
        </div>

      
<div className='flex justify-center items-center'>
  <div className='flex justify-between w-full'>

  {/************* FILTER & CHAINS **********************/}
{openFilter &&
  <div className='bg-slate-900 fixed w-full h-full top-0 left-0 z-[60] overflow-scroll'>
  <div className='flex-col w-full h-full text-slate-400'>

   <div className='flex justify-between items-center my-3 w-full'>
      <div className='px-1'><MdClose size={30} className="cursor-pointer hover:opacity-50" onClick={() => setOpenFilter(false)}/></div>
      <div className='w-full justify-center items-center text-center'><center><ConnectChain/></center></div>
    </div>

   <div className='border-[1px] border-slate-800'></div>
  <div className='flex justify-center'>
    <h1 className='text-lg font-bold my-3'>Filter</h1>
  </div>
<div className='grid gap-y-3'>
  {/* RESET */}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => {setCheckImage(true),setCheckVideo(true),setCheckMusic(true),setLowCheckPrice(false),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false)}}>
  <span className='text-center font-bold antialiased flex justify-center items-center cursor-pointer' onClick={() => {setCheckImage(true),setCheckVideo(true),setCheckMusic(true),setLowCheckPrice(false),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false)}} >All</span>
  </div>
  </div>

  {/* PRICE */}
  <div className='flex-col mx-4'>
    <div className='bg-slate-800 rounded-lg w-full px-3 py-3 cursor-pointer' onClick={() => setOpenPrice(!openPrice)}>
    <div className='flex justify-between items-center w-full'><div className='w-full'><h5 className='justify-center text-center font-bold antialiased items-center'>Price</h5></div><div>{!openPrice ?<MdKeyboardArrowDown size={28}/>:<MdKeyboardArrowUp size={28}/>}</div></div>
    </div>
    {openPrice &&
      <div className='bg-slate-800 flex-col relative bottom-4 py-3 px-3 rounded-lg'>
      <div className='grid flex-col items-center my-3 gap-y-2'>
      <button type='button' className='rounded bg-slate-700 px-3 py-2 w-full flex items-center justify-center gap-x-3' onClick={() => {setLowCheckPrice(!lowprice),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}} >{lowprice ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}Low to High</button>
      <button type='button' className='rounded bg-slate-700 px-3 py-2 w-full flex items-center justify-center gap-x-3' onClick={() => {setHighCheckPrice(!highprice),setLowCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}} >{highprice ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}High to Low</button>
      </div>
      </div>
  }
  </div>

  {/* VERIFY */}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenVerify(!openVerify)}>
    <div className='justify-between items-center w-full flex'><div className='w-full'><h5 className='text-center font-bold antialiased justify-center items-center'>Verify </h5></div><div>{!openVerify ? <MdKeyboardArrowDown size={28}/>:<MdKeyboardArrowUp size={28}/>}</div></div>
  </div>
  {openVerify &&
    <div className='bg-slate-800 rounded-lg relative bottom-4 py-3 px-3'>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setVerifiedArtist(!verifiedartist),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false),setLowCheckPrice(false),setHighCheckPrice(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{verifiedartist ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Verified Artists</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setVerifiedSeller(!verifiedseller),setVerifiedArtist(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false),setLowCheckPrice(false),setHighCheckPrice(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{verifiedseller ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Verified Sellers</h5>
    </div>
    </div>
  }
  </div>

  {/*NETWORK*/}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
    <div className='flex justify-between items-center w-full'><div className='w-full'><h5 className='text-center font-bold antialiased flex justify-center items-center'>Networks</h5></div><div>{!openNetwork ?<MdKeyboardArrowDown size={28} />:<MdKeyboardArrowUp size={28}/>}</div></div>
  </div>
  {openNetwork &&
    <div className='bg-slate-800 relative bottom-4 rounded-lg py-3 px-3'>  
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setEthereum(!eth),setVerifiedArtist(false),setVerifiedSeller(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{eth ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Ethereum</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setPolygon(!poly),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{poly ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Polygon</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setBinance(!bsc),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{bsc ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Binance</h5>
    </div>
    </div>
  }
  </div>

  {/*IMAGE,VIDEO,MUSIC*/}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenNft(!openNft)}>
    <div className='flex justify-between items-center w-full'><div className='w-full'><h5 className='text-center font-bold antialiased justify-center items-center'>NFT's</h5></div><div>{!openNft ?<MdKeyboardArrowDown size={28}/>:<MdKeyboardArrowUp size={28}/>}</div></div>
  </div>
  {openNft &&
    <div className='bg-slate-800 relative bottom-3 py-3 px-3 rounded-lg'>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckImage(!checkImage),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkImage ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Image</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckVideo(!checkVideo),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckImage(false),setCheckMusic(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkVideo ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Video</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckMusic(!checkMusic),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkMusic ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Music</h5>
    </div>
    </div>
  }
  </div>

</div>

</div>
</div>
}
  
  {/***************** NFTs ****************************/}
<div className='flex-col justify-end items-center w-full h-full mb-7'>

<div className='flex justify-center items-center my-10 w-full'>
    <div className='flex-col'>
  
      <div className='flex py-3 w-full bg-gradient-to-t to-slate-900 from-transparent rounded-xl justify-center items-center mt-7 mb-10 gap-x-1'>
        <div className='flex justify-between items-center w-full'>
        <div className='w-12 justify-center items-center flex'><FaFilter size={18} className="cursor-pointer z-30 hover:opacity-50" onClick={() => setOpenFilter(!openFilter)}/></div>
          <div className='w-full justify-center items-center flex'><h3 className='text-slate-400 text-xl'>Latest NFT's</h3></div>
          </div>
      </div>
<div className='grid grid-cols-1 gap-y-2'>
<InfiniteScroll
  className='scroll-m-0 scrollbar-thin scrollbar-track-transparent grid grid-cols-1 gap-y-2'
  dataLength={mumliveauction.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
>
{mumliveauction.slice(0,9).filter(i => i.sold == false && i.live == true).map((nft) => {
  return (
<LiveAuctionNftCard 
    id={nft.id} 
    username={nft.username}
    createdWallet={nft.createdWallet} 
    ownerW={nft.owner} 
    blockchain={nft.blockchain} 
    type={nft.type} 
    img={nft.image} 
    tokenId={nft.tokenId} 
    name={nft.name} 
    desc={nft.description} 
    price={nft.price} 
    key={nft.tokenId}
    seller={nft.seller}
    winner={nft.winner}
    biddablity={nft.biddable}
    sold={nft.sold}
    live={nft.live}
    duration={nft.duration}
    bids={nft.bids}
/>
    )
  })}
</InfiniteScroll>

<InfiniteScroll
  className='scroll-m-0 scrollbar-thin scrollbar-track-transparent grid grid-cols-1 gap-y-2'
  dataLength={mumliveauction.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
>
{mumallauction.slice(0,9).filter(i => i.sold == false && i.biddable == true).map((nft) => {
  return (
<AllAuctionNftCard 
    id={nft.id}
    username={nft.username}
    createdWallet={nft.createdWallet} 
    ownerW={nft.owner} 
    blockchain={nft.blockchain} 
    type={nft.type} 
    img={nft.image} 
    tokenId={nft.tokenId} 
    name={nft.name} 
    desc={nft.description} 
    price={nft.price} 
    key={nft.tokenId}
    seller={nft.seller}
    winner={nft.winner}
    biddablity={nft.biddable}
    sold={nft.sold}
    live={nft.live}
    duration={nft.duration}
    bids={nft.bids}
/>
    )
  })}
</InfiniteScroll>

<InfiniteScroll
  className='scroll-m-0 scrollbar-thin scrollbar-track-transparent grid grid-cols-1 gap-y-2'
  dataLength={mmnfts.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
>
      <div className='container wrapper grid grid-cols-1 gap-y-2 ease-linear transition-all '>
    {verifiedartist ? 
      mmnfts.filter(i => i.verified == "verified").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }
    {verifiedseller ?   
      mmnfts.filter(i => i.verified == "seller").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {bsc ?
      mmnfts.filter(i => i.wichNet == "Binance").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {poly ?
      mmnfts.filter(i => i.wichNet == "Polygon").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {eth ?
      mmnfts.filter(i => i.wichNet == "Ethereum").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {checkVideo ?
      mmnfts.filter(i => i.type == 'video/mp4' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 border-r-slate-700 rounded-xl relative hover:bottom-2 overflow-hidden border-2 ">
        <div className='text-slate-400 cursor-pointer bg-gradient-to-tr to-slate-600 from-slate-900'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        <Link href={`/details/${nft.id}`}><a>{nft.type == 'video/mp4' || nft.type == 'video/mov' ? <video src={nft.image} className="rounded-t-xl object-cover w-full h-[296px]" autoPlay muted loop/> : null
            }</a></Link>
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr z-30 rounded-lg border-[1px] border-slate-700 to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }

    {checkMusic ?
      mmnfts.filter(i => i.type == 'audio/mp3' || i.type == 'audio/wav' || i.type == 'audio/ogg' || i.type == 'audio/mpeg' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 relative hover:bottom-2 border-r-slate-700 rounded-xl overflow-hidden border-2 ">
        <div className='text-slate-400 cursor-pointer bg-gradient-to-tr to-slate-600 from-slate-900'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nftid={nft.id} nft={nft.image} nftname={nft.name} /> : null }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr rounded-lg to-slate-800 z-30 border-[1px] border-slate-700 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
      }

    {checkImage ? 
      mmnfts.filter(i => i.type == 'image/png' || i.type == 'image/jpeg' || i.type == 'image/jpg' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 relative hover:bottom-2 border-2 border-r-slate-700 rounded-xl overflow-hidden ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer '>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        <Link href={`/details/${nft.id}`}><a>{nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /> : null}</a></Link>
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr z-30 border-[1px] border-slate-700 rounded-lg to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
          </div>
        </div>
      ))
      : null
    }

    {lowprice ?
      mmnfts.filter(i => parseFloat(i.price) < 1 ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }

    {highprice ?
      mmnfts.filter(i => parseFloat(i.price) >= 1 ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/> 
            {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }
    {/***************************************** ETHEREUM NFTS ***********************************************************/}
    
    </div>
</InfiniteScroll>

</div>
    </div>
  </div>{/* LATEST NFT's on GOERLI END*/}

</div>

  </div>
</div>{/***** FILTERS & NFTs END *****/}


{/*** BODY END ****/}
</div>
    </Fragment>
//***************** END SMALL *******************************
    }

    {matches.medium &&
//******************** MEDIUM *******************************
      <Fragment>
          {process ?
      <div className='bg-black fixed top-0 left-0 w-screen h-screen z-50 opacity-80'>
      <div className='flex justify-center items-center  p-20'>
      <div className='flex justify-center items-center'>
      <div className='flex-col relative top-60 justify-center items-center'>
      <h1 className='text-5xl font-black w-80'>Please do not leave or close this page!<span className='w-10 h-10 border-tb-2 rounded-full animate-spin'>&nbsp;</span></h1>
      <p className='w-80 text-2xl my-3'>When the metamask signature process is finished,we will direct you to the home page.</p>
      </div>
      </div>
      </div>
      </div>
      : null
    }
    
<div className="w-full py-20 welcomebg antialiased">
    <motion.div
    initial={{y:10,opacity:0}}
    animate={{opacity:1,y:-100}}
    transition={{
      duration:1,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 3000 1080" className='w-[3800px] absolute -top-96' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 780L24.7 782.2C49.3 784.3 98.7 788.7 147.8 763C197 737.3 246 681.7 295.2 645.8C344.3 610 393.7 594 443 586.2C492.3 578.3 541.7 578.7 590.8 615.7C640 652.7 689 726.3 738.2 737.3C787.3 748.3 836.7 696.7 886 657.8C935.3 619 984.7 593 1034 609C1083.3 625 1132.7 683 1181.8 696.3C1231 709.7 1280 678.3 1329.2 676.5C1378.3 674.7 1427.7 702.3 1477 712.2C1526.3 722 1575.7 714 1624.8 699.7C1674 685.3 1723 664.7 1772.2 656.8C1821.3 649 1870.7 654 1895.3 656.5L1920 659" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
    <motion.div
    initial={{
      opacity:0,
      y:20
    }}
    animate={{opacity:1,y:-200}}
    transition={{
      duration: 2,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 3000 1080" className='w-[3800px] absolute -top-80' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 680L17.8 691.7C35.7 703.3 71.3 726.7 106.8 747.7C142.3 768.7 177.7 787.3 213.2 820.7C248.7 854 284.3 902 320 899.5C355.7 897 391.3 844 426.8 811.8C462.3 779.7 497.7 768.3 533.2 771.3C568.7 774.3 604.3 791.7 640 776C675.7 760.3 711.3 711.7 746.8 726C782.3 740.3 817.7 817.7 853.2 832C888.7 846.3 924.3 797.7 960 790.5C995.7 783.3 1031.3 817.7 1066.8 835.8C1102.3 854 1137.7 856 1173.2 871.8C1208.7 887.7 1244.3 917.3 1280 934.5C1315.7 951.7 1351.3 956.3 1386.8 957.7C1422.3 959 1457.7 957 1493.2 946.5C1528.7 936 1564.3 917 1600 873C1635.7 829 1671.3 760 1706.8 754.2C1742.3 748.3 1777.7 805.7 1813.2 819.3C1848.7 833 1884.3 803 1902.2 788L1920 773" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
    <motion.div
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:-300}}
    transition={{
      duration: 3,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 3000 1080" className='w-[3800px] absolute -top-72' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 819L21.3 850.3C42.7 881.7 85.3 944.3 128 976.2C170.7 1008 213.3 1009 256 961.7C298.7 914.3 341.3 818.7 384 794.3C426.7 770 469.3 817 512 841C554.7 865 597.3 866 640 850.2C682.7 834.3 725.3 801.7 768 818.8C810.7 836 853.3 903 896 921.8C938.7 940.7 981.3 911.3 1024 894.2C1066.7 877 1109.3 872 1152 888C1194.7 904 1237.3 941 1280 916.3C1322.7 891.7 1365.3 805.3 1408 757.7C1450.7 710 1493.3 701 1536 738C1578.7 775 1621.3 858 1664 891.5C1706.7 925 1749.3 909 1792 900.8C1834.7 892.7 1877.3 892.3 1898.7 892.2L1920 892" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
      <div className='p-40'>
      <div className='flex justify-between items-center w-full'>
      <div className='flex justify-start items-center w-full'>
      <Container xs css={{marginBottom:'$3'}}>
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={5000}
            autoPlay={true}
            centerMode={false}
            className="overflow-hidden"
            containerClass="container-padding-bottom"
            dotListClass=""
            draggable={true}
            focusOnSelect={false}
            itemClass=""
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={true}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={4000}
            removeArrowOnDeviceType={["tablet", "mobile","desktop"]}>
        <div className="flex-col justify-start items-center w-full px-28">
          <Text  h1 weight="bold" size={100} css={{textGradient: "45deg, $yellow600 -20%, $purple600 50%"}} className="w-[750px] relative">Discover</Text>
          <Text  h1 weight="bold" size={45} css={{textGradient: "45deg, $purple600 20%, $yellow500 50%",}} className="w-[750px] relative bottom-7 left-2">The latest lived Legend</Text>
          <Text  h1 weight="bold" size={165} css={{textGradient: "45deg, $yellow500 20%, $red600 50%"}} className="w-[750px] relative bottom-24">NFTs</Text>
        </div>
        <div className='flex-col justify-start items-center w-full mt-20'>
            <h3 className='text-slate-50 text-5xl font-bold inset-3 -skew-y-3 py-4 my-3 px-4 bg-gradient-to-tl to-pink-500 from-purple-500 w-[535px]'>Create and Sell your NFT</h3>
            <p className='text-slate-50 text-6xl font-light'>in the Marketplace</p>
        </div>
        </Carousel>
        </Container>
      </div>
        <div className='flex justify-end items-center w-full'>
          <Container xs css={{marginBottom:'$3'}}>
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            autoPlay={true}
            centerMode={false}
            className="overflow-hidden"
            containerClass="container-padding-bottom"
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            dotListClass=""
            draggable={true}
            focusOnSelect={false}
            itemClass=""
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={800}
            removeArrowOnDeviceType={["tablet", "mobile"]}>
            {
              mmnfts.filter(i => i.type == 'value/mp4' || i.type == 'image/png' || i.type == 'image/jpeg' || i.type == 'image/jpg' || i.type == 'audio/mp3' || i.type == 'auido/ogg' || i.type == 'audio/wav' || i.type == 'audio/mpeg').map((nft) => (
                  <div key={nft.tokenId}>
                  {nft.type == 'video/mp4'
                  ? <video src={nft.image} className="w-[450px] mt-12 ml-12 bg-transparent" autoPlay muted loop/>
                  : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' ? <img src={nft.image} className="w-[450px] ml-12 bg-transparent" />
                  : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name}/> : null
                  }
                  <div className='relative bottom-10 left-20 bg-slate-50 px-3 rounded-xl opacity-90 w-96 animate-bounce'>
                    <div className='flex justify-between items-center'>
                        <div className='flex-col justify-start items-center p-2'>
                            <h1 className='text-lg font-bold text-slate-800' key={uid}>{nft.name}</h1>
                            <h1 className='text-lg font-bold text-purple-500 flex items-center gap-x-1'>{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h1>
                        </div>
                      <div className='flex justify-end items-center px-3 rounded-md font-bold text-slate-600 bg-slate-300'>
                      <h1 className='font-bold text-lg flex items-center gap-x-2 my-2 text-slate-500'>{nft.price} CRI<img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></h1>

                      </div>
                    </div>
                  </div>
                  </div>
              ))
            }
            <CustomLeftArrow/><CustomRightArrow />
            </Carousel>
            </Container>
            </div>
            </div>
      </div>
<div className='flex justify-center items-center'>
  <div className='flex justify-between w-full'>

  {/************* FILTER & CHAINS **********************/}
  <div className='flex-col mx-3 mt-16 w-[350px] h-screen text-slate-400 bg-slate-900 rounded-xl border-2 border-slate-800'>

   <div className='flex justify-center items-center my-3 relative left-10'>
      <ConnectChain/>
    </div>

   <div className='border-[1px] border-slate-800'></div>
  <div className='flex justify-center'>
    <h1 className='text-lg font-bold my-3'>Filter</h1>
  </div>
<div className='grid gap-y-3'>
  {/* RESET */}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => {setCheckImage(true),setCheckVideo(true),setCheckMusic(true),setLowCheckPrice(false),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false)}}>
  <span className='text-center font-bold antialiased flex justify-center items-center cursor-pointer' onClick={() => {setCheckImage(true),setCheckVideo(true),setCheckMusic(true),setLowCheckPrice(false),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false)}} >All</span>
  </div>
  </div>

  {/* PRICE */}
  <div className='flex-col mx-4'>
    <div className='bg-slate-800 rounded-lg w-full px-3 py-3 cursor-pointer' onClick={() => setOpenPrice(!openPrice)}>
    <h5 className='text-center font-bold antialiased flex justify-center items-center'>Price {!openPrice ?<MdKeyboardArrowDown size={28} className="relative left-[85px]"/>:<MdKeyboardArrowUp size={28} className="relative left-[85px]"/>}</h5>
    </div>
    {openPrice &&
      <div className='bg-slate-800 flex-col relative bottom-4 py-3 px-3 rounded-lg'>
      <div className='grid flex-col items-center my-3 gap-y-2'>
      <button type='button' className='rounded bg-slate-700 px-3 py-2 w-full flex items-center justify-center gap-x-3' onClick={() => {setLowCheckPrice(!lowprice),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}} >{lowprice ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}Low to High</button>
      <button type='button' className='rounded bg-slate-700 px-3 py-2 w-full flex items-center justify-center gap-x-3' onClick={() => {setHighCheckPrice(!highprice),setLowCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}} >{highprice ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}High to Low</button>
      </div>
      </div>
  }
  </div>

  {/* VERIFY */}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenVerify(!openVerify)}>
  <h5 className='text-center font-bold antialiased flex justify-center items-center'>Verify {!openVerify ?<MdKeyboardArrowDown size={28} className="relative left-20"/>:<MdKeyboardArrowUp size={28} className="relative left-20"/>}</h5>
  </div>
  {openVerify &&
    <div className='bg-slate-800 rounded-lg relative bottom-4 py-3 px-3'>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setVerifiedArtist(!verifiedartist),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false),setLowCheckPrice(false),setHighCheckPrice(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{verifiedartist ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Verified Artists</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setVerifiedSeller(!verifiedseller),setVerifiedArtist(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false),setLowCheckPrice(false),setHighCheckPrice(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{verifiedseller ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Verified Sellers</h5>
    </div>
    </div>
  }
  </div>

  {/*NETWORK*/}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
  <h5 className='text-center font-bold antialiased flex justify-center items-center'>Networks {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative left-[65px]"/>:<MdKeyboardArrowUp size={28} className="relative left-[65px]"/>}</h5>
  </div>
  {openNetwork &&
    <div className='bg-slate-800 relative bottom-4 rounded-lg py-3 px-3'>  
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setEthereum(!eth),setVerifiedArtist(false),setVerifiedSeller(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{eth ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Ethereum</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setPolygon(!poly),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{poly ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Polygon</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setBinance(!bsc),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{bsc ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Binance</h5>
    </div>
    </div>
  }
  </div>

  {/*IMAGE,VIDEO,MUSIC*/}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenNft(!openNft)}>
  <h5 className='text-center font-bold antialiased flex justify-center items-center'>NFT's {!openNft ?<MdKeyboardArrowDown size={28} className="relative left-20"/>:<MdKeyboardArrowUp size={28} className="relative left-20"/>}</h5>
  </div>
  {openNft &&
    <div className='bg-slate-800 relative bottom-3 py-3 px-3 rounded-lg'>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckImage(!checkImage),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkImage ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Image</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckVideo(!checkVideo),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckImage(false),setCheckMusic(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkVideo ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Video</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckMusic(!checkMusic),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkMusic ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Music</h5>
    </div>
    </div>
  }
  </div>

</div>
  </div>
  
  {/***************** NFTs ****************************/}
<div className='flex-col justify-end items-center w-full'>

<div className='flex justify-center items-center my-10'>
    <div className='flex-col'>
  
      <div className='flex py-3 px-10 bg-gradient-to-t to-slate-900 from-transparent rounded-xl justify-center items-center mt-7 mb-10 gap-x-1'>
        <h3 className='text-slate-400 text-xl'>Latest NFT's</h3>
      </div>

<InfiniteScroll
  className='scroll-m-0 scrollbar-thin scrollbar-track-transparent'
  dataLength={mumliveauction.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
>
{mumliveauction.slice(0,9).filter(i => i.sold == false && i.live == true).map((nft) => {
  return (
<LiveAuctionNftCard 
    id={nft.id} 
    username={nft.username}
    createdWallet={nft.createdWallet} 
    ownerW={nft.owner} 
    blockchain={nft.blockchain} 
    type={nft.type} 
    img={nft.image} 
    tokenId={nft.tokenId} 
    name={nft.name} 
    desc={nft.description} 
    price={nft.price} 
    key={nft.tokenId}
    seller={nft.seller}
    winner={nft.winner}
    biddablity={nft.biddable}
    sold={nft.sold}
    live={nft.live}
    duration={nft.duration}
    bids={nft.bids}
/>
    )
  })}
</InfiniteScroll>
    
<InfiniteScroll
  className='scroll-m-0 scrollbar-thin scrollbar-track-transparent'
  dataLength={mumliveauction.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
>
{mumallauction.slice(0,9).filter(i => i.sold == false && i.biddable == true).map((nft) => {
  return (
<AllAuctionNftCard 
    id={nft.id}
    username={nft.username}
    createdWallet={nft.createdWallet} 
    ownerW={nft.owner} 
    blockchain={nft.blockchain} 
    type={nft.type} 
    img={nft.image} 
    tokenId={nft.tokenId} 
    name={nft.name} 
    desc={nft.description} 
    price={nft.price} 
    key={nft.tokenId}
    seller={nft.seller}
    winner={nft.winner}
    biddablity={nft.biddable}
    sold={nft.sold}
    live={nft.live}
    duration={nft.duration}
    bids={nft.bids}
/>
    )
  })}
</InfiniteScroll>

<InfiniteScroll
  className=''
  dataLength={mmnfts.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
  >
<div className='container wrapper my-2 mx-2 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 ease-linear transition-all '>
    {verifiedartist ? 
      mmnfts.filter(i => i.verified == "verified").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }
    {verifiedseller ?   
      mmnfts.filter(i => i.verified == "seller").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {bsc ?
      mmnfts.filter(i => i.wichNet == "Binance").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {poly ?
      mmnfts.filter(i => i.wichNet == "Polygon").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {eth ?
      mmnfts.filter(i => i.wichNet == "Ethereum").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {checkVideo ?
      mmnfts.filter(i => i.type == 'video/mp4' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 border-r-slate-700 rounded-xl relative hover:bottom-2 overflow-hidden border-2 ">
        <div className='text-slate-400 cursor-pointer bg-gradient-to-tr to-slate-600 from-slate-900'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        <Link href={`/details/${nft.id}`}><a>{nft.type == 'video/mp4' || nft.type == 'video/mov' ? <video src={nft.image} className="rounded-t-xl object-cover w-full h-[296px]" autoPlay muted loop/> : null
            }</a></Link>
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr z-30 rounded-lg border-[1px] border-slate-700 to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }

    {checkMusic ?
      mmnfts.filter(i => i.type == 'audio/mp3' || i.type == 'audio/wav' || i.type == 'audio/ogg' || i.type == 'audio/mpeg' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 relative hover:bottom-2 border-r-slate-700 rounded-xl overflow-hidden border-2 ">
        <div className='text-slate-400 cursor-pointer bg-gradient-to-tr to-slate-600 from-slate-900'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nftid={nft.id} nft={nft.image} nftname={nft.name} /> : null }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr rounded-lg to-slate-800 z-30 border-[1px] border-slate-700 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
      }

    {checkImage ? 
      mmnfts.filter(i => i.type == 'image/png' || i.type == 'image/jpeg' || i.type == 'image/jpg' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 relative hover:bottom-2 border-2 border-r-slate-700 rounded-xl overflow-hidden ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer '>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        <Link href={`/details/${nft.id}`}><a>{nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /> : null}</a></Link>
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr z-30 border-[1px] border-slate-700 rounded-lg to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
          </div>
        </div>
      ))
      : null
    }

    {lowprice ?
      mmnfts.filter(i => parseFloat(i.price) < 1 ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }

    {highprice ?
      mmnfts.filter(i => parseFloat(i.price) >= 1 ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/> 
            {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }
    {/***************************************** ETHEREUM NFTS ***********************************************************/}
    
    </div>
</InfiniteScroll>

    </div>
  </div>

</div>

  </div>
</div>{/***** FILTERS & NFTs END *****/}


{/*** BODY END ****/}
</div>
      </Fragment>
//***************** END MEDIUM ******************************
    }

    {matches.large &&
//******************** MEDIUM *******************************
      <Fragment>
          {process ?
      <div className='bg-black fixed top-0 left-0 w-screen h-screen z-50 opacity-80'>
      <div className='flex justify-center items-center  p-20'>
      <div className='flex justify-center items-center'>
      <div className='flex-col relative top-60 justify-center items-center'>
      <h1 className='text-5xl font-black w-80'>Please do not leave or close this page!<span className='w-10 h-10 border-tb-2 rounded-full animate-spin'>&nbsp;</span></h1>
      <p className='w-80 text-2xl my-3'>When the metamask signature process is finished,we will direct you to the home page.</p>
      </div>
      </div>
      </div>
      </div>
      : null
    }
    
<div className="w-full py-20 welcomebg antialiased">
<div className='z-10'>
    <motion.div
    initial={{y:10,opacity:0}}
    animate={{opacity:1,y:-100}}
    transition={{
      duration:1,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 3000 1080" className='w-[3800px] absolute -top-96' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 780L24.7 782.2C49.3 784.3 98.7 788.7 147.8 763C197 737.3 246 681.7 295.2 645.8C344.3 610 393.7 594 443 586.2C492.3 578.3 541.7 578.7 590.8 615.7C640 652.7 689 726.3 738.2 737.3C787.3 748.3 836.7 696.7 886 657.8C935.3 619 984.7 593 1034 609C1083.3 625 1132.7 683 1181.8 696.3C1231 709.7 1280 678.3 1329.2 676.5C1378.3 674.7 1427.7 702.3 1477 712.2C1526.3 722 1575.7 714 1624.8 699.7C1674 685.3 1723 664.7 1772.2 656.8C1821.3 649 1870.7 654 1895.3 656.5L1920 659" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
    <motion.div
    initial={{
      opacity:0,
      y:20
    }}
    animate={{opacity:1,y:-200}}
    transition={{
      duration: 2,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 3000 1080" className='w-[3800px] absolute -top-80' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 680L17.8 691.7C35.7 703.3 71.3 726.7 106.8 747.7C142.3 768.7 177.7 787.3 213.2 820.7C248.7 854 284.3 902 320 899.5C355.7 897 391.3 844 426.8 811.8C462.3 779.7 497.7 768.3 533.2 771.3C568.7 774.3 604.3 791.7 640 776C675.7 760.3 711.3 711.7 746.8 726C782.3 740.3 817.7 817.7 853.2 832C888.7 846.3 924.3 797.7 960 790.5C995.7 783.3 1031.3 817.7 1066.8 835.8C1102.3 854 1137.7 856 1173.2 871.8C1208.7 887.7 1244.3 917.3 1280 934.5C1315.7 951.7 1351.3 956.3 1386.8 957.7C1422.3 959 1457.7 957 1493.2 946.5C1528.7 936 1564.3 917 1600 873C1635.7 829 1671.3 760 1706.8 754.2C1742.3 748.3 1777.7 805.7 1813.2 819.3C1848.7 833 1884.3 803 1902.2 788L1920 773" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
    <motion.div
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:-300}}
    transition={{
      duration: 3,
      ease:'easeInOut',
      repeat:Infinity
    }}
    >
    <svg id="visual" viewBox="0 0 3000 1080" className='w-[3800px] absolute -top-72' xmlnssvg="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 819L21.3 850.3C42.7 881.7 85.3 944.3 128 976.2C170.7 1008 213.3 1009 256 961.7C298.7 914.3 341.3 818.7 384 794.3C426.7 770 469.3 817 512 841C554.7 865 597.3 866 640 850.2C682.7 834.3 725.3 801.7 768 818.8C810.7 836 853.3 903 896 921.8C938.7 940.7 981.3 911.3 1024 894.2C1066.7 877 1109.3 872 1152 888C1194.7 904 1237.3 941 1280 916.3C1322.7 891.7 1365.3 805.3 1408 757.7C1450.7 710 1493.3 701 1536 738C1578.7 775 1621.3 858 1664 891.5C1706.7 925 1749.3 909 1792 900.8C1834.7 892.7 1877.3 892.3 1898.7 892.2L1920 892" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="miter"></path></svg>
    </motion.div>
</div>
      <div className='p-40'>
      <div className='flex justify-between items-center w-full'>
      <div className='flex justify-start items-center w-full'>
      <Container xs css={{marginBottom:'$3'}}>
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={5000}
            autoPlay={true}
            centerMode={false}
            className="overflow-hidden"
            containerClass="container-padding-bottom"
            dotListClass=""
            draggable={true}
            focusOnSelect={false}
            itemClass=""
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={true}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={4000}
            removeArrowOnDeviceType={["tablet", "mobile","desktop"]}>
        <div className="flex-col justify-start items-center w-full px-28">
          <Text  h1 weight="bold" size={100} css={{textGradient: "45deg, $yellow600 -20%, $purple600 50%"}} className="w-[750px] relative">Discover</Text>
          <Text  h1 weight="bold" size={45} css={{textGradient: "45deg, $purple600 20%, $yellow500 50%",}} className="w-[750px] relative bottom-7 left-2">The latest lived Legend</Text>
          <Text  h1 weight="bold" size={165} css={{textGradient: "45deg, $yellow500 20%, $red600 50%"}} className="w-[750px] relative bottom-24">NFTs</Text>
        </div>
        <div className='flex-col justify-start items-center w-full mt-20'>
            <h3 className='text-slate-50 text-5xl font-bold inset-3 -skew-y-3 py-4 my-3 px-4 bg-gradient-to-tl to-pink-500 from-purple-500 w-[535px]'>Create and Sell your NFT</h3>
            <p className='text-slate-50 text-6xl font-light'>in the Marketplace</p>
        </div>
        </Carousel>
        </Container>
      </div>
        <div className='flex justify-end items-center w-full'>
          <Container xs css={{marginBottom:'$3'}}>
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            autoPlay={true}
            centerMode={false}
            className="overflow-hidden"
            containerClass="container-padding-bottom"
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            dotListClass=""
            draggable={true}
            focusOnSelect={false}
            itemClass=""
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={800}
            removeArrowOnDeviceType={["tablet", "mobile"]}>
            {mumliveauction.filter(i => i.type == 'value/mp4' || i.type == 'image/png' || i.type == 'image/jpeg' || i.type == 'image/jpg' || i.type == 'audio/mp3' || i.type == 'auido/ogg' || i.type == 'audio/wav' || i.type == 'audio/mpeg' && i.biddable == false && i.sold == false).map((nft) => {
              
              return (
              <div key={nft.tokenId}>
              {nft.type == 'video/mp4'
              ? <video src={nft.image} className="w-[450px] mt-12 ml-12 bg-transparent" autoPlay muted loop/>
              : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' ? <img src={nft.image} className="w-[450px] ml-12 bg-transparent" />
              : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name}/> : null
              }
              <div className='relative bottom-24 left-20 bg-slate-50 px-3 pb-3 rounded-xl opacity-90 w-96'>
                <div className='flex justify-between items-center'>
                    <div className='flex-col justify-start items-center p-2'>
                        <h1 className='text-lg font-bold text-slate-800' key={uid}>{nft.name}</h1>
                        <h1 className='text-lg font-bold text-purple-500 flex items-center gap-x-1'>{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h1>
                    </div>
                  <div onMouseOver={() => setHoverBid(true)} onMouseOut={() => setHoverBid(false)} className={hoverBid ? 'flex cursor-pointer bg-gradient-to-tr to-yellow-500 from-orange-600 text-center justify-center items-center px-7 rounded-md font-bold text-slate-600 w-28' : 'flex justify-end items-center px-3 rounded-md font-bold text-slate-600 bg-slate-300 w-38'}>
                    <h1 className={hoverBid ? 'font-bold text-lg flex text-center justify-center items-center my-2 text-slate-500 text-slate-50 px-12' : 'font-bold text-lg flex items-center gap-x-2 my-2 text-slate-500'}>{hoverBid ? "Bid" : nft.price} {hoverBid ? null : "CRI"}{hoverBid ? null : <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' />}</h1>
                  </div>
                  </div>
                  <div className='flex justify-between items-center w-full gap-x-2'>
                    <CountdownWhite timestamp={nft.duration + '000'}/><span className='bg-red-600 font-bold px-5 py-1 flex justify-center items-center rounded-md animate-pulse'>LIVE</span>
                  </div>
                </div>
              </div>
                )}
              )}
            <CustomLeftArrow/><CustomRightArrow />
            </Carousel>
            </Container>
            </div>
            </div>
      </div>
<div className='flex justify-center items-center'>
  <div className='flex justify-between w-full'>

  {/************* FILTER & CHAINS **********************/}
  <div className='flex-col mx-3 mt-16 mb-60 w-[350px] h-screen text-slate-400 bg-slate-900 rounded-xl border-2 border-slate-800'>

   <div className='flex justify-center items-center my-3 relative left-10'>
      <ConnectChain/>
    </div>

   <div className='border-[1px] border-slate-800'></div>
  <div className='flex justify-center'>
    <h1 className='text-lg font-bold my-3'>Filter</h1>
  </div>
<div className='grid gap-y-3'>
  {/* RESET */}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => {setCheckImage(true),setCheckVideo(true),setCheckMusic(true),setLowCheckPrice(false),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false)}}>
  <span className='text-center font-bold antialiased flex justify-center items-center cursor-pointer' onClick={() => {setCheckImage(true),setCheckVideo(true),setCheckMusic(true),setLowCheckPrice(false),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false)}} >All</span>
  </div>
  </div>

  {/* PRICE */}
  <div className='flex-col mx-4'>
    <div className='bg-slate-800 rounded-lg w-full px-3 py-3 cursor-pointer' onClick={() => setOpenPrice(!openPrice)}>
    <h5 className='text-center font-bold antialiased flex justify-center items-center'>Price {!openPrice ?<MdKeyboardArrowDown size={28} className="relative left-[85px]"/>:<MdKeyboardArrowUp size={28} className="relative left-[85px]"/>}</h5>
    </div>
    {openPrice &&
      <div className='bg-slate-800 flex-col relative bottom-4 py-3 px-3 rounded-lg'>
      <div className='grid flex-col items-center my-3 gap-y-2'>
      <button type='button' className='rounded bg-slate-700 px-3 py-2 w-full flex items-center justify-center gap-x-3' onClick={() => {setLowCheckPrice(!lowprice),setHighCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}} >{lowprice ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}Low to High</button>
      <button type='button' className='rounded bg-slate-700 px-3 py-2 w-full flex items-center justify-center gap-x-3' onClick={() => {setHighCheckPrice(!highprice),setLowCheckPrice(false),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}} >{highprice ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}High to Low</button>
      </div>
      </div>
  }
  </div>

  {/* VERIFY */}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenVerify(!openVerify)}>
  <h5 className='text-center font-bold antialiased flex justify-center items-center'>Verify {!openVerify ?<MdKeyboardArrowDown size={28} className="relative left-20"/>:<MdKeyboardArrowUp size={28} className="relative left-20"/>}</h5>
  </div>
  {openVerify &&
    <div className='bg-slate-800 rounded-lg relative bottom-4 py-3 px-3'>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setVerifiedArtist(!verifiedartist),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false),setLowCheckPrice(false),setHighCheckPrice(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{verifiedartist ? <AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Verified Artists</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setVerifiedSeller(!verifiedseller),setVerifiedArtist(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false),setLowCheckPrice(false),setHighCheckPrice(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{verifiedseller ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Verified Sellers</h5>
    </div>
    </div>
  }
  </div>

  {/*NETWORK*/}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
  <h5 className='text-center font-bold antialiased flex justify-center items-center'>Networks {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative left-[65px]"/>:<MdKeyboardArrowUp size={28} className="relative left-[65px]"/>}</h5>
  </div>
  {openNetwork &&
    <div className='bg-slate-800 relative bottom-4 rounded-lg py-3 px-3'>  
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setEthereum(!eth),setVerifiedArtist(false),setVerifiedSeller(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{eth ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Ethereum</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setPolygon(!poly),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setBinance(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{poly ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Polygon</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setBinance(!bsc),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setCheckVideo(false),setCheckMusic(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{bsc ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Binance</h5>
    </div>
    </div>
  }
  </div>

  {/*IMAGE,VIDEO,MUSIC*/}
  <div className='flex-col mx-4'>
  <div className='bg-slate-800 rounded-lg w-full py-3 px-3 cursor-pointer' onClick={() => setOpenNft(!openNft)}>
  <h5 className='text-center font-bold antialiased flex justify-center items-center'>NFT's {!openNft ?<MdKeyboardArrowDown size={28} className="relative left-20"/>:<MdKeyboardArrowUp size={28} className="relative left-20"/>}</h5>
  </div>
  {openNft &&
    <div className='bg-slate-800 relative bottom-3 py-3 px-3 rounded-lg'>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckImage(!checkImage),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckMusic(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkImage ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Image</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckVideo(!checkVideo),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckImage(false),setCheckMusic(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkVideo ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Video</h5>
    </div>
    <div className='flex items-center gap-x-2 my-2 mx-2 cursor-pointer' onClick={() => {setCheckMusic(!checkMusic),setVerifiedArtist(false),setVerifiedSeller(false),setEthereum(false),setPolygon(false),setBinance(false),setCheckVideo(false),setCheckImage(false)}}>
    <div className='flex items-center justify-center gap-x-2'>{checkMusic ?<AiFillCheckCircle size={18} className="text-blue-500"/>:<MdRadioButtonUnchecked size={18}/>}</div><h5>Music</h5>
    </div>
    </div>
  }
  </div>

</div>
  </div>
  
  {/***************** NFTs ****************************/}
<div className='flex-col justify-end items-center w-full'>

<div className='flex justify-center items-center my-10'>
    <div className='flex-col'>
  
      <div className='flex py-3 px-10 bg-gradient-to-t to-slate-900 from-transparent rounded-xl justify-center items-center mt-7 mb-10 gap-x-1'>
        <div className='flex justify-center items-center gap-x-5 z-[998]'>
          <h3 className={lanft ? 'text-blue-500 border-b-2 border-blue-500 text-xl p-1 cursor-pointer':'p-1 text-slate-400 text-xl cursor-pointer hover:border-b-2 hover:border-slate-400'} onClick={() => {setLaNft(true),setLaAuc(false)}}>Latest NFT's</h3><span className='text-3xl font-thin text-slate-400'>|</span><h3 className={laauc ? 'text-blue-500 text-xl border-b-2 border-blue-500 p-1 cursor-pointer':'p-1 text-slate-400 text-xl cursor-pointer hover:border-b-2 hover:border-slate-400'} onClick={() => {setLaAuc(true),setLaNft(false)}}>Latest Auctions</h3>
        </div>
      </div>
{laauc ? (
<div className='pb-60'>
  
<InfiniteScroll
  className='scroll-m-0 scrollbar-thin scrollbar-track-transparent grid grid-cols-5 gap-4'
  dataLength={mumliveauction.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
>
{mumallauction.slice(0,9).filter(i => i.sold == false && i.biddable == true).map((nft) => {
  return (
<AllAuctionNftCard 
    id={nft.id}
    username={nft.username}
    createdWallet={nft.createdWallet} 
    ownerW={nft.owner} 
    blockchain={nft.blockchain} 
    type={nft.type} 
    img={nft.image} 
    tokenId={nft.tokenId} 
    name={nft.name} 
    desc={nft.description} 
    price={nft.price} 
    key={nft.tokenId}
    seller={nft.seller}
    winner={nft.winner}
    biddablity={nft.biddable}
    sold={nft.sold}
    live={nft.live}
    duration={nft.duration}
    bids={nft.bids}
/>
    )
  })}
</InfiniteScroll>

</div>
) : null}

{lanft ? (
<div className='pb-60'>
<InfiniteScroll
  className=''
  dataLength={mmnfts.length} //This is important field to render the next data
  next={() => setCount(count + 5)}
  hasMore={true}
  loader={<Loading/>}
  endMessage={
    <p className='my-5 text-xl font-thin text-center'>
    <b>You have seen it all</b>
    </p>
  }
  >
  <div className='container wrapper my-2 ease-linear transition-all grid grid-cols-5 gap-4'>
    {verifiedartist ? 
      mmnfts.filter(i => i.verified == "verified").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }
    {verifiedseller ?   
      mmnfts.filter(i => i.verified == "seller").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {bsc ?
      mmnfts.filter(i => i.wichNet == "Binance").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {poly ?
      mmnfts.filter(i => i.wichNet == "Polygon").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {eth ?
      mmnfts.filter(i => i.wichNet == "Ethereum").map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
   }

    {checkVideo ?
      mmnfts.filter(i => i.type == 'video/mp4' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 border-r-slate-700 rounded-xl relative hover:bottom-2 overflow-hidden border-2 ">
        <div className='text-slate-400 cursor-pointer bg-gradient-to-tr to-slate-600 from-slate-900'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        <Link href={`/details/${nft.id}`}><a>{nft.type == 'video/mp4' || nft.type == 'video/mov' ? <video src={nft.image} className="rounded-t-xl object-cover w-full h-[296px]" autoPlay muted loop/> : null
            }</a></Link>
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr z-30 rounded-lg border-[1px] border-slate-700 to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }

    {checkMusic ?
      mmnfts.filter(i => i.type == 'audio/mp3' || i.type == 'audio/wav' || i.type == 'audio/ogg' || i.type == 'audio/mpeg' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 relative hover:bottom-2 border-r-slate-700 rounded-xl overflow-hidden border-2 ">
        <div className='text-slate-400 cursor-pointer bg-gradient-to-tr to-slate-600 from-slate-900'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nftid={nft.id} nft={nft.image} nftname={nft.name} /> : null }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr rounded-lg to-slate-800 z-30 border-[1px] border-slate-700 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
      }

    {checkImage ? 
      mmnfts.filter(i => i.type == 'image/png' || i.type == 'image/jpeg' || i.type == 'image/jpg' ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] border-slate-800 relative hover:bottom-2 border-2 border-r-slate-700 rounded-xl overflow-hidden ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer '>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        <Link href={`/details/${nft.id}`}><a>{nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /> : null}</a></Link>
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
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
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr z-30 border-[1px] border-slate-700 rounded-lg to-slate-800 from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-12 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
          </div>
        </div>
      ))
      : null
    }

    {lowprice ?
      mmnfts.filter(i => parseFloat(i.price) < 1 ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
        {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }

    {highprice ?
      mmnfts.filter(i => parseFloat(i.price) >= 1 ).map((nft) => (
        <div key={nft.tokenId} className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2 ">
        <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
        <img src={nft.wichNet == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : nft.wichNet == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : nft.wichNet == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/> 
            {nft.type == 'video/mp4' || nft.type == 'video/mov'
            ? <Link href={`/details/${nft.id}`}><a><video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/></a></Link>
            : nft.type == 'image/png' || nft.type == 'image/jpeg' || nft.type == 'image/jpg' || nft.type == 'image/webp' ? <Link href={`/details/${nft.id}`}><a><img className='rounded-t-xl object-cover w-full h-[296px]' src={nft.image} /></a></Link>
            : nft.type == 'audio/mp3' || nft.type == 'audio/wav' || nft.type == 'audio/ogg' || nft.type == 'audio/mpeg' ? <AudioPlayer nft={nft.image} nftname={nft.name} nftid={nft.id}/> : null
            }
            <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                          
                  <div className="flex justify-between items-center w-full">
                  <div className='justify-start items-center'>
                    <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{nft.avatar ? <img src={nft.avatar} className="rounded-full w-3 mr-1"/>:null}{!nft.username == "" ? nft.username : user.slice(0,11) + '...'} {nft.verified == 'verified' ? <MdVerified size={18}/>: null}</h3>
                  </div>
                  </div>
                  <div className='flex justify-end items-center w-full'>
                  <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : {nft.tokenId}</h3>
                  </div>
                  
                  </div>
                  <div>
                  <h1 className='font-medium text-lg'>{nft.name}</h1>
                  </div>
                  <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                  <div className='w-full '>
                  <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{nft.price}</h1>
                  </div>
                  <div className='px-3'>
                    <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                  </div>
                    </div>
                  </div>
                  <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                  <div className='w-full'>
                  <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white' onClick={() => buyNewMum(nft)}>Buy</button>
                  </div>
                  </div>
                  </div>
        </div>
      ))
      : null
    }
    {/***************************************** ETHEREUM NFTS ***********************************************************/}
    
    </div>
</InfiniteScroll>
</div>
) : null}
    </div>
  </div>

</div>

  </div>
</div>{/***** FILTERS & NFTs END *****/}


{/*** BODY END ****/}
</div>
      </Fragment>
//***************** END MEDIUM ******************************
    }
    </Fragment>
)}
</Media>
</div>

  )
}

export default Home;