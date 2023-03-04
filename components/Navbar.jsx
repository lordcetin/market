import React,{useState,useEffect,useContext, Fragment} from "react";
import Image from "next/image";
import Link from "next/link";
import logo from '../public/logo.png';
import { useRouter } from "next/router";
import {Button,Grid,Input,Dropdown, Text, User} from '@nextui-org/react';
import { useStateContext } from "../context/StateContext";
import {BiSearch,BiUserCircle,BiMenu} from 'react-icons/bi';
import {MdClose,MdContentCopy} from 'react-icons/md';
import {AiOutlineUserAdd} from 'react-icons/ai';
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import NFT from '../engine/NFT.json';
import Market from '../engine/Market.json';
import Token from '../engine/Token.json';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import { cipherHH, cipherEth, simpleCrypto,client } from '../engine/configuration';
import axios from "axios";
import Avatar from "boring-avatars";
import Media from 'react-media';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Auction from '../engine/Auction.json'
const Navbar = (props) => {
  const router = useRouter()
  const {
    user,
    getUser,
    connectUser,
    CRIBalance,
    auction,
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
    owners,setOwners} = useStateContext();
    
  const {state,dispatch} = useContext(DataContext)
  const {auth} = state


  const [nav,setNav] = useState(false);
  const [searchmodal,setSearchModal] = useState(false);
  const [detoken,setToken] = useState(false);
  const [search,setSearch] = useState([]);
  const [val,setVal] = useState(false);
  const [openMenu,setOpenMenu] = useState(false)
  const [value,setValue] = useState('');
  const [copied,setCopied] = useState(false);

  const changeScroll = () => {
    if(scrollY >= 80){
      setNav(true)
    }else{
      setNav(false)
    }
  }

  const handleLogout = () => {
    Cookie.remove('refreshtoken', {path:'api/access_token'})
    localStorage.removeItem('firstLogin')
    dispatch({type: 'AUTH', payload:{}})
    dispatch({type: 'NOTIFY', payload:{success: 'Logged out!'}})
  }
  useEffect(()=>{
    window.addEventListener('scroll',changeScroll)
    const token = localStorage.getItem('firstLogin')
    if(token){
      setToken(token)
    }
  },[])

  const handleSearch = async (e) => {
    e.preventDefault();
    let val = e.target.value;
    setVal(val)
    const provider = new ethers.providers.JsonRpcProvider(rpc)
    const key = simpleCrypto.decrypt(cipherEth)
    const wallet = new ethers.Wallet(key, provider);
    const tokenContract = new ethers.Contract(nftcustom, NFT, wallet)
    const marketContract = new ethers.Contract(marketcol, Market, wallet)
    let auctioncontract = new ethers.Contract(auction, Auction, wallet)
    const nfts = await marketContract.getAvailableNft()
    const auctionnfts = await auctioncontract.getAllAuctions()
    const nftitems = await Promise.all(nfts.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let nftitem = {
        image: meta.data.image,
        name: meta.data.name,
      }
      return nftitem
    }))
    const auctionitems = await Promise.all(auctionnfts.map(async i => {
      const tokenUri = await auctioncontract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let auctionitem = {
        image: i.image,
        name: i.name,
      }
      return auctionitem
    }))
    setSearch(...nftitems,...auctionitems)
  }


  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  }

  const loggedRouter = () => {
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
      <Grid.Container justify="flex-center" gap={2}>
      <Grid>
        <Dropdown placement="bottom-center" >
          <Dropdown.Trigger>
          <div className="rounded-full overflow-hidden p-1 border-2 border-purple-600 flex justify-center items-center cursor-pointer">
          <img src={auth.user.avatar} alt="" className="w-7 h-7 rounded-full" />
          </div>
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="Avatar Actions" className="bg-slate-900">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
            <Link href={`/${auth.user.username}`}><a>
              <Text b color="inherit" css={{ d: "flex" }}>
                {auth.user.username}
              </Text>
              <Text color="inherit" css={{ d: "flex" }} className="text-sm">
                {auth.user.email}
              </Text></a></Link>
            </Dropdown.Item>
            <Dropdown.Item key="wallet" withDivider>
            <button className="flex" onClick={!user.length ? connectUser : null} auto>{!user.length ? "Connect Wallet" : `Wallet : ${user.slice(0,5) + '...' + user.slice(38)}`}</button>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              Settings
            </Dropdown.Item>
            <Dropdown.Item key="system">Earn</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              <Link href="https://help.cos-in.com"><a>Help & Feedback</a></Link>
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider >
              <span onClick={handleLogout}>Log Out</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
      </Fragment>
      }
    </Fragment>
    )}
    </Media>
    </div>
    )
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
//********************** SMALL *******************************
    <Fragment>
      <div className={nav ? "flex justify-between items-center w-full h-[50px] bg-gradient-to-tr to-slate-600 from-slate-900 fixed z-40 transition-all" : "flex justify-between items-center w-full h-[80px] fixed z-40 transition-all"}>
        
      <div className="w-full py-1 px-2">
        <a href="/"><Image src={logo} alt="Cosmeta INC" className={nav ? "scale-75 object-cover w-full": "object-cover"}/></a>
      </div>
      <div className="w-full px-2">
        <div className={nav ? 'flex justify-center items-center w-full' : 'flex justify-center items-center w-full'}>
          <input type="search" onChange={handleSearch} onClick={() => setSearchModal(true)} onBlur={() => setSearchModal(false)} name="search" id="search" placeholder="Search" className={nav ? "bg-slate-900 placeholder:text-slate-400 outline-none py-[6px] px-3 w-36 rounded-l-lg text-slate-400" : "bg-slate-500 opacity-40 placeholder:text-sm placeholder:text-slate-900 outline-none py-[6px] px-3 w-36 h-7 rounded-l-lg text-slate-900"} /><button type="submit" onClick={handleSearchSubmit} className={nav ? "outline-none py-[9px] px-2 rounded-r-lg bg-slate-900" : "opacity-40 outline-none h-7 px-2 rounded-r-lg bg-slate-500"}><BiSearch size={18} className={nav ? "text-slate-400" : "text-slate-900"}/></button></div>
      </div>
      <div className="w-30 justify-end items-center text-right px-3">
      <BiMenu size={30} className="inline-block cursor-pointer hover:opacity-50" onClick={() => setOpenMenu(!openMenu)}/>
      </div>

      </div>
      {openMenu &&
        <div className="fixed top-0 left-0 bg-slate-900 w-screen h-screen z-50">
        <div className="w-full text-slate-400 z-50">
        <MdClose size={30} className="text-slate-400 z-50 cursor-pointer m-7 hover:opacity-50" onClick={() => setOpenMenu(false)}/>
        <div className="flex-col justify-center items-center text-center z-50 w-full">
        <div className="my-3"><Link href='/' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Home</a></Link></div>
        <div className="my-3"><Link href='/explore' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Explore</a></Link></div>
        <div className="my-3"><Link href='/create' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Create</a></Link></div>
        {/*<Link href='/profile'><a><BiUserCircle size={22}/></a></Link>*/}
        {Object.keys(auth).length === 0
           ? <div className="my-3"><Link href='/login' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Login</a></Link></div>
          : <div className="my-3">
              <div className="flex justify-center items-center my-3 py-2 bg-slate-800 w-full"><span className="text-slate-400 text-xl flex items-center gap-x-2" >CRI Balance : {CRIBalance}</span></div>
              <div className="flex justify-center items-center my-3 py-2 bg-slate-800 w-full gap-x-2"><span className="text-slate-400 text-xl flex items-center" value={value} onChange={({target: {value}}) => setValue(value)} onClick={!user.length ? connectUser : null} auto>{!user.length ? "Connect Wallet" : `Wallet : ${user.slice(0,5) + '...' + user.slice(38)}`}</span>{user.length && <CopyToClipboard text={user} onCopy={() => setCopied(true)}><button><MdContentCopy/></button></CopyToClipboard>}</div>
              <div className="my-3"><Link href='/settings' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Settings</a></Link></div>
              <div className="my-3"><Link href='/earn' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Earn</a></Link></div>
              <div className="my-3"><Link href='https://help.cos-in.com' className=" z-50"><a className="text-3xl hover:opacity-50" onClick={() => setOpenMenu(false)}>Help & Feedback</a></Link></div>
              <div className="mt-6" onClick={handleLogout}><span className="text-3xl hover:opacity-50 bg-red-300 rounded-md border-2 border-red-900 px-5 py-2 text-red-900" onClick={() => setOpenMenu(false)}>Log Out</span></div>
              <div className="fixed bottom-0 w-full overflow-hidden flex justify-center items-center cursor-pointer gap-x-2 bg-purple-300 border-2 border-purple-600 py-3 rounded-lg">

                <img src={auth.user.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-purple-600" /><Link href={`/${auth.user.username}`} className=" z-50"><a className="text-3xl hover:opacity-50 text-purple-700" onClick={() => setOpenMenu(false)}>{auth.user.username}</a></Link>

              </div>

            </div>
        }
        </div>
      </div>
      </div>
      }
      {searchmodal ? (

        <div className={nav ? "fixed z-50 top-12 mt-1 bg-slate-900 w-full h-18 rounded-xl py-3 px-5 gap-y-2" : "fixed z-50 top-16 bg-slate-900 w-full h-18 rounded-xl py-3 px-5 gap-y-2"}>
        {!val
        ? 
          <span className="flex w-full justify-center items-center text-center my-5">Search NFTs</span>
        :<div>
        <div className="text-slate-400">
        <ul>
        {search.name ? (
          <div>
              <li className="border-[0.5px] border-slate-800 py-2 px-3 my-2 rounded cursor-pointer hover:bg-slate-800"><div className="flex items-center gap-x-2"><img src={search.image} className="w-12 rounded-lg object-cover" /><span>{search.name}</span></div></li>
          </div>
          ): <span>No Match</span>
        }
          
        </ul>
        </div>
        </div>
        }
        </div>
        ) : null}
    </Fragment>
//******************* END SMALL ******************************
      }
      
      {matches.medium &&
//********************** MEDIUM *******************************
    <Fragment>
    {chain == 'Mumbai Testnet' ? <div className="fixed w-full flex justify-center items-center bottom-0 left-0 z-50 bg-orange-500 h-10"><center className="text-sm antialiased">Your wallet is connected to the testnet ({chain}). Please switch to ethereum mainnet.</center></div> : null}
      <div className={nav ? "flex justify-center items-center p-7 w-full h-[50px] bg-gradient-to-tr to-slate-600 from-slate-900 fixed z-50 transition-all" : "flex justify-center items-center p-7 w-full h-[80px] rounded-t-xl fixed z-50 transition-all"}>
        <div className="flex justify-between items-center w-full">

          <div className="flex justify-start items-center w-full px-10">
            <a href="/"><Image src={logo} alt="Cosmeta INC" width={250} height={25} className={nav ? "scale-75 object-cover": "scale-100 object-cover"}/></a>
            <div className={nav ? 'ml-12 flex justify-center items-center' : 'ml-12 flex justify-center items-center'}><input type="search" onChange={handleSearch} onClick={() => setSearchModal(true)} onBlur={() => setSearchModal(false)} name="search" id="search" placeholder="Search" className={nav ? "bg-slate-900 placeholder:text-slate-400 outline-none py-[6px] px-3 w-72 rounded-l-lg text-slate-400" : "bg-slate-500 opacity-40 placeholder:text-slate-900 outline-none py-[6px] px-3 w-72 rounded-l-lg text-slate-900"} /><button type="submit" onClick={handleSearchSubmit} className={nav ? "outline-none py-[8px] px-2 rounded-r-lg bg-slate-900" : "opacity-40 outline-none py-[8px] px-2 rounded-r-lg bg-slate-500"}><BiSearch size={20} className={nav ? "text-slate-400" : "text-slate-900"}/></button></div>
          </div>

          <div className={nav ? "flex justify-end items-center w-full text-sm text-slate-100 gap-x-10 px-10":"flex justify-end items-center w-full text-slate-100 gap-x-10 px-10"}>
            <Link href='/'><a>Home</a></Link>
            <Link href='/explore'><a>Explore</a></Link>
            <Link href='/create'><a>Create</a></Link>
            {/*<Link href='/profile'><a><BiUserCircle size={22}/></a></Link>*/}
            {Object.keys(auth).length === 0
               ? <Link href='/login'><a>Login</a></Link>
              : loggedRouter()
            }

          </div>

        </div>
      </div>
      {searchmodal ? (
        <div className="fixed z-50 top-16 left-80 bg-slate-900 w-96 rounded-xl py-3 px-5 gap-y-2">
        {!val
        ? 
        <div className="grid gap-y-2">
        <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Explore</div>
          <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Top NFT's</div>
          <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Top Artists</div>
          <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Top Collections</div>
        </div>

        :<div>
        <div className="text-slate-400">
        <ul>
        {search.name ?
          <li className="border-[0.5px] border-slate-800 py-2 px-3 my-2 rounded cursor-pointer hover:bg-slate-800"><div className="flex items-center gap-x-2"><img src={search.image} className="w-12 rounded-lg object-cover" /><span>{search.name}</span></div></li>
          : <span>No Match</span>
        }
          
        </ul>
        </div>
        </div>
        }
        </div>
        ) : null}
    </Fragment>
//******************* END MEDIUM ******************************
      }
      
      {matches.large &&
//********************** LARGE *******************************
    <Fragment>
    {/*chain == 'Mumbai Testnet' ? <div className="fixed w-full flex justify-center items-center bottom-0 left-0 z-50 bg-orange-500 h-10"><center className="text-sm antialiased">Your wallet is connected to the testnet ({chain}). Please switch to ethereum mainnet.</center></div> : null*/}
      <div className={nav ? "flex justify-center items-center p-7 w-full h-[50px] bg-gradient-to-tr to-slate-600 from-slate-900 fixed z-[999] transition-all" : "flex justify-center items-center p-7 w-full h-[80px] rounded-t-xl fixed z-[999] transition-all"}>
        <div className="flex justify-between items-center w-full">

          <div className="flex justify-start items-center w-full px-10">
            <a href="/"><Image src={logo} alt="Cosmeta INC" width={250} height={25} className={nav ? "scale-75 object-cover": "scale-100 object-cover"}/></a>
            <div className={nav ? 'ml-12 flex justify-center items-center' : 'ml-12 flex justify-center items-center'}><input type="search" onChange={handleSearch} onClick={() => setSearchModal(true)} onBlur={() => setSearchModal(false)} name="search" id="search" placeholder="Search" className={nav ? "bg-slate-900 placeholder:text-slate-400 outline-none py-[6px] px-3 w-72 rounded-l-lg text-slate-400" : "bg-slate-500 opacity-40 placeholder:text-slate-900 outline-none py-[6px] px-3 w-72 rounded-l-lg text-slate-900"} /><button type="submit" onClick={handleSearchSubmit} className={nav ? "outline-none py-[8px] px-2 rounded-r-lg bg-slate-900" : "opacity-40 outline-none py-[8px] px-2 rounded-r-lg bg-slate-500"}><BiSearch size={20} className={nav ? "text-slate-400" : "text-slate-900"}/></button></div>
          </div>

          <div className={nav ? "flex justify-end items-center w-full text-sm text-slate-100 gap-x-10 px-10":"flex justify-end items-center w-full text-slate-100 gap-x-10 px-10"}>
            <Link href='/'><a>Home</a></Link>
            <Link href='/explore'><a>Explore</a></Link>
            <Link href='/create'><a>Create</a></Link>
            {/*<Link href='/profile'><a><BiUserCircle size={22}/></a></Link>*/}
            {Object.keys(auth).length === 0
               ? <Link href='/login'><a>Login</a></Link>
              : loggedRouter()
            }

          </div>

        </div>
      </div>
      {searchmodal ? (
        <div className="fixed z-50 top-16 left-80 bg-slate-900 w-96 rounded-xl py-3 px-5 gap-y-2">
        {!val
        ? 
        <div className="grid gap-y-2">
        <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Explore</div>
          <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Top NFT's</div>
          <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Top Artists</div>
          <div className="border-[1px] border-slate-800 py-2 px-5 text-slate-400 hover:bg-slate-800 cursor-pointer hover:text-slate-50 rounded-full">Top Collections</div>
        </div>

        :<div>
        <div className="text-slate-400">
        <ul>
        {search.name ?
          <li className="border-[0.5px] border-slate-800 py-2 px-3 my-2 rounded cursor-pointer hover:bg-slate-800"><div className="flex items-center gap-x-2"><img src={search.image} className="w-12 rounded-lg object-cover" /><span>{search.name}</span></div></li>
          : <span>No Match</span>
        }
          
        </ul>
        </div>
        </div>
        }
        </div>
        ) : null}
    </Fragment>
//******************* END LARGE ******************************
      }

    </Fragment>
    )}
    </Media>
    </div>
    );
};

export default Navbar;
