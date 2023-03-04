/*

  /$$$$$$                                                /$$              
 /$$__  $$                                              | $$              
| $$  \__/  /$$$$$$   /$$$$$$$ /$$$$$$/$$$$   /$$$$$$  /$$$$$$    /$$$$$$ 
| $$       /$$__  $$ /$$_____/| $$_  $$_  $$ /$$__  $$|_  $$_/   |____  $$
| $$      | $$  \ $$|  $$$$$$ | $$ \ $$ \ $$| $$$$$$$$  | $$      /$$$$$$$
| $$    $$| $$  | $$ \____  $$| $$ | $$ | $$| $$_____/  | $$ /$$ /$$__  $$
|  $$$$$$/|  $$$$$$/ /$$$$$$$/| $$ | $$ | $$|  $$$$$$$  |  $$$$/|  $$$$$$$
 \______/  \______/ |_______/ |__/ |__/ |__/ \_______/   \___/   \_______/
                                                                          
*/

import SimpleCrypto from "simple-crypto-js";
const { Buffer } = require("buffer");

const cipherKey = "0x$65468fgdag5645s6d4gsdgdsgdg5665448dsg4";
const ethraw = "0x5d99482ddbfc58c831022d1c9c6bc4fd0170465e05cf35d67b49250ef3a6cb1b"; // eth private key
const mmraw = "4d407a8733164fa00a0c4456731230b5d3779445f71dc0bd3073c777af710288"; // eth private key
const hhraw =  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // hardhat private key

export const simpleCrypto = new SimpleCrypto(cipherKey);
export const cipherEth = simpleCrypto.encrypt(ethraw);
export const cipherMM = simpleCrypto.encrypt(mmraw);
export const cipherHH = simpleCrypto.encrypt(hhraw);

// IPFS CONFIGURATION
import {create as ipfsHttpClient} from 'ipfs-http-client';

const projectId = "2FraJroGw9rXeeUTFgGRO7P7sFy";
const projectSecretKey = "0a5ffc989190cb176f8729872bfbf76d";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

export const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// HARDHAT TESTNET
export var hhnftcol = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319";
export var hhresell = "0x220a5D87A7Ee47C18616E563056C52595A8aaDE9";
export var hhmarket = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export var hhnft = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export var hhauction = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export var hhtoken = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export var hhrpc = "http://127.0.0.1:8545"//"https://mainnet.infura.io/v3/";

// GOERLI TESTNET
export var goenftcol = "0x6c176B32F693d420F64fb5fFAe14Ea93a19C0Cd4";
export var goeresell = "0xe48c0E89364B171b5DD44618611977376ea33740";
export var goemarket = "0x494A40553882df596afcE1348dE05cEB9A0d1091";
export var goeauction = "0xB4A6D67DF7dE9Ee0D6954e550Ca8B45C4c7D10fB";
export var goenft = "0x654112347E34eab559Ea0b175185438B47da1fF4";
export var goetoken = "0x8Af1c45aDe5EC4494AE64A019c35da99fBe182c7";
export var goerpc = "https://rpc.ankr.com/eth_goerli";

// BSC TESTNET
export var bsctnftcol = "0x22646942F753282AA6931c6C159f4d2AB1A7845a";
export var bsctresell = "0x4172CA3EEa130D9753E5EBc4d28C0F480eD7b920";
export var bsctmarket = "0x847C13Ca5fd3Ff58E0a6f8c294Da0c5022Bc58c4";
export var bsctauction = "";
export var bsctnft = "0x65A625b7bc221526b298c42959b88Ee36CD602Af";
export var bsctoken = "0x5A1499Db78697247da3C7ec00F19D414F7E20aB1";
export var bsctrpc = "https://data-seed-prebsc-1-s1.binance.org:8545";

/* MUMBAI */
export var mmnftcol   = "0xCcE87e5Ad8a82Ad7D9833b5354FD288aDb5352bF";
export var fakecosmeta = "0x2BeB51e7CaAA3937EEc769e7D8E59FC7e6F74bbd";
export var mmresell   = "0x4f540D42121F4B8B62BBe17fDE4ae011AC05aeF5";
export var mmystery   = "0xeA3349c6132fE6F0A4f6a51439cb809D7DDc4F87";
export var mmmarket   = "0x72632F053cF1065D9c0dFa659Ab3cF4fDc980A35";
export var mmauction  = "0xb316d990e1DA66Ba693b267f4E0306540eDb0F56";
export var mmnft      = "0xFaFdef4526f6cB48E98387904e7050D4C71737DB";
export var mmtoken    = "0x1A2E9915492a7f3B58b49B6F7fd2046eec36F951";
export var mmrpc      = "https://matic-mumbai.chainstacklabs.com";
let ipfsUri = "https://ipfs.io/ipfs/QmYZUtsQkPCdKnmS8ya6JmwtL8GKPnUmavcJ4DZkLAbz3p";
/*
NETWORK RPC ADDRESSES, Choose one then 
change the value of "hhrpc" below.
*/
// var mumbai = 'https://matic-mumbai.chainstacklabs.com';
// var goerli = 'https://rpc.ankr.com/eth_goerli';
// var binance = 'https://data-seed-prebsc-2-s3.binance.org:8545';

// //if you can change the hhrpc value goerli variable or "http://localhost:8545/"
// var hhrpc = "http://localhost:8545/";
// /*
// Global Parameters
// */
export var mainnet = mmrpc
