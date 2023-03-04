import {useState,useReducer,useCallback,useMemo,useEffect,useContext, Fragment} from "react";
import { useRouter } from "next/router";
import AudioPlayer from '../../components/AudioPlayer';
import { motion } from "framer-motion"
import {MdVerified} from 'react-icons/md';
import Link from 'next/link';
import { cipherHH, cipherEth, simpleCrypto,client } from '../../engine/configuration';
import NFT from '../../engine/NFT.json';
import Market from '../../engine/Market.json';
import Token from '../../engine/Token.json';
import axios from 'axios';
import Web3Modal from "web3modal";
import { useStateContext } from "../../context/StateContext";
import { ethers } from 'ethers';
import {BsEyeFill,BsFillHeartFill} from 'react-icons/bs';
import { DataContext } from "../../store/GlobalState";
import Media from "react-media";
const Nftpage = () => {

  const {state,dispatch} = useContext(DataContext)
  const {auth} = state

  const router = useRouter();
  const uniqid = router.query.nftpage;


  const [hhnfts, hhsetNfts] = useState([])
  const [mmnfts, MumsetNfts] = useState([])
  const [process,setProcess] = useState(false);
  
  const [like,setLike] = useState(0);

  const handleLike = () => {
    if(auth.user.username){
      
    }
  }

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

    const token = localStorage.getItem('token')
    if(token){
      const usertoken = jwt.decode(token)

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
  }, [getUser,mmnfts,getChain,MumsetNfts,getNftCustom,getNftResell,getRpc,getChainName,
    //hhnfts, hhsetNfts,hhResellNfts, hhsetNfts,goeResellNfts,MumsetNfts,goesetNfts,bsctResellNfts, bsctsetNfts,MumsetNfts
  ])

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
      //console.log("META",meta.data)
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
    MumsetNfts(items.find(u => u.id == uniqid))
    setProcess(false)
  }
  
  async function buyNewMum() {
    setProcess(true)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    let price = ethers.utils.parseUnits(mmnfts.price, 'ether')
    price = price.toString()
    let cosmeta = new ethers.Contract(cri,Token,signer);
    await cosmeta.approve(user,price)
    await cosmeta.approve(nftcustom,price);
    await cosmeta.approve(marketcol,price);
    const contract = new ethers.Contract(marketcol, Market, signer)
    await cosmeta.increaseAllowance(marketcol, price)//ethers.utils.parseEther(price.toString())
    const transaction = await contract.CosmetaMarketSale(nftcustom, mmnfts.tokenId, {value: price})
    await transaction.wait()
    loadMumSaleNFTs()
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

      {matches.large &&
      <Fragment>

      <div className="p-40 flex justify-between">

      <div className="flex justify-between gap-2">
      <div className="p-3 bg-slate-900 w-[500px] rounded-xl">
      {mmnfts.type == 'video/mp4'
      ? <video src={mmnfts.image} className="w-[500px] rounded-lg" autoPlay muted loop/>
      : mmnfts.type == 'image/png' || mmnfts.type == 'image/jpeg' || mmnfts.type == 'image/jpg' ? <img src={mmnfts.image} className="w-[500px] rounded-lg" />
      : mmnfts.type == 'audio/mp3' || mmnfts.type == 'audio/wav' || mmnfts.type == 'audio/ogg' || 'audio/mpeg' ? <AudioPlayer nft={mmnfts.image} nftname={mmnfts.name} nftid={uniqid}/> : null
      }
      </div>

      <div className="flex-col">
      <div className="rounded-md bg-slate-900 p-3 flex w-32 my-2 items-center">
      <div><strong>Token ID :</strong><span> {mmnfts.tokenId}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-60 items-center my-1">
      <div><strong>NFT Name :</strong><span> {mmnfts.name}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-96 my-2 items-center">
      <div><strong>Description :</strong><span> {mmnfts.description}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-60 my-2 items-center">
      <div className="flex items-center gap-x-1"><strong>Owned by :</strong><span> <Link href={`/${mmnfts.username}`}><a className="hover:text-blue-500 flex items-center gap-x-1">{mmnfts.username} {mmnfts.verified == 'verified' ? <MdVerified size={15}/> : null}</a></Link></span></div>
      </div>
      {/*
      <div className="rounded-md bg-slate-900 p-3 flex w-36 my-2 items-center">
      <div className="flex gap-x-3 items-center"><div className="flex items-center gap-x-2"><BsEyeFill size={22}/><span>1.458</span></div><div className="flex items-center gap-x-2"><BsFillHeartFill size={18} className="cursor-pointer" onClick={handleLike}/><span>{like}</span></div></div>
      </div>
      */}
      <div className="rounded-md bg-slate-900 p-3 flex w-52 my-2 items-center">
      <div className="flex-col items-center">
      <div className="flex items-center gap-x-2 text-xl"><strong>Price :</strong><span>{mmnfts.price}</span><div className="flex items-center gap-x-2"><span className="text-sm ml-3">CRI</span><img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></div></div>
      </div>
      </div>
      <div className=" py-7 flex w-64 my-2 items-center">
        <div className="flex gap-x-3">
        <button type="submit" onClick={buyNewMum} className="bg-blue-500 py-3 px-7 rounded-md hover:bg-blue-600">Buy Now</button>
        <button type="submit" onClick="" className="bg-blue-500 py-3 px-7 rounded-md hover:bg-blue-600">Bid</button>
        </div>
      </div>

      </div>

      </div>

      </div>

      </Fragment>
      }

      {matches.medium &&
      <Fragment>

      <div className="p-40 flex justify-between">

      <div className="flex justify-between gap-2">
      <div className="p-3 bg-slate-900 w-[500px] rounded-xl">
      {mmnfts.type == 'video/mp4'
      ? <video src={mmnfts.image} className="w-[500px] rounded-lg" autoPlay muted loop/>
      : mmnfts.type == 'image/png' || mmnfts.type == 'image/jpeg' || mmnfts.type == 'image/jpg' ? <img src={mmnfts.image} className="w-[500px] rounded-lg" />
      : mmnfts.type == 'audio/mp3' || mmnfts.type == 'audio/wav' || mmnfts.type == 'audio/ogg' || 'audio/mpeg' ? <AudioPlayer nft={mmnfts.image} nftname={mmnfts.name} nftid={uniqid}/> : null
      }
      </div>

      <div className="flex-col">
      <div className="rounded-md bg-slate-900 p-3 flex w-32 my-2 items-center">
      <div><strong>Token ID :</strong><span> {mmnfts.tokenId}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-60 items-center my-1">
      <div><strong>NFT Name :</strong><span> {mmnfts.name}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-96 my-2 items-center">
      <div><strong>Description :</strong><span> {mmnfts.description}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-60 my-2 items-center">
      <div className="flex items-center gap-x-1"><strong>Owned by :</strong><span> <Link href={`/${mmnfts.username}`}><a className="hover:text-blue-500 flex items-center gap-x-1">{mmnfts.username} {mmnfts.verified == 'verified' ? <MdVerified size={15}/> : null}</a></Link></span></div>
      </div>
      {/*
      <div className="rounded-md bg-slate-900 p-3 flex w-36 my-2 items-center">
      <div className="flex gap-x-3 items-center"><div className="flex items-center gap-x-2"><BsEyeFill size={22}/><span>1.458</span></div><div className="flex items-center gap-x-2"><BsFillHeartFill size={18} className="cursor-pointer" onClick={handleLike}/><span>{like}</span></div></div>
      </div>
      */}
      <div className="rounded-md bg-slate-900 p-3 flex w-52 my-2 items-center">
      <div className="flex-col items-center">
      <div className="flex items-center gap-x-2 text-xl"><strong>Price :</strong><span>{mmnfts.price}</span><div className="flex items-center gap-x-2"><span className="text-sm ml-3">CRI</span><img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></div></div>
      </div>
      </div>
      <div className=" py-7 flex w-64 my-2 items-center">
        <div className="flex gap-x-3">
        <button type="submit" onClick={buyNewMum} className="bg-blue-500 py-3 px-7 rounded-md hover:bg-blue-600">Buy Now</button>
        <button type="submit" onClick="" className="bg-blue-500 py-3 px-7 rounded-md hover:bg-blue-600">Bid</button>
        </div>
      </div>

      </div>

      </div>

      </div>

      </Fragment>
      }

      {matches.small &&
      <Fragment>

      <div className="py-20 flex-cols w-full h-full">

      <div className="flex-cols justify-center">
      <div className="p-3 bg-slate-900 w-[500px] rounded-xl">
      {mmnfts.type == 'video/mp4'
      ? <video src={mmnfts.image} className="w-[500px] rounded-lg" autoPlay muted loop/>
      : mmnfts.type == 'image/png' || mmnfts.type == 'image/jpeg' || mmnfts.type == 'image/jpg' ? <img src={mmnfts.image} className="w-[500px] rounded-lg" />
      : mmnfts.type == 'audio/mp3' || mmnfts.type == 'audio/wav' || mmnfts.type == 'audio/ogg' || 'audio/mpeg' ? <AudioPlayer nft={mmnfts.image} nftname={mmnfts.name} nftid={uniqid}/> : null
      }
      </div>

      <div className="flex-col px-3 pb-20">
      <div className="rounded-md bg-slate-900 p-3 flex w-32 my-2 items-center">
      <div><strong>Token ID :</strong><span> {mmnfts.tokenId}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-60 items-center my-1">
      <div><strong>NFT Name :</strong><span> {mmnfts.name}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-96 my-2 items-center">
      <div><strong>Description :</strong><span> {mmnfts.description}</span></div>
      </div>
      <div className="rounded-md bg-slate-900 p-3 flex w-60 my-2 items-center">
      <div className="flex items-center gap-x-1"><strong>Owned by :</strong><span> <Link href={`/${mmnfts.username}`}><a className="hover:text-blue-500 flex items-center gap-x-1">{mmnfts.username} {mmnfts.verified == 'verified' ? <MdVerified size={15}/> : null}</a></Link></span></div>
      </div>
      {/*
      <div className="rounded-md bg-slate-900 p-3 flex w-36 my-2 items-center">
      <div className="flex gap-x-3 items-center"><div className="flex items-center gap-x-2"><BsEyeFill size={22}/><span>1.458</span></div><div className="flex items-center gap-x-2"><BsFillHeartFill size={18} className="cursor-pointer" onClick={handleLike}/><span>{like}</span></div></div>
      </div>
      */}
      <div className="rounded-md bg-slate-900 p-3 flex w-52 my-2 items-center">
      <div className="flex-col items-center">
      <div className="flex items-center gap-x-2 text-xl"><strong>Price :</strong><span>{mmnfts.price}</span><div className="flex items-center gap-x-2"><span className="text-sm ml-3">CRI</span><img src='https://etherscan.io/token/images/cosmeta_32.png' className='object-cover w-6' /></div></div>
      </div>
      </div>
      <div className=" py-7 flex w-64 my-2 items-center">
        <div className="flex gap-x-3">
        <button type="submit" onClick={buyNewMum} className="bg-blue-500 py-3 px-7 rounded-md hover:bg-blue-600">Buy Now</button>
        <button type="submit" onClick="" className="bg-blue-500 py-3 px-7 rounded-md hover:bg-blue-600">Bid</button>
        </div>
      </div>

      </div>

      </div>

      </div>

      </Fragment>
      }

      </Fragment>
    )}
    </Media>
    </div>
    );
};

export default Nftpage;
