/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React,{useState,useEffect,useContext, Fragment} from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from "web3modal";
import NFT from '../engine/NFT.json';
import Auction from '../engine/Auction.json';
import Market from '../engine/Market.json';
import Token from '../engine/Token.json';
import { hhnft, hhmarket,hhtoken } from '../engine/configuration';
//import { mmnft, mmmarket,mmtoken } from '../engine/configuration';
//import { goenft, goemarket,goetoken } from '../engine/configuration';
//import { bsctnft, bsctmarket,bsctoken } from '../engine/configuration';
import { Button, Input } from '@nextui-org/react';
import { client } from '../engine/configuration';
import { useStateContext } from '../context/StateContext';
import detectEthereumProvider from '@metamask/detect-provider';
import {MdKeyboardArrowDown,MdKeyboardArrowUp,MdVerified} from 'react-icons/md'
import jwt from 'jsonwebtoken'
import { DataContext } from '../store/GlobalState';
import uniqid from 'uniqid';
import logo from '../public/logo.png';
import {AiFillPlayCircle,AiFillBackward,AiFillForward,AiFillPauseCircle} from 'react-icons/ai'
import styles from '../styles/AudioPlayer.module.css'
import { AudioPlayer } from '../components';
import Media from 'react-media';


 const CreateMarket = () => {
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
      auction,
      getAuction,
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
      owners,setOwners
    } = useStateContext();
    const [fileUrl, setFileUrl] = useState(null)
    //const [nftcontract, getNft] = useState([])
    //const [cri,setTokenCri] = useState([])
    //const [market, getMarket] = useState([])
    const [fileType,setFileType] = useState(null);
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '',website:'' })
    const [loading,setLoading] = useState(false);
    const [openNetwork,setOpenNetwork] = useState(false);
    const [activeEth,setEth] = useState(false);
    const [activeMtc,setMtc] = useState(false);
    const [activeBsc,setBsc] = useState(false);
    const [wichNet,setNet] = useState("");
    const [process,setProcess] = useState(false);
    const [detoken,setToken] = useState(null);
    const [openPreview,setOpenPreview] = useState(false)
    const [openAuction,setOpenAuction] = useState(false)
    const [openNFT,setOpenNft] = useState(true)
    const [uid,setUid] = useState(null);
    const {state,dispatch} = useContext(DataContext)
    const {auth} = state

    const router = useRouter();

    useEffect(() => {
      // window.addEventListener('load', async () => {
      //   try {
      //              await ethereum.enable();
      //          } catch (error) {}
      //   });
      connectUser()
      setNftResell()
      setNftCustom()
      setTokenCol()
      setNftCol()
      setMarket()
      setRpc()
      setUid(uniqid())

      const token = localStorage.getItem('token')
      if(token){
        const usertoken = jwt.decode(token)
        console.log("User Token",usertoken)
        setToken(usertoken.email)
        if(!usertoken){
          localStorage.removeItem('token')
          router.push('/login')
        }
      }
      //setTokenCol();
    },[getUser,
      //getMarket,
      //getNft, 
      //setTokenCol
    ])


    const subdomain = "https://cosmeta.infura-ipfs.io";

    async function onChange(e) {
        setLoading(true);
        setFileType(e.target.files[0].type);
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `${subdomain}/ipfs/${added.path}`;
            setFileUrl(url)
        } catch (error) {
            //console.log('Error uploading file: ', error)
        }
        setLoading(false);
    }

    async function createMarket() {
        setProcess(true);
        const { name, description, price,website } = formInput
        if (!name || !description || !price || !fileUrl) return
        const data = JSON.stringify({
            id:uid, createdWallet:user, name, description, image: fileUrl, price:price, fileType , wichNet ,website, username:auth.user.username,avatar:auth.user.avatar,role:auth.user.role,
        })
        try {
            const added = await client.add(data)
            const url = `${subdomain}/ipfs/${added.path}`;
            
            //console.log(datas);
            createNFT(url)
        } catch (error) {
            setProcess(false)
        }
    }

    async function createAuctionMarket() {
      setProcess(true);
      const { name, description, price,website } = formInput
      if (!name || !description || !price || !fileUrl) return
      const data = JSON.stringify({
          id:uid, createdWallet:user, name, description, image: fileUrl, price:price, fileType , wichNet ,website, username:auth.user.username,avatar:auth.user.avatar,role:auth.user.role,
      })
      try {
          const added = await client.add(data)
          const url = `${subdomain}/ipfs/${added.path}`;
          
          //console.log(datas);
          createAuctionNFT(url)
      } catch (error) {
          setProcess(false)
      }
    }

    // async function setTokenCol(){
    //   var hh = "0x7a69";
    //   var goe = "0x5";
    //   var mm = "0x13881";
    //   var bsct = "0x61";
    //   const connected = await detectEthereumProvider();
    //   if (connected.chainId == hh) {
    //     var cri = hhtoken
    //   }
    //   else if (connected.chainId == goe) {
    //     var cri = goetoken
    //   }
    //   else if (connected.chainId == mm) {
    //     var cri = mmtoken
    //   }
    //   else if (connected.chainId == bsct) {
    //     var cri = bsctoken
    //   }
    //   setTokenCri(cri);
    //   //console.log(mainnet)
    //   setNft();
    // }

    // async function setNft(){
    //   const web3Modal = new Web3Modal()
    //   await web3Modal.connect();
    //   var hh = "0x7a69";
    //   var goe = "0x5";
    //   var mm = "0x13881";
    //   var bsct = "0x61";
    //   const connected = await detectEthereumProvider();
    //   if (connected.chainId == hh) {
    //     var nftcontract = hhnft
    //   }
    //   else if (connected.chainId == goe) {
    //     var nftcontract = goenft
    //   }
    //   else if (connected.chainId == mm) {
    //     var nftcontract = mmnft
    //   }
    //   else if (connected.chainId == bsct) {
    //     var nftcontract = bsctnft
    //   }
    //   getNft(nftcontract);
    //   //console.log(nftcontract)
    //   setMarket();
    // }

    // async function setMarket(){
    //   var hh = "0x7a69";
    //   var goe = "0x5";
    //   var mm = "0x13881";
    //   var bsct = "0x61";
    //   const connected = await detectEthereumProvider();
    //   if (connected.chainId == hh) {
    //     var market = hhmarket
    //   }
    //   else if (connected.chainId == goe) {
    //     var market = goemarket
    //   }
    //   else if (connected.chainId == mm) {
    //     var market = mmmarket
    //   }
    //   else if (connected.chainId == bsct) {
    //     var market = bsctmarket
    //   }
    //   getMarket(market);
    //   //console.log(market)
    // }

    async function createNFT(url) {
      try{
        //let amount = 999999999999999;
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let cosmeta = new ethers.Contract(cri,Token,signer)
        let contract = new ethers.Contract(nftcustom, NFT, signer)
        let price = new ethers.utils.parseUnits(formInput.price, 'ether')
        price = price.toString()
        const marketcontract = new ethers.Contract(marketcol, Market, signer)
        let listingFee = await marketcontract.getListingFee()
        listingFee = listingFee.toString()
        // await cosmeta.approve(user,listingFee)
        // await cosmeta.approve(marketcol,listingFee)
        // await cosmeta.approve(nftcustom,listingFee)
        let gasPrice = new ethers.utils.parseUnits('20', 'gwei')
        let transaction = await contract.createNFT(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        await cosmeta.increaseAllowance(marketcol, ethers.utils.parseEther(listingFee.toString()))//ethers.utils.parseEther(listingFee.toString())
        transaction = await marketcontract.createVaultItem(nftcustom, tokenId, price, {gasPrice:gasPrice,value: listingFee })
        await transaction.wait()
        setProcess(false);
        router.push('/')
      }catch(err){
        console.log(err.message);
      }
    }

    async function createAuctionNFT(url) {

        let amount = 999999999999999;
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let cosmeta = new ethers.Contract(cri,Token,signer)
        let nftauction = new ethers.Contract(auction, Auction, signer)

        let getListingFee = new ethers.Contract(auction, Auction, signer)
        let listingPrice = await getListingFee.getListingPrice()
        listingPrice = listingPrice.toString()

        let price = new ethers.utils.parseUnits(formInput.price, 'ether')
        price = price.toString()

        // await cosmeta.approve(user,amount)
        // await cosmeta.approve(auction,amount)


        await cosmeta.increaseAllowance(auction, ethers.utils.parseEther(listingPrice))//ethers.utils.parseEther(listingFee.toString())
        let transaction = await nftauction.createAuction(formInput.name,formInput.description,fileUrl,url,price, {value:listingPrice})
        await transaction.wait()

        setProcess(false);
        router.push(`/${auth.user.username}`)

    }

    async function buyNFT() {
        const { name, description } = formInput
        if (!name || !description || !fileUrl) return
        const data = JSON.stringify({
          name, description, image: fileUrl, fileType , wichNet ,website
        })
        try {
            const added = await client.add(data)
            const url = `${subdomain}/ipfs/${added.path}`;
            mintNFT(url)
        } catch (error) {
          setProcess(false)
            //console.log('Error uploading file: ', error)
        }
    }

    async function mintNFT(url) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        let cosmeta = new ethers.Contract(cri,Token,signer)
        //const feo = new ethers.utils.parseUnits('28', 'ether')
        let contract = new ethers.Contract(nftcustom, NFT, signer)
        let mintingFee = await contract.getMintingFee()
        mintingFee = mintingFee.toString()
        const price = new ethers.utils.parseUnits(formInput.price, 'ether')
        await cosmeta.approve(nftcustom,mintingFee.toString());
        await cosmeta.increaseAllowance(marketcol, mintingFee)
        mintingFee = mintingFee.toString()
        let transaction = await contract.mintNFT(url, {gasLimit:8000000, value: mintingFee })
        await transaction.wait()
        router.push('/profile')
    }

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
          <Fragment>
        <div className='flex justify-center items-center py-10 pb-40 w-full welcomebg overflow-hidden'>
        {process ?
          <div className='bg-black fixed top-0 left-0 w-screen h-screen z-40 opacity-80' onClick={() => setProcess(false)}>
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
          <div className='flex-col justify-center items-center text-slate-400 w-full px-3'>
        <div className='flex-col w-full bg-gradient-to-t to-slate-900 from-transparent justify-center items-center h-12 rounded-t-lg py-2 my-10'>
          <div className='flex justify-center items-center gap-x-5'><span onClick={() => {setOpenNft(true),setOpenAuction(false)}} className={openNFT && "border-b-2 border-blue-400 text-blue-400"}>Create NFT's</span>|<span onClick={() => {setOpenAuction(true),setOpenNft(false)}} className={openAuction && "border-b-2 border-blue-400 text-blue-400"}>Create Auction</span></div>

          <div className='px-7 py-1 bg-slate-900 rounded-md w-28 my-5' onClick={() => setOpenPreview(!openPreview)}>Preview</div>
        </div> 
        {openPreview &&
          <div className='fixed justify-center items-center top-10 left-0 w-screen h-screen z-50' onClick={() => setOpenPreview(false)}>
          <div className='flex justify-center items-start p-7 w-full'>
          <div className='flex justify-center items-center w-full '>
          <div className={loading ? 'flex-col items-center w-[350px] h-full bg-slate-900 rounded-xl animate-pulse' : ' flex-col items-center w-[350px] h-[550px] bg-slate-900 rounded-xl'}>
          <h1 className='relative bottom-10 ml-3 text-xl'>Preview</h1>
                {loading &&
                  <div className='mx-5'>
                  <div className='rounded-lg bg-slate-800 w-[312px] h-52 relative border-2 border-slate-700 animate-pulse'>&nbsp;</div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 mb-5 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  </div>
                }
                {fileUrl ? 
                  (<div className='px-6'>

                  <div className="z-40 w-[300px] relative hover:bottom-2 overflow-hidden border-2 border-slate-800 border-r-slate-700 rounded-xl hover:shadow-2xl hover:shadow-blue-900">
                  <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
                      <img src={activeEth ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : activeMtc ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : activeBsc ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="object-cover w-5 absolute top-2 left-2"/> 
                      {fileType == 'video/mp4'
                      ? <video src={fileUrl} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/>
                      : fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/jpg' || fileType == 'image/webp' ? <img className='rounded-t-xl object-cover' src={fileUrl} />
                      : fileType == 'audio/mp3' || fileType == 'audio/wav' || fileType == 'audio/ogg' || fileType == 'audio/mpeg' ? <AudioPlayer nft={fileUrl} nftname={formInput.name}/> : null
                      }
                      <div className='flex-col px-5'>
                            <div className='flex justify-between items-center w-full my-3'>
                                    
                            <div className="flex justify-between items-center w-full">
                            <div className='justify-start items-center'>
                              <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{auth.user.username} {auth.user.verified == 'verified' ? <MdVerified size={18}/> : null}</h3>
                            </div>
                            </div>
                            <div className='flex justify-end items-center w-full'>
                            <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : 1</h3>
                            </div>
                            
                            </div>
                            <div>
                            <h1 className='font-medium text-lg'>{formInput.name}</h1>
                            <p className='font-medium text-sm'>{formInput.description}</p>
                            </div>
                          <div className='flex justify-center items-center gap-x-2 py-4'>
                            <h1 className='font-bold text-lg flex items-center gap-x-2 my-3 text-slate-500'>{formInput.price}<img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></h1>
                            <Button className='bg-gradient-to-tl to-purple-400 from-blue-500 hover:to-purple-600 hover:from-blue-700 z-10'>Buy</Button>
                          </div>
                      </div>
                    </div>
                  </div>
                  </div>)
                  : null
                }
              </div>
            </div>
          </div>
          </div>
        }

        {openNFT &&
        <div className='flex-col justify-center items-center py-10'>
                <div className='w-full'>
                <div className='flex justify-center items-center mb-5'><h1 className='text-2xl font-bold'>Create NFTs</h1></div>
                <h1 className='text-xl font-bold flex items-center'>Upload to Image, Video and Audio<span className='text-[20px] flex mt-2 px-2 items-center text-red-600'>*</span></h1>
                <p className='text-sm mb-3'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV</p>
                
                <label className='w-full cursor-pointer flex h-52 justify-center items-center text-center border-2 rounded-lg border-dashed bg-slate-800 hover:bg-slate-900 border-slate-400 text-slate-400'>Upload
                    <input
                      className='opacity-0 absolute h-52 -left-96'
                      type="file"
                      name="Asset"
                      onChange={onChange}
                    />
                  </label>
                  </div>
                  <div className='flex-col items-center my-3'>
                  <h1 className='text-lg font-bold flex items-center'>Name :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={1}
                  type="text"
                  className='w-full bg-slate-800 hover:bg-slate-900 py-2 px-3 rounded-lg border-2 border-slate-700 hover:border-blue-500'
                  placeholder='NFT Name'
                  onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                  </div>
                  <div className="flex-col items-center my-3">
                  <h1 className='text-lg font-bold flex items-center my-2'>Description :</h1>
                  <textarea
                  tabIndex={2}
                  className='w-full bg-slate-800 hover:bg-slate-900  border-slate-700 py-2 px-3 rounded-lg border-2 hover:border-blue-500'
                  placeholder="NFT Description"
                  onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                  />
                  </div>
                  <div className='flex-col my-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Price :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={3}
                  className='w-full bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="Price"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                  />
                  </div>
                  <h1 className='text-lg font-bold flex items-center my-2'>Blockchain :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <div className='w-full mb-10 bg-slate-800 border-2 border-slate-700 rounded-lg py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
                  <h5 className='text-center font-bold antialiased flex justify-center items-center'>{wichNet ? wichNet : "Blockchain"} {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative right-0"/>:<MdKeyboardArrowUp size={28} className="relative right-0"/>}</h5>
                  </div>
                  {openNetwork &&
                  <div className='my-3'>  
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeEth ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setEth(!activeEth),setNet("Ethereum"),setMtc(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeEth ? "text-slate-400" : "text-blue-500"}>Ethereum</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeMtc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setMtc(!activeMtc),setNet("Polygon"),setEth(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeMtc ? "text-slate-400" : "text-blue-500"}>Polygon</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeBsc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setBsc(!activeBsc),setNet("Binance"),setMtc(false),setEth(false)}}>&nbsp;</div><h5 className={!activeBsc ? "text-slate-400" : "text-blue-500"}>Binance</h5>
                  </div>
                  </div>
                  }
                  <div className='flex-col mb-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Website Link :</h1>
                  <p className='w-full text-sm mb-3'>Cosmeta will include a link to this URL on this item's detail page, so that users can click to learn more about it.</p>
                  <input
                  tabIndex={3}
                  className='w-full bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="https://"
                  onChange={e => updateFormInput({ ...formInput, website: e.target.value })}
                  />
                  </div>
                <div className='flex-col justify-center items-center w-full mt-10 mb-10'>
                <button className='bg-gradient-to-tl to-purple-400 from-blue-500 text-slate-50 text-xl -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-full' onClick={createMarket} >
                List your NFT!
                </button>
                <button className='bg-gradient-to-tl to-yellow-400 from-red-500 text-slate-50 text-xl -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-full' onClick={mintNFT}>
                Buy your NFT!
                </button>
                
              </div>
        </div>
        }

        {openAuction &&
        <div className='flex-col justify-center items-center py-10'>
                <div className='w-full'>
                <div className='flex justify-center items-center mb-5'><h1 className='text-2xl font-bold'>Create Auction NFT</h1></div>
                <h1 className='text-xl font-bold flex items-center'>Upload to Image, Video and Audio<span className='text-[20px] flex mt-2 px-2 items-center text-red-600'>*</span></h1>
                <p className='text-sm mb-3'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV</p>
                
                <label className='w-full cursor-pointer flex h-52 justify-center items-center text-center border-2 rounded-lg border-dashed bg-slate-800 hover:bg-slate-900 border-slate-400 text-slate-400'>Upload
                    <input
                      className='opacity-0 absolute h-52 -left-96'
                      type="file"
                      name="Asset"
                      onChange={onChange}
                    />
                  </label>
                  </div>
                  <div className='flex-col items-center my-3'>
                  <h1 className='text-lg font-bold flex items-center'>Name :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={1}
                  type="text"
                  className='w-full bg-slate-800 hover:bg-slate-900 py-2 px-3 rounded-lg border-2 border-slate-700 hover:border-blue-500'
                  placeholder='NFT Name'
                  onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                  </div>
                  <div className="flex-col items-center my-3">
                  <h1 className='text-lg font-bold flex items-center my-2'>Description :</h1>
                  <textarea
                  tabIndex={2}
                  className='w-full bg-slate-800 hover:bg-slate-900  border-slate-700 py-2 px-3 rounded-lg border-2 hover:border-blue-500'
                  placeholder="NFT Description"
                  onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                  />
                  </div>
                  <div className='flex-col my-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Price :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={3}
                  className='w-full bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="Price"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                  />
                  </div>
                  <h1 className='text-lg font-bold flex items-center my-2'>Blockchain :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <div className='w-full mb-10 bg-slate-800 border-2 border-slate-700 rounded-lg py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
                  <h5 className='text-center font-bold antialiased flex justify-center items-center'>{wichNet ? wichNet : "Blockchain"} {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative right-0"/>:<MdKeyboardArrowUp size={28} className="relative right-0"/>}</h5>
                  </div>
                  {openNetwork &&
                  <div className='my-3'>  
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeEth ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setEth(!activeEth),setNet("Ethereum"),setMtc(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeEth ? "text-slate-400" : "text-blue-500"}>Ethereum</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeMtc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setMtc(!activeMtc),setNet("Polygon"),setEth(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeMtc ? "text-slate-400" : "text-blue-500"}>Polygon</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeBsc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setBsc(!activeBsc),setNet("Binance"),setMtc(false),setEth(false)}}>&nbsp;</div><h5 className={!activeBsc ? "text-slate-400" : "text-blue-500"}>Binance</h5>
                  </div>
                  </div>
                  }
                  <div className='flex-col mb-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Website Link :</h1>
                  <p className='w-full text-sm mb-3'>Cosmeta will include a link to this URL on this item's detail page, so that users can click to learn more about it.</p>
                  <input
                  tabIndex={3}
                  className='w-full bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="https://"
                  onChange={e => updateFormInput({ ...formInput, website: e.target.value })}
                  />
                  </div>
                <div className='flex-col justify-center items-center w-full mt-10 mb-10'>
                <button className='bg-gradient-to-tl to-purple-400 from-blue-500 text-slate-50 text-xl -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-full' onClick={createAuctionMarket} >
                List your NFT!
                </button>
                
              </div>
        </div>
        }     

        </div>

        </div>
          </Fragment>
        }
        
        {matches.medium && 
          <Fragment>
        <div className='flex justify-center items-center p-40 w-full welcomebg'>
        {process ?
          <div className='bg-black fixed top-0 left-0 w-screen h-screen z-40 opacity-80' onClick={() => setProcess(false)}>
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
          <div className='flex justify-evenly items-center text-slate-400 rounded-3xl w-full p-10'>
            
          <div className='flex justify-start items-start p-7 w-[450px] relative left-40'>
          <div className='flex justify-center items-center w-full '>
          <div className={loading ? 'flex-col items-center w-[350px] h-full bg-slate-900 rounded-xl animate-pulse' : ' flex-col items-center w-[350px] h-[550px] bg-slate-900 rounded-xl'}>
          <h1 className='relative bottom-10 ml-3 text-xl'>Preview</h1>
                {loading &&
                  <div className='mx-5'>
                  <div className='rounded-lg bg-slate-800 w-[312px] h-52 relative border-2 border-slate-700 animate-pulse'>&nbsp;</div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 mb-5 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  </div>
                }
                {fileUrl ? 
                  (<div className='px-6'>

                  <div className="z-40 w-[300px] relative hover:bottom-2 overflow-hidden border-2 border-slate-800 border-r-slate-700 rounded-xl hover:shadow-2xl hover:shadow-blue-900">
                  <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
                      <img src={activeEth ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : activeMtc ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : activeBsc ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="object-cover w-5 absolute top-2 left-2"/> 
                      {fileType == 'video/mp4'
                      ? <video src={fileUrl} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/>
                      : fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/jpg' || fileType == 'image/webp' ? <img className='rounded-t-xl object-cover' src={fileUrl} />
                      : fileType == 'audio/mp3' || fileType == 'audio/wav' || fileType == 'audio/ogg' || fileType == 'audio/mpeg' ? <AudioPlayer nft={fileUrl} nftname={formInput.name}/> : null
                      }
                      <div className='flex-col px-5'>
                            <div className='flex justify-between items-center w-full my-3'>
                                    
                            <div className="flex justify-between items-center w-full">
                            <div className='justify-start items-center'>
                              <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{auth.user.username} {auth.user.verified == 'verified' ? <MdVerified size={18}/> : null}</h3>
                            </div>
                            </div>
                            <div className='flex justify-end items-center w-full'>
                            <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : 1</h3>
                            </div>
                            
                            </div>
                            <div>
                            <h1 className='font-medium text-lg'>{formInput.name}</h1>
                            <p className='font-medium text-sm'>{formInput.description}</p>
                            </div>
                          <div className='flex justify-center items-center gap-x-2 py-4'>
                            <h1 className='font-bold text-lg flex items-center gap-x-2 my-3 text-slate-500'>{formInput.price}<img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></h1>
                            <Button className='bg-gradient-to-tl to-purple-400 from-blue-500 hover:to-purple-600 hover:from-blue-700 z-10'>Buy</Button>
                          </div>
                      </div>
                    </div>
                  </div>
                  </div>)
                  : null
                }
              </div>
            </div>
          </div>

      <div className='flex justify-center items-center w-full p-7 z-30'>
        <div className='flex-col justify-center items-center'>
                <div className='w-full'>
                <h1 className='text-2xl font-bold flex items-center'>Upload to Image, Video and Audio<span className='text-[20px] flex mt-2 px-2 items-center text-red-600'>*</span></h1>
                <p className='text-sm mb-3'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV</p>
                
                <label className='w-96 cursor-pointer flex h-52 justify-center items-center text-center border-2 rounded-lg border-dashed bg-slate-800 hover:bg-slate-900 border-slate-400 text-slate-400'>Upload
                    <input
                      className='opacity-0 absolute h-52 -left-96'
                      type="file"
                      name="Asset"
                      onChange={onChange}
                    />
                  </label>
                  </div>
                  <div className='flex-col items-center my-3'>
                  <h1 className='text-lg font-bold flex items-center'>Name :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={1}
                  type="text"
                  className='w-96 bg-slate-800 hover:bg-slate-900 py-2 px-3 rounded-lg border-2 border-slate-700 hover:border-blue-500'
                  placeholder='NFT Name'
                  onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                  </div>
                  <div className="flex-col items-center my-3">
                  <h1 className='text-lg font-bold flex items-center my-2'>Description :</h1>
                  <textarea
                  tabIndex={2}
                  className='w-96 bg-slate-800 hover:bg-slate-900  border-slate-700 py-2 px-3 rounded-lg border-2 hover:border-blue-500'
                  placeholder="NFT Description"
                  onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                  />
                  </div>
                  <div className='flex-col my-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Price :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={3}
                  className='w-96 bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="Price"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                  />
                  </div>
                  <h1 className='text-lg font-bold flex items-center my-2'>Blockchain :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <div className='mb-10 bg-slate-800 border-2 border-slate-700 rounded-lg w-96 py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
                  <h5 className='text-center font-bold antialiased flex justify-center items-center'>{wichNet ? wichNet : "Blockchain"} {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative right-0"/>:<MdKeyboardArrowUp size={28} className="relative right-0"/>}</h5>
                  </div>
                  {openNetwork &&
                  <div className='my-3'>  
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeEth ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setEth(!activeEth),setNet("Ethereum"),setMtc(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeEth ? "text-slate-400" : "text-blue-500"}>Ethereum</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeMtc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setMtc(!activeMtc),setNet("Polygon"),setEth(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeMtc ? "text-slate-400" : "text-blue-500"}>Polygon</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeBsc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setBsc(!activeBsc),setNet("Binance"),setMtc(false),setEth(false)}}>&nbsp;</div><h5 className={!activeBsc ? "text-slate-400" : "text-blue-500"}>Binance</h5>
                  </div>
                  </div>
                  }
                  <div className='flex-col mb-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Website Link :</h1>
                  <p className='w-96 text-sm mb-3'>Cosmeta will include a link to this URL on this item's detail page, so that users can click to learn more about it.</p>
                  <input
                  tabIndex={3}
                  className='w-96 bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="https://"
                  onChange={e => updateFormInput({ ...formInput, website: e.target.value })}
                  />
                  </div>
                <div className='flex relative mt-20 mb-10 -left-32'>
                <button className='bg-gradient-to-tl to-purple-400 from-blue-500 text-slate-50 text-xl mx-10 -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-56' onClick={createMarket} >
                List your NFT!
                </button>
                <button className='bg-gradient-to-tl to-yellow-400 from-red-500 text-slate-50 text-xl mx-10 -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-56' onClick={mintNFT}>
                Buy your NFT!
                </button>
                
              </div>
              </div>
              
            </div>

        </div>
        <div className="absolute top-40 rounded-2xl opacity-20 bg-slate-900 from-slate-900 z-10 w-[1580px] h-[1210px]">
        </div>
        </div>
          </Fragment>
        }

        {matches.large && 
          <Fragment>
          <div className='flex-col justify-center items-center p-40 w-full welcomebg'>
           <div className='flex justify-center items-center gap-x-5 relative top-10 z-50'><span onClick={() => {setOpenNft(true),setOpenAuction(false)}} className={openNFT ? "border-b-2 border-blue-400 text-blue-400 cursor-pointer" : "hover:border-b-2 hover:border-slate-400 text-slate-400 cursor-pointer"}>Create NFT's</span>|<span onClick={() => {setOpenAuction(true),setOpenNft(false)}} className={openAuction ? "border-b-2 border-blue-400 text-blue-400 cursor-pointer" : "hover:border-b-2 hover:border-slate-400 text-slate-400 cursor-pointer"}>Create Auction</span></div>
        {process ?
          <div className='bg-black fixed top-0 left-0 w-screen h-screen z-[999] opacity-80' onClick={() => setProcess(false)}>
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
          <div className='flex justify-evenly items-center text-slate-400 rounded-3xl w-full p-10'>
            
          <div className='flex justify-start items-start p-7 w-[450px] relative left-40'>
          <div className='flex justify-center items-center w-full '>
          <div className={loading ? 'flex-col items-center w-[350px] h-full bg-slate-900 rounded-xl animate-pulse' : ' flex-col items-center w-[350px] pb-7 bg-slate-900 rounded-xl'}>
          <h1 className='relative bottom-10 ml-3 text-xl'>Preview</h1>
                {loading &&
                  <div className='mx-5'>
                  <div className='rounded-lg bg-slate-800 w-[312px] h-52 relative border-2 border-slate-700 animate-pulse'>&nbsp;</div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  <div className='my-3 bg-slate-800 py-2 mb-5 px-3 border-2 border-slate-700 rounded flex justify-between items-center animate-pulse'><span className='justify-start'>&nbsp;</span></div>
                  </div>
                }
                {fileUrl ? 
                  (<div className='px-6'>

                  <div className="w-[300px] relative hover:bottom-2 border-slate-800 border-r-slate-700 rounded-xl  overflow-hidden border-2">
                  <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
                  <img src={activeEth == 'Ethereum' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' : activeMtc == 'Polygon' ? 'https://cryptologos.cc/logos/polygon-matic-logo.png' : activeBsc == 'Binance' ? 'https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png' : null} className="z-30 object-cover w-5 absolute top-2 left-2"/>
                  {fileType == 'video/mp4' || fileType == 'video/mov'
                      ? <video src={fileUrl} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/>
                      : fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/jpg' || fileType == 'image/webp' ? <img className='rounded-t-xl object-cover w-full h-[296px]' src={fileUrl} />
                      : fileType == 'audio/mp3' || fileType == 'audio/wav' || fileType == 'audio/ogg' || fileType == 'audio/mpeg' ? <AudioPlayer nft={fileUrl} nftname={formInput.name}/> : null
                      }
                      <div className='flex-col px-5'>
                            <div className='flex justify-between items-center w-full my-3'>
                                    
                            <div className="flex justify-between items-center w-full">
                            <div className='justify-start items-center'>
                              <h3 className="text-md font-medium cursor-pointer text-purple-500 flex items-center gap-x-1">{auth.user.username} {auth.user.verified == 'verified' ? <MdVerified size={18}/> : null}</h3>
                            </div>
                            </div>
                            <div className='flex justify-end items-center w-full'>
                            <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md'>Token ID : 1</h3>
                            </div>
                            
                            </div>
                            <div>
                            <h1 className='font-medium text-lg'>{formInput.name}</h1>
                            <p className='font-medium text-sm'>{formInput.description}</p>
                            </div>
                            <div className='flex justify-between my-4 items-center gap-x-2 border-[1px] border-slate-600 rounded'>
                            <div className='w-full '>
                            <h1 className='font-bold text-lg flex items-center gap-x-2 py-2 px-3  text-slate-500'>Price : &nbsp;{formInput.price}</h1>
                            </div>
                            <div className='px-3'>
                              <img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-10' title='Crypto International (CRI)' />
                            </div>
                              </div>
                            </div>
                            <div className='flex justify-between items-center mx-2 gap-x-2 pb-3'>
                            <div className='w-full'>
                            <button className='bg-gradient-to-tr to-slate-800 z-30 border-[1px] border-slate-700 rounded-lg from-slate-800 hover:to-purple-600 hover:from-blue-700 relative w-full h-10 text-white'>Buy</button>
                            </div>
                            </div>
                            </div>
                  </div>

                  </div>)
                  : null
                }
              </div>
            </div>
          </div>
          
      {openNFT &&
      <div className='flex justify-center items-center w-full p-7 z-50'>
      <div className='flex-col justify-center items-center'>
                <div className='w-full'>
                <h1 className='text-2xl font-bold flex items-center'>Upload to Image, Video and Audio<span className='text-[20px] flex mt-2 px-2 items-center text-red-600'>*</span></h1>
                <p className='text-sm mb-3'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV</p>
                
                <label className='w-96 cursor-pointer flex h-52 justify-center items-center text-center border-2 rounded-lg border-dashed bg-slate-800 hover:bg-slate-900 border-slate-400 text-slate-400'>Upload
                    <input
                      className='opacity-0 absolute h-52 -left-96'
                      type="file"
                      name="Asset"
                      onChange={onChange}
                    />
                  </label>
                  </div>
                  <div className='flex-col items-center my-3'>
                  <h1 className='text-lg font-bold flex items-center'>Name :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={1}
                  type="text"
                  className='w-96 bg-slate-800 hover:bg-slate-900 py-2 px-3 rounded-lg border-2 border-slate-700 hover:border-blue-500'
                  placeholder='NFT Name'
                  onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                  </div>
                  <div className="flex-col items-center my-3">
                  <h1 className='text-lg font-bold flex items-center my-2'>Description :</h1>
                  <textarea
                  tabIndex={2}
                  className='w-96 bg-slate-800 hover:bg-slate-900  border-slate-700 py-2 px-3 rounded-lg border-2 hover:border-blue-500'
                  placeholder="NFT Description"
                  onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                  />
                  </div>
                  <div className='flex-col my-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Price :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={3}
                  className='w-96 bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="Price"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                  />
                  </div>
                  <h1 className='text-lg font-bold flex items-center my-2'>Blockchain :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <div className='mb-10 bg-slate-800 border-2 border-slate-700 rounded-lg w-96 py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
                  <h5 className='text-center font-bold antialiased flex justify-center items-center'>{wichNet ? wichNet : "Blockchain"} {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative right-0"/>:<MdKeyboardArrowUp size={28} className="relative right-0"/>}</h5>
                  </div>
                  {openNetwork &&
                  <div className='my-3'>  
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeEth ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setEth(!activeEth),setNet("Ethereum"),setMtc(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeEth ? "text-slate-400" : "text-blue-500"}>Ethereum</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeMtc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setMtc(!activeMtc),setNet("Polygon"),setEth(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeMtc ? "text-slate-400" : "text-blue-500"}>Polygon</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeBsc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setBsc(!activeBsc),setNet("Binance"),setMtc(false),setEth(false)}}>&nbsp;</div><h5 className={!activeBsc ? "text-slate-400" : "text-blue-500"}>Binance</h5>
                  </div>
                  </div>
                  }
                  <div className='flex-col mb-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Website Link :</h1>
                  <p className='w-96 text-sm mb-3'>Cosmeta will include a link to this URL on this item's detail page, so that users can click to learn more about it.</p>
                  <input
                  tabIndex={3}
                  className='w-96 bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="https://"
                  onChange={e => updateFormInput({ ...formInput, website: e.target.value })}
                  />
                  </div>
                <div className='flex relative mt-20 mb-10 -left-32'>
                <button className='bg-gradient-to-tl to-purple-400 from-blue-500 text-slate-50 text-xl mx-10 -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-56' onClick={createMarket} >
                List your NFT!
                </button>
                <button className='bg-gradient-to-tl to-yellow-400 from-red-500 text-slate-50 text-xl mx-10 -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-56' onClick={mintNFT}>
                Buy your NFT!
                </button>
                
              </div>
              </div>
              
      </div>
      }

      {openAuction &&
        <div className='flex-col justify-center items-center py-7 z-50'>
                <div className='w-full'>
                <h1 className='text-xl font-bold flex items-center'>Upload to Image, Video and Audio<span className='text-[20px] flex mt-2 px-2 items-center text-red-600'>*</span></h1>
                <p className='text-sm mb-3'>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV</p>
                
                <label className='w-full cursor-pointer flex h-52 justify-center items-center text-center border-2 rounded-lg border-dashed bg-slate-800 hover:bg-slate-900 border-slate-400 text-slate-400'>Upload
                    <input
                      className='opacity-0 absolute h-52 -left-96'
                      type="file"
                      name="Asset"
                      onChange={onChange}
                    />
                  </label>
                  </div>
                  <div className='flex-col items-center my-3'>
                  <h1 className='text-lg font-bold flex items-center'>Name :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={1}
                  type="text"
                  className='w-full bg-slate-800 hover:bg-slate-900 py-2 px-3 rounded-lg border-2 border-slate-700 hover:border-blue-500'
                  placeholder='NFT Name'
                  onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
                  </div>
                  <div className="flex-col items-center my-3">
                  <h1 className='text-lg font-bold flex items-center my-2'>Description :</h1>
                  <textarea
                  tabIndex={2}
                  className='w-full bg-slate-800 hover:bg-slate-900  border-slate-700 py-2 px-3 rounded-lg border-2 hover:border-blue-500'
                  placeholder="NFT Description"
                  onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                  />
                  </div>
                  <div className='flex-col my-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Price :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <input
                  tabIndex={3}
                  className='w-full bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="Price"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                  />
                  </div>
                  <h1 className='text-lg font-bold flex items-center my-2'>Blockchain :<span className='text-[20px] mt-2 px-2 items-center text-red-600'>*</span></h1>
                  <div className='w-full mb-10 bg-slate-800 border-2 border-slate-700 rounded-lg py-3 px-3 cursor-pointer' onClick={() => setOpenNetwork(!openNetwork)} >
                  <h5 className='text-center font-bold antialiased flex justify-center items-center'>{wichNet ? wichNet : "Blockchain"} {!openNetwork ?<MdKeyboardArrowDown size={28} className="relative right-0"/>:<MdKeyboardArrowUp size={28} className="relative right-0"/>}</h5>
                  </div>
                  {openNetwork &&
                  <div className='my-3'>  
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeEth ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setEth(!activeEth),setNet("Ethereum"),setMtc(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeEth ? "text-slate-400" : "text-blue-500"}>Ethereum</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeMtc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setMtc(!activeMtc),setNet("Polygon"),setEth(false),setBsc(false)}}>&nbsp;</div><h5 className={!activeMtc ? "text-slate-400" : "text-blue-500"}>Polygon</h5>
                  </div>
                  <div className='flex items-center gap-x-2 my-2 mx-2'>
                  <div className={!activeBsc ? "rounded-full bg-slate-700 w-5 h-5 cursor-pointer" : 'rounded-full bg-blue-500 w-5 h-5 cursor-pointer'} onClick={() => {setBsc(!activeBsc),setNet("Binance"),setMtc(false),setEth(false)}}>&nbsp;</div><h5 className={!activeBsc ? "text-slate-400" : "text-blue-500"}>Binance</h5>
                  </div>
                  </div>
                  }
                  <div className='flex-col mb-3'>
                  <h1 className='text-lg font-bold flex items-center my-2'>Website Link :</h1>
                  <p className='w-full text-sm mb-3'>Cosmeta will include a link to this URL on this item's detail page, so that users can click to learn more about it.</p>
                  <input
                  tabIndex={3}
                  className='w-full bg-slate-800 hover:bg-slate-900 border-2 border-slate-700 hover:border-blue-500 py-2 px-3 rounded-lg'
                  placeholder="https://"
                  onChange={e => updateFormInput({ ...formInput, website: e.target.value })}
                  />
                  </div>
                <div className='flex-col justify-center items-center w-full mt-10 mb-10'>
                <button className='bg-gradient-to-tl to-purple-400 from-blue-500 text-slate-50 text-xl -skew-y-3 py-3 shadow-xl shadow-slate-900 mt-5 rounded-lg w-full' onClick={createAuctionMarket} >
                List your NFT!
                </button>
                
              </div>
        </div>
      }

        </div>
        <div className="absolute top-40 rounded-2xl opacity-20 bg-slate-900 from-slate-900 z-10 w-[1580px] h-[1210px]">
        </div>
        </div>
          </Fragment>
        }

      </Fragment>
      )}

    </Media>
    </div>
  )
}
export default CreateMarket;