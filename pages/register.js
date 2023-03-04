/* eslint-disable react-hooks/exhaustive-deps */
import React,{ useState,useContext,useEffect } from "react";
//import { AuthContext } from "../context/AuthContext";
//import { useForm } from "../utils/hooks";
//import { useMutation } from "@apollo/react-hooks";
//import { gql } from "apollo-server-micro";
import { useRouter } from "next/router";
import {TiTick} from 'react-icons/ti';
//import uniqid from 'uniqid';
import valid from "../utils/valid";
// const REGISTER_USER = gql`
//   mutation Mutation(
//       $registerInput: RegisterInput
//     ){
//         registerUser(
//           registerInput: $registerInput
//         ){
//             email
//             username
//             token
//         }
//     }
// `;
import { useStateContext } from "../context/StateContext";
import { DataContext } from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import Image from "next/image";
import giphy from '../images/giphy.gif'
const Register = () => {
  const {user,getUser,connectUser,} = useStateContext();
    useEffect(()=>{
      connectUser();
    },[getUser])
    
    const initialState = {username: '',email:'',password:'',confPass:'',walletAddress:`${user}`,description:'Write something about your NFTs and about yourself.'}
    const [userData, setUserData] = useState(initialState)

    const {username,email,password,confPass,walletAddress,description} = userData
    const {state,dispatch} = useContext(DataContext)
    const {auth} = state
    const router = useRouter();
    //const [success,setSuccess] = useState(false);
    // const context = useContext(AuthContext);
    // const [errors,setErrors] = useState([]);
    
    const handleChangeInput = e => {
     const {name,value} = e.target
     setUserData({...userData,description,[name]:value})
     dispatch({ type: 'NOTIFY', payload: {} })
    }
    // function registerUserCallback(){
    //   console.log("Callback hit");
    //   registerUser();
    // }

    // const { onChange,onSubmit,values } = useForm(registerUserCallback,{
    //   username: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    // })

    // const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    //   update(proxy, { data: { registerUser: userData } }){
    //     context.login(userData);
    //     setUid(uniqid());
    //     setSuccess(true)
    //     router.push('/');
    //   },
    //   onError({ graphQLErrors }){
    //     setErrors(graphQLErrors);
    //   },
    //   variables: { registerInput: values }
    // });

    // require('dotenv').config();
    // const mongodb = process.env.MONGO_API;

    // async function createAccount(){
    //   const username = document.querySelector("[name=username]").value.toString()
    //   const email = document.querySelector("[name=email]").value.toString()
    //   const password = document.querySelector("[name=password]").value.toString()
    //   const confirmPassword = document.querySelector("[name=confirmPassword]").value.toString()
    //   var encryptedPassword = await bcrypt.hash(password, 10);
    //   var encryptedConfirmPassword = await bcrypt.hash(confirmPassword, 10);
    //   axios.post('https://data.mongodb-api.com/app/data-ocmyr/endpoint/data/v1/action/insertOne', {
    //   collection: 'users',
    //   database: 'cosdb',
    //   dataSource: 'Cluster0',
    //   document:{
    //     username: username,
    //     email: email,
    //     password: encryptedPassword,
    //     confirmPassword: encryptedConfirmPassword,
    //     }
    //   },
    //   {
    //     "Content-Type" : "application/json",
    //     "api-key" : mongodb,
    //   }).catch((error) => {
    //     console.log('Call failed: '+ error)
    //   })
    //   setSuccess(true)
    //   let displaysuccess = "Account Created Succesfully";
    //   document.getElementById("displayresult1").innerHTML = displaysuccess
    // }



  // implementation of newMealHandler function
  
  const registerHandler = async (e) => {
    e.preventDefault();

    const errMsg = valid(username, email, password, confPass)
    if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await postData('register',userData)

    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
    router.push('/login')
  }

    // use of Fetch API to make a request to the new-meal api and get back a response
    // await fetch("http://localhost:3000/api/register", {
    //   method: "POST",
    //   body: JSON.stringify(userData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // }).then(res => {
    //   if(!res.ok){
    //     throw new Error("HTTP ERROR",res.status)
    //   }

    //   return res
    // }).then(res => res.json()).then(data => {
    //   if(data) router.replace("/login");
    
    // })

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return (
        <div className="p-40 h-screen text-slate-900">
        <div className="flex justify-between items-center w-full">

          <div className="w-full">
          <div className="p-7 justify-center items-center w-[500px] rounded-xl border-slate-800 bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400 overflow-hidden">
          <div className="justify-center items-center w-full text-center my-2 antialiased">
          <h2 className="font-medium text-2xl">REGISTER</h2>
          <p className="font-light text-xl">Create a new account!</p>
          </div>
          
          <div className="grid grid-row-3 justify-center items-center my-10 px-10">
          <form method="post" onSubmit={registerHandler}>
          <label htmlFor="Username"><input onChange={handleChangeInput} type="text" value={username} name="username" id="username" placeholder="Username"  className="w-96 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 " /></label>
          <label htmlFor="Email"><input onChange={handleChangeInput} type="email" value={email} name="email" id="email" placeholder="E-mail"  className="w-96 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 "/></label>
          <label htmlFor="Password"><input onChange={handleChangeInput} type="password" value={password} name="password" id="password" placeholder="Password"  className="w-96 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 "/></label>
          <label htmlFor="confirmPassword"><input onChange={handleChangeInput} type="password" value={confPass} name="confPass" id="confPass"  placeholder="Confirm Password" className="w-96 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 "/></label>
          <button type="submit" className="bg-gradient-to-tr to-slate-800 from-blue-600 text-slate-400 my-2 py-2 rounded-lg hover:to-blue-900 hover:from-teal-600 w-96">Register</button>
          </form>
          </div>
          </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <Image src={giphy} alt="" className="object-cover z-40" />
            <div className="flex-col justify-center items-center text-center absolute px-10 py-2 border-2 border-dashed">
            <h1 className="relative top-5 text-[80px] font-black text-white antialiased animate-pulse">Discover</h1>
            <h1 className="relative z-40 text-[150px] font-black text-white antialiased">Rare</h1>
            <h1 className="relative text-[120px] font-light text-white antialiased animate-pulse">Pieces</h1>
            </div>
          </div>

        </div>
        </div>
    )
}

export default Register;
