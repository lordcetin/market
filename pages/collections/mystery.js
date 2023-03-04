import React,{useState,useEffect,Fragment} from "react";
import Media from "react-media";
import mysteryimg from '../../images/mysterybox.png';
import Image from "next/image";
import { useStateContext } from "../../context/StateContext";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { mmtoken,mmnftcol, fakecosmeta } from '../../engine/configuration';
import Token from '../../engine/Token.json';
import MysteryABI from '../../engine/Mystery.json';
import NFTCol from '../../engine/NFTCollection.json';
import {polyTest} from '../../engine/chainchange';
import FakeCosmeta from "../../engine/FakeCosmeta.json";
import next from "next"

const Mystery = () => {

    const {user,getUser,connectUser,rpc,nftcol,cri,} = useStateContext();

    useEffect(() => {
        connectUser()
    },[getUser])

    const [mmnfts,MumsetNfts] = useState([])
    const [numbers, setNumbers] = useState(Array.from({length: 1000}, (_, i) => i + 1));
  
    const [currentNumber, setCurrentNumber] = useState(null);
  
    const getNextNumber = () => {
      if (numbers.length === 0) {
        setCurrentNumber(null);
        return;
      }
      
      const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
      const nextNumber = shuffledNumbers.pop();
      setNumbers(shuffledNumbers);
      setCurrentNumber(nextNumber);
    };

    {/*currentNumber !== null ? <p>Current Number: {currentNumber}</p> : <p>No more NFTs</p>*/}

    const handleBuy = async () => {
        getNextNumber()
        const amount = 999999999999999;
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        // const price = ethers.utils.parseUnits('227', 'ether')
        // price = price.toString()
        let cos = new ethers.Contract(mmtoken,Token,signer);
        let nfts = new ethers.Contract(mmnftcol,NFTCol,signer);
        const fcosmeta = new ethers.Contract(fakecosmeta,FakeCosmeta,signer);

        await cos.approve(fakecosmeta,amount)
        console.log("USER",user)
        await cos.approve(user,amount)

        let nftprice = await fcosmeta.getListingFee();
        nftprice = nftprice.toString();
        console.log(nftprice)

        const gasPrice = new ethers.utils.parseUnits('50', 'gwei');
        const transaction = await fcosmeta.BuyWithTether({gasPrice:gasPrice,value: nftprice});
        await transaction.wait();

        await polyTest.wait();

        const tokenUri = await nfts.tokenURI(currentNumber)
        const meta = await axios.get(tokenUri)
        console.log("META",meta)

        let item = {

        }
        MumsetNfts(item)
    }

    console.log(mmnfts)

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
            <div className="flex justify-center items-center w-screen pt-20 px-3 pb-40">
                <div className="flex-col">

                    <div className="bg-slate-800 rounded-xl p-3">
                        <video src="https://nftstorage.link/ipfs/bafybeigi6bjj6dn3kk4f6lpbs5obxc2ijwiqzv5mmpuf4sjhcpijrtyb6a" autoPlay muted loop className="rounded-xl border-[1px] border-slate-700"/>
                        <div className="flex-col my-5 justify-start items-center">
                         <div className="flex items-center gap-x-2 px-2">
                            <h1 className="text-3xl font-bold text-slate-400 antialiased">Mystery Box<span className="relative text-sm font-medium left-2 bottom-1 text-slate-400">Cosmeta</span></h1>
                            <div className="flex items-center gap-x-2 border-[1px] border-slate-700 rounded-md py-1 pl-3">
                                <span className="text-slate-400 px-2">$99</span>
                                <button className="rounded-md px-5 py-2 bg-orange-500 text-slate-50 text-sm mr-1">Buy</button>
                            </div>
                        </div>
                        <div className="w-38 object-cover antialiased">
                            <p className="w-38 text-slate-400 my-3">Introducing the Mystery Box NFT! A unique and exciting opportunity to own a piece of the future of digital collectibles. This mystery box contains a one-of-a-kind NFT that will surprise and delight you. Here are some tips for making the most of your mystery box experience:</p>
                                <ul className="list-none">
                                    <li className="w-38 text-slate-400"><strong>Embrace the mystery:</strong> Part of the excitement of owning a mystery box NFT is not knowing what's inside. Embrace the unknown and trust that your mystery NFT will be worth the journey.</li>
                                    <li className="w-38 text-slate-400"><strong>Look for clues:</strong> The mystery box hints at the potential NFT inside through its art and design. Study the box and look for any clues that might give you an idea of what's to come.</li>
                                    <li className="w-38 text-slate-400"><strong>Connect with the community:</strong> Connect with other mystery box owners and share your experiences and findings. Who knows, you may discover something new and valuable through collaboration.</li>
                                    <li className="w-38 text-slate-400"><strong>Be patient:</strong> Patience is key when owning a mystery box NFT. The reward for waiting and building anticipation is an NFT that is sure to be unique and valuable.</li>
                                        <Image src={mysteryimg} alt="Cosmeta Mystery Box" className="rounded-lg object-cover"/>
                                    <li className="w-38 text-slate-400"><strong>Take a chance:</strong> Owning a mystery box NFT is an opportunity to take a chance on something new and different. Who knows what amazing NFT you might uncover?</li>
                                </ul>
                            <p className="w-38 text-slate-400 my-3">So what are you waiting for? Grab your Mystery Box NFT today and discover the excitement and value of owning a one-of-a-kind digital collectible!</p>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
            </Fragment>
        }
        {matches.medium &&
            <Fragment>
            </Fragment>
        }
        {matches.large &&
            <Fragment>
            <div className="flex justify-center items-center w-screen pt-20 px-40 pb-40">
            <div className="flex-col">
            
            <div className="bg-slate-800 rounded-xl p-3  w-full">
            <video src="https://nftstorage.link/ipfs/bafybeigi6bjj6dn3kk4f6lpbs5obxc2ijwiqzv5mmpuf4sjhcpijrtyb6a" autoPlay muted loop className="rounded-xl border-[1px] border-slate-700 w-full"/>
                <div className="flex-col my-5 justify-start items-center">
                <div className="flex justify-between items-center gap-x-2 px-2">
                <div>
                    <h1 className="text-5xl font-bold text-slate-400 antialiased">Mystery Box<span className="relative text-lg font-medium left-2 bottom-1 text-slate-400">Cosmeta</span></h1>
                    <span>{currentNumber}</span>
                </div>
                <div className="flex items-center gap-x-2 border-[1px] border-slate-700 rounded-md py-1 pl-3">
                    <span className="text-slate-400 px-2 text-lg">$99</span>
                    <button className="rounded-md px-5 py-2 bg-orange-500 text-slate-50 text-lg mr-1" onClick={handleBuy}>Buy</button>
                </div>

                    </div>
                    <div className="w-38 object-cover antialiased px-10 pt-10">
                        <p className="w-38 text-slate-400 my-3">Introducing the Mystery Box NFT! A unique and exciting opportunity to own a piece of the future of digital collectibles. This mystery box contains a one-of-a-kind NFT that will surprise and delight you. Here are some tips for making the most of your mystery box experience:</p>
                            <ul className="list-none">
                                <li className="w-38 text-slate-400"><strong>Embrace the mystery:</strong> Part of the excitement of owning a mystery box NFT is not knowing what's inside. Embrace the unknown and trust that your mystery NFT will be worth the journey.</li>
                                <li className="w-38 text-slate-400"><strong>Look for clues:</strong> The mystery box hints at the potential NFT inside through its art and design. Study the box and look for any clues that might give you an idea of what's to come.</li>
                                <li className="w-38 text-slate-400"><strong>Connect with the community:</strong> Connect with other mystery box owners and share your experiences and findings. Who knows, you may discover something new and valuable through collaboration.</li>
                                <li className="w-38 text-slate-400"><strong>Be patient:</strong> Patience is key when owning a mystery box NFT. The reward for waiting and building anticipation is an NFT that is sure to be unique and valuable.</li>
                                <div className="py-10 px-20">
                                    <Image src={mysteryimg} alt="Cosmeta Mystery Box" className="rounded-lg object-cover"/>
                                </div>    
                                <li className="w-38 text-slate-400"><strong>Take a chance:</strong> Owning a mystery box NFT is an opportunity to take a chance on something new and different. Who knows what amazing NFT you might uncover?</li>
                            </ul>
                        <p className="w-38 text-slate-400 my-3">So what are you waiting for? Grab your Mystery Box NFT today and discover the excitement and value of owning a one-of-a-kind digital collectible!</p>
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

export default Mystery;
