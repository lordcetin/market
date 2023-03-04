
import { ethers } from 'ethers';
import React,{useState,useEffect} from 'react';
import Web3Modal from "web3modal";
import { useRouter } from 'next/router';
import NFT from '../../engine/NFT.json';
import Token from '../../engine/Token.json';
import Market from '../../engine/Market.json';
import ConnectChain from '../../engine/connectchain';
import axios from 'axios';
import { useStateContext } from '../../context/StateContext';
import { cipherEth, simpleCrypto } from '../../engine/configuration.js';
import uniqid from 'uniqid';
import {CreatedNfCard} from '../../components';
import {BiRefresh} from 'react-icons/bi'
import jwt from 'jsonwebtoken';
import { motion } from 'framer-motion'
import { DataContext } from '../../store/GlobalState';
import { useContext } from 'react';
import {MdVerified} from 'react-icons/md';
import {BsInstagram,BsTwitter} from 'react-icons/bs'
import AudioPlayer from '../../components/AudioPlayer'

 const Profile = ({userData,param}) => {
  const {user,getUser,connectUser,
    nfts,
    setNfts,
    setContAddr,
    contAdr,
    bscChain,
    polyChain,
    ethChain,
    hardChain,
    bscTest,
    ethTest,
    polyTest,
    getNfts,
    getChain,
    getOwners,
    setNftResell,
    setNftCustom,
    setTokenCol,
    setNftCol,
    setRpc,
    chain,
    getChainName,
    rpc,
    getRpc,
    marketcol,
    getMarket,
    setMarket,
    nftcol, getNftCol,
    cri,setTokenCri,
    nftcustom, getNftCustom,
    nftresell, getNftResell, } = useStateContext();
  const [uid,setUid] = useState(null);
  const [created, getCreated] = useState([]);
  const [resalePrice, updateresalePrice] = useState({ price: ''});
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [tokId,setTokenId] = useState([]);
  const [show,setShow] = useState(false);
  const [showWallet,setWalletShow] = useState(false);
  const [showCont,setContShow] = useState(false);
  const [walletNft,setWalletNfts] = useState(false);
  const [personal,setPersonalNfts] = useState(true);
  const [personalactive,setPersonalActive] = useState(false);
  const [walletactive,setWalletActive] = useState(false);
  const [detoken,setToken] = useState(null);
  const [userdata,setData] = useState(null);

  //const [quote,setQuote] = useState('');
  const router = useRouter()  

  const {state,dispatch} = useContext(DataContext)
  const {auth} = state

  // console.log(auth)
  // console.log(userData.find(u => u.username == param))

  const profiledetail = userData.find(u => u.username == param)

  // async function populateQuate(){
  //   const req = await fetch('/api/quote',{
  //     headers:{
  //       'x-access-token': localStorage.getItem('token'),
  //     }
  //   })
  //   const data = req.json()
  //   if(data.status === 'ok'){
  //     setQuote(data.quote)
  //   }else{
  //     console.log(data.error)
  //   }
  // }
  useEffect(() => {    
    refreshNFTs();
    connectUser();
    getChain();
    setRpc()
    setUid(uniqid());
    getNfts();
    getOwners()
    setMarket()
    if(profiledetail.walletAddress == user){
      return;
    }else{
      dispatch({type:'NOTIFY',payload:{error: 'This wallet address does not match your account.'}})
      router.push('/')
    }
    const token = localStorage.getItem('token')
    if(token){
      const usertoken = jwt.decode(token)
      setToken(usertoken.email)
      if(!usertoken){
        localStorage.removeItem('token')
        router.push('/login')
      }
    }
  }, [getUser, getCreated,loadingState,getMarket,setNfts])


    // async function getWalletNFTs() {
    //   var address = hhnftcol
    //   var network = hhrpc
    //   const provider = new ethers.providers.JsonRpcProvider(network)
    //   const key = simpleCrypto.decrypt(cipherHH)//cipherEth
    //   const wallet = new ethers.Wallet(key, provider);
    //   const contract = new ethers.Contract(address, NFTCollection, wallet);
    //   const itemArray = [];
    //   contract.totalSupply().then(result => {
    //     for (let i = 0; i < result; i++) {
    //       var token = i + 1                         
    //       const owner = contract.ownerOf(token).catch(function (error) {
    //           //console.log("tokens filtered");
    //         });
    //       const rawUri = contract.tokenURI(token).catch(function (error) {
    //           //console.log("tokens filtered");
    //         });
    //       const Uri = Promise.resolve(rawUri)
    //       const getUri = Uri.then(value => {
    //         var cleanUri = value.replace('ipfs://', 'https://ipfs.io/ipfs/')
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
    //         Promise.resolve(owner).then(value => {
    //           let ownerW = value;
    //           let meta = {
    //             name: name,
    //             img: image,
    //             tokenId: token,
    //             wallet: ownerW,
    //             desc,
    //           }
    //           itemArray.push(meta)
    //         })
    //       })
    //     }
    //   })
    //   await new Promise(r => setTimeout(r, 2000));
    //   setNfts(itemArray)
    //   setLoadingState('loaded');
    // }

  async function getCreatedNFTs() {
      var network = rpc
      var address = nftcustom
      const provider = new ethers.providers.JsonRpcProvider(network)
      const key = simpleCrypto.decrypt(cipherEth)//cipherEth
      const wallet = new ethers.Wallet(key, provider);
      const contract = new ethers.Contract(address, NFT, wallet);
      const itemArray = [];
      contract._tokenIds().then(result => {
        for (let i = 0; i < result; i++) {
          let token = i + 1                         
          const owner = contract.ownerOf(token).catch(function (error) {
              //console.log("tokens filtered");
            });
          const rawUri = contract.tokenURI(token).catch(function (error) {
              //console.log("tokens filtered");
            });
          const Uri = Promise.resolve(rawUri)
          const getUri = Uri.then(value => {
            let cleanUri = value.replace('ipfs://', 'https://ipfs.io/ipfs/')
            let metadata = axios.get(cleanUri).catch(function (error) {
              //console.log(error.toJSON());
            });
            return metadata;
            
          })
          getUri.then(value => {
            //console.log("price",value.data.price);
            let rawImg = value.data.image
            let type = value.data.fileType
            let website = value.data.website
            let blockchain = value.data.wichNet
            let name = value.data.name
            let desc = value.data.description
            let price = value.data.price
            let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
            Promise.resolve(owner).then(value => {
              let ownerW = value;
              let meta = {
                name: name,
                img: image,
                type:type,
                blockchain:blockchain,
                website:website,
                tokenId: token,
                wallet: ownerW,
                description:desc,
                price:price,
              }
              //console.log(meta)
              itemArray.push(meta)
            })
          })
        }

      })
      await new Promise(r => setTimeout(r, 2000));
      getCreated(itemArray)
      setLoadingState('loaded');
    }

    async function refreshNFTs(){
      connectUser();
      getChain();
      setRpc();
      getCreatedNFTs();
      //getWalletNFTs();
    }

    // useEffect(() => {
    //   if(Object.keys(auth).length === 0) router.push("/")
    // }, [auth])
    if (loadingState === 'loaded' && !nfts.length){
      return (
      <div className='flex justify-center items-center p-20 h-screen'>
        <h1 className='text-slate-50 text-2xl font-bold'>{loadingState === 'loaded' ? <div className='w-36 h-36 border-dotted rounded-full animate-spin bg-transparent border-t-8 p-5'>&nbsp;</div> : <h1>No NFT's Found, Connect Wallet</h1>}</h1>
      </div>
    )}
return (
  <div className='flex-col justify-center pb-20 items-center h-full'>

  <div className='w-full flex relative pt-20 items-center overflow-hidden'>
    <div className='flex-col justify-between items-center'>
    
    <div className='justify-center items-center cursor-pointer'>
    {profiledetail.profile.banner
     ? <img src={profiledetail.profile.banner} className="w-full h-[500px] object-cover"/>
     : <div className='bg-gradient-to-tr to-teal-800 from-blue-900 hover:opacity-70 w-[1920px] h-[500px]'>&nbsp;</div>
    }
    </div>

    <div className='flex-col justify-between items-center'>

    <div className='flex justify-start items-center'>
    <div className='flex justify-start items-center w-36 p-3 border-2 border-purple-600 rounded-full relative left-36 bottom-20 cursor-pointer overflow-hidden'>
    <img src={profiledetail.profile.avatar} alt="Profile" className='object-contain rounded-full z-40 hover:opacity-70 w-full ' />
    </div>
    <div className='flex items-center antialiased'>
    <div className={profiledetail.root == true ? 'relative flex items-center gap-x-2 left-36 bottom-10 py-2 px-3 text-yellow-500 text-xl font-bold' : 'relative flex items-center gap-x-2 left-36 bottom-10 py-2 px-3 text-slate-400 text-xl font-bold'}>{profiledetail.username} {profiledetail.role == "verified" ? <MdVerified size={22} title="Verified" className={profiledetail.root == true ? "cursor-pointer text-yellow-500" : "cursor-pointer text-purple-600"}/>:null}
    {/*  
    <div className='flex justify-center items-center bg-slate-900 hover:bg-slate-800 rounded-lg py-1 px-3 text-sm cursor-pointer ml-6'>
      <span className='text-lg text-slate-400'>Follow</span>
      </div>
    
      <div className='flex justify-center items-center bg-slate-900 hover:bg-slate-800 rounded-lg py-1 px-3 text-sm cursor-pointer'>
      <span className='flex justify-center items-center gap-x-1 text-lg text-slate-400'><TbMessageCircle2 size={22}/>Message</span>
      </div>
    */}
    </div>
    </div>
    </div>

    <div className='flex relative bottom-10 justify-around items-center w-full pb-10 px-12 z-30'>
    <div className='flex w-full h-[100px] mx-20'>
    <p className='text-lg antialiased'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac turpis eget sem sagittis bibendum. Mauris viverra sapien enim, ut tristique ipsum bibendum a.</p>
    </div>
    <div className='grid grid-cols-3 gap-x-3 justify-start items-center antialiased w-full'>
    <div className='flex-col text-center justify-center items-center rounded-lg bg-gradient-to-t to-slate-900 from-transparent hover:opacity-70 px-7 text-slate-400 cursor-pointer'>
    <h1 className='text-xl font-bold pt-2'>Volume</h1>
    <p>140 ETH</p>
    </div>
    <div className='flex-col text-center justify-center items-center rounded-lg bg-gradient-to-t to-slate-900 from-transparent hover:opacity-70 px-7 text-slate-400 cursor-pointer'>
    <h1 className='text-xl font-bold pt-2'>NFTs</h1>
    <p>10 K</p>
    </div>
    <div className='flex-col text-center justify-center items-center rounded-lg bg-gradient-to-t to-slate-900 from-transparent hover:opacity-70 px-7 text-slate-400 cursor-pointer'>
    <h1 className='text-xl font-bold pt-2'>Owners</h1>
    <p>3.90 %</p>
    </div>
    </div>

    <div className='flex justify-end items-start text-slate-400 w-full mr-20'>
    <div className='grid grid-row-2 justify-center items-center'>
    <h1 className='text-center font-bold text-lg py-3'>Social Media</h1>
    <div className='flex justify-center items-center text-center gap-x-4'>
    <span><BsInstagram size={22} className="hover:text-white cursor-pointer" /></span><span><BsTwitter size={22} className="hover:text-white cursor-pointer" /></span>
    </div>
    </div>
    </div>

    </div>

    </div>

    </div>
  </div>

  <div className='flex-col justify-between items-center px-12'>
  <div className='flex-col justify-between items-center'>

    <div className='flex justify-between items-start gap-6 py-3 lg:px-10 md:px-7 sm:px-3 bg-gradient-to-t to-slate-900 from-transparent rounded-xl lg:w-full md:w-screen sm:w-full'>
      <div className='flex-col justify-start w-full'>
      <div className='flex'>
      <button onClick={() => {setPersonalNfts(true),setWalletNfts(false)}} className='transition-all text-lg font-medium text-slate-50 my-3 cursor-pointer bg-slate-900 px-3 py-2 w-48 text-center rounded-lg border-[1px] border-slate-800 hover:border-purple-500 hover:text-purple-500 h-22' onMouseLeave={()=> setContShow(false)} onMouseOver={() => setContShow(!showCont)}>Created {showCont ?<h5 className='text-slate-400 text-sm'> {contAdr.slice(0,18)}...</h5>:null}</button>
      {/*<h4 className='text-lg font-medium text-slate-50 my-3 mx-10'>Collection Contract Address <h5 className='text-slate-400 text-sm'> {contAdr.slice(0,18)}...</h5></h4>*/}
      <button onClick={() => {setWalletNfts(true),setPersonalNfts(false)}} className='transition-all text-lg font-medium text-slate-50 my-3  mx-5 cursor-pointer bg-slate-900 px-3 py-2 w-48 text-center rounded-lg border-[1px] border-slate-800 hover:border-purple-500 hover:text-purple-500 hover:h-22' onMouseLeave={()=> setWalletShow(false)} onMouseOver={() => setWalletShow(!showWallet)}>NFT's in Wallet  {showWallet ? <h5 className='text-slate-400 text-sm'> {user.slice(0,18)}...</h5>:null}</button>

      </div>
        
      <div className='flex gap-x-2 my-3 transition-all'>
        <button onPress={refreshNFTs} className="outline-none bg-slate-800 text-sm font-bold py-1 px-3 rounded-lg text-slate-600 z-10 hover:before:content-['Refresh'] hover:before:absolute hover:before:py-1 hover:w-32 hover:before:block hover:before:ml-10 "><BiRefresh size={28} className="active:animate-spin"/></button>
      </div> 
      
      </div>
      <div className='z-10'>
      <ConnectChain/>
      </div>
    </div>
{walletNft ? (
  <div className='flex justify-center items-center p-7 my-5'>
  {walletNft && <div className='w-[1520px] flex justify-center items-center'><h1 className='text-3xl font-light my-3 text-slate-400'>COMING SOON...</h1></div>}
  <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 lg:gap-4 md:gap-3 sm:gap-2 '>

   {nfts.slice(0,9).map((nft,uid) => {
        if (nft) {
            async function executeRelist() {
                const { price } = resalePrice;
                if (!price) return;
                try {
                    relistNFT();
                } catch (error) {
                    //console.log('Transaction Failed', error);
                }
            }
          async function relistNFT() {
            // let amount = 900000000000;
            // var resell = hhresell;
            // const web3Modal = new Web3Modal();
            // const connection = await web3Modal.connect()
            // const provider = new ethers.providers.Web3Provider(connection);
            // const signer = provider.getSigner();
            // const price = new ethers.utils.parseUnits(resalePrice.price, 'ether')
            // const tokenId = Number(nft.tokenid.slice(65))
            // let cosmeta = new ethers.Contract(hhtoken,Token,signer)
            // await cosmeta.approve(resell,amount)
            // await cosmeta.approve(user,amount)
            // const contractnft = new ethers.Contract(nft.contractAddres, NFTCollection, signer);
            // await contractnft.setApprovalForAll(resell, true);
            // let contract = new ethers.Contract(resell, Resell, signer)
            // let listingFee = await contract.getListingFee()
            // listingFee = listingFee.toString()
            // await cosmeta.increaseAllowance(resell, ethers.utils.parseEther(listingFee.toString()))
            // let transaction = await contract.listSale(nft.contractAddres,tokenId, price, { value: listingFee })
            // await transaction.wait()
            // router.push('/')

            let amount = 900000000000;
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const price = new ethers.utils.parseUnits(resalePrice.price, 'ether')
            const tokenId = Number(nft.tokenid.slice(65))
            let cosmeta = new ethers.Contract(cri,Token,signer)
            let contractnft = new ethers.Contract(nftcustom, NFT, signer)
            let create = await contractnft.createNFT(nfts.map(i => i.tokenUri))
            await contractnft.setApprovalForAll(marketcol, true);
            await cosmeta.approve(marketcol,amount)
            await cosmeta.approve(user,amount)
            const marketcontract = new ethers.Contract(marketcol, Market, signer)
            let listingFee = await marketcontract.getListingFee()
            listingFee = listingFee.toString()
            await cosmeta.increaseAllowance(marketcol, ethers.utils.parseEther(listingFee.toString()))
            await marketcontract.createVaultItem(nft.contractAddres, tokenId, price, {value: listingFee })
            router.push('/')
        }
          return (  
            <motion.div initial={{y:0}} animate={{y:-20}} transition={{duration:2,ease:'easeInOut'}} key={uid} className="hidden ease-in-out transition-all w-[300px] hover:relative hover:bottom-2 overflow-hidden border-2 border-slate-800 border-r-slate-700 rounded-xl hover:shadow-2xl hover:shadow-purple-900">
              <a>
                <div className='bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 cursor-pointer'>
                {nft.type == 'video/mp4'
                ? <video src={nft.image} className="rounded-t-xl w-full h-[296px]" autoPlay muted loop/>
                : nft.type == 'image/png' || 'image/jpeg' ? <img className='rounded-t-xl object-cover' src={nft.image} />
                : nft.type == 'audio/mp3' || 'audio/wav' ? <AudioPlayer nft={nft.image} nftname={nft.name}/> : null
                }
                  <div className='flex-col px-5'>
                  <div className='flex justify-between items-center w-full my-3'>
                  
                    <div className="justify-start items-center w-full">
                    <h5 className='flex items-center gap-x-2 text-lg font-bold text-slate-500' title={`NFT Name : ${nft.name}`} key={uid} >{nft.name}</h5>

                    </div>

                    <div className='flex justify-end items-center w-full'>
                      <h3 className='font-medium text-sm text-center bg-slate-800 text-slate-500 py-1 px-3 rounded-md' key={uid}>Token ID : {nft.tokenid.slice(65)}</h3>
                    </div>

                  </div>
                  <h3 className="text-md font-medium text-purple-500 my-6" title='Wallet Address'>{user.slice(0,8)}...</h3>
                    {/*<p>{nft.desc}</p>*/}
                  <div className='flex-col justify-center items-center'>
                  <input type="text" placeholder='Set your Price' onChange={e => updateresalePrice({ ...resalePrice, price: e.target.value })} className="rounded-lg bg-slate-800 text-slate-400 w-64 py-1 px-3"/>
                  <button className='w-64 rounded-lg text-slate-50 bg-gradient-to-tl to-purple-400 from-blue-500 hover:to-purple-600 hover:from-blue-700 my-3 py-1 px-7 lg:text-lg md:text-md sm:text-sm' onClick={executeRelist}>Relist for Sale</button>
                  </div>
                  </div>
                </div>
              </a>

            </motion.div>
          )
 }})}
    </div>

    </div>
) : null}
    </div>
{personal ? (
<div className='flex-col justify-between items-center '>
{personal && <div className='flex justify-center items-center'><h1 className='text-3xl font-light my-3 text-slate-400'>Created NFT's</h1></div>}
<div className='p-7 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>

    
  {created.map((nft) => {
          return (

            <CreatedNfCard blockchain={nft.blockchain} type={nft.type} img={nft.img} tokenId={nft.tokenId} name={nft.name} desc={nft.description} price={nft.price} key={nft.tokenId}/>

            )
        })}
    </div>
    </div>
) : null}
</div>
</div>
)
}
export default Profile
export const getServerSideProps = async (context) => {

  const res = await fetch(`http://localhost:3000/api/users/`)
  const userData = await res.json();
  const param = context.params.profile

  return{
      props:{
          userData,
          param
      }
  }
}