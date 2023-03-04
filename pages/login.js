import React,{useContext,useState,useEffect, Fragment} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookie from 'js-cookie';
import { DataContext } from '../store/GlobalState'
import { postData } from "../utils/fetchData";
import Media from "react-media";
const Login = () => {
  
  const initialState = {username:'',password:''}
  const [userData, setUserData] = useState(initialState)
  const {username,password} = userData
  const {state,dispatch} = useContext(DataContext)
  const { auth } = state
  const router = useRouter();
  //const [logData,setLogData] = useState(null);
  //const [success,setSuccess] = useState(false);

  const handleChangeInput = e => {
    const {name,value} = e.target
    setUserData({...userData,[name]:value})
    dispatch({ type: 'NOTIFY', payload: {} })
   }

  const loginHandler = async (e) => {
    e.preventDefault();
    //console.log(userData)

    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await postData('login', userData)

    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
    
    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    }})

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  };
  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])
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
    <div className="flex justify-center items-center w-full h-screen">

    <div className="relative bottom-10 z-[60]">

    <div className="flex-col z-30 justify-center items-center w-72 rounded-lg p-7 bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400">
    <div className="justify-center items-center w-full text-center my-2 antialiased">
    <h2 className="font-medium text-2xl">LOGIN</h2>
    <Link href='/register'><a className="font-light text-sm hover:underline">Create a new account!</a></Link>
    </div>
    
    <div className="grid grid-row-3 justify-center items-center mb-10">
    <form onSubmit={loginHandler}>
    <label htmlFor="Username"><input type="text" value={username} onChange={handleChangeInput} name="username" required id="username" placeholder="Username" className="w-60 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 " /></label>
    <label htmlFor="Password"><input type="password" value={password} onChange={handleChangeInput} name="password" required id="password" placeholder="Password" className="w-60 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 "/></label>
    <button type="submit" className="w-60 bg-gradient-to-tr to-slate-800 from-blue-600 text-slate-400 my-2 py-2 rounded-lg hover:to-blue-900 hover:from-teal-600">Login</button>
    </form>
    </div>
    </div>
    
    </div>

    <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-40 ">
    <iframe className="PhotoZoom_iframe__LeuQM w-full h-screen fixed z-20 scale-150 blur-2xl rounded-full saturate-100" allowFullScreen="" frameBorder="0" src="//player.vimeo.com/video/471585055?title=0&amp;horizontal=1&amp;byline=1&amp;autoplay=true&amp;muted=true&amp;loop=true" __idm_id__="27967492"></iframe>
    </div>

    </div>

      </Fragment>
      }

      {matches.medium && 
        <Fragment>
    <div className="flex justify-center items-center w-full h-screen">

    <div className="flex-col z-40 justify-center items-center w-96 rounded-lg p-7 bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400">
    <div className="justify-center items-center w-full text-center my-2 antialiased">
    <h2 className="font-medium text-2xl">LOGIN</h2>
    <Link href='/register'><a className="font-light text-sm hover:underline">Create a new account!</a></Link>
    </div>
    
    <div className="grid grid-row-3 justify-center items-center mb-10">
    <form onSubmit={loginHandler}>
    <label htmlFor="Username"><input type="text" value={username} onChange={handleChangeInput} name="username" required id="username" placeholder="Username" className="w-80 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 " /></label>
    <label htmlFor="Password"><input type="password" value={password} onChange={handleChangeInput} name="password" required id="password" placeholder="Password" className="w-80 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 "/></label>
    <button type="submit" className="w-80 bg-gradient-to-tr to-slate-800 from-blue-600 text-slate-400 my-2 py-2 rounded-lg hover:to-blue-900 hover:from-teal-600">Login</button>
    </form>
    </div>
    </div>
    <div className="fixed w-full h-screen top-0 left-0 bg-black opacity-40">
    <iframe className="PhotoZoom_iframe__LeuQM w-full h-screen fixed z-20 blur-2xl rounded-full saturate-100" allowFullScreen="" frameBorder="0" src="//player.vimeo.com/video/471585055?title=0&amp;horizontal=1&amp;byline=1&amp;autoplay=true&amp;muted=true&amp;loop=true" __idm_id__="27967492"></iframe>
    </div>
    </div>
      </Fragment>
      }

      {matches.large && 
        <Fragment>
    <div className="flex justify-center items-center w-full h-screen">

    <div className="flex-col z-40 justify-center items-center w-96 rounded-lg p-7 bg-gradient-to-tr to-slate-600 from-slate-900 text-slate-400">
    <div className="justify-center items-center w-full text-center my-2 antialiased">
    <h2 className="font-medium text-2xl">LOGIN</h2>
    <Link href='/register'><a className="font-light text-sm hover:underline">Create a new account!</a></Link>
    </div>
    
    <div className="grid grid-row-3 justify-center items-center mb-10">
    <form onSubmit={loginHandler}>
    <label htmlFor="Username"><input type="text" value={username} onChange={handleChangeInput} name="username" required id="username" placeholder="Username" className="w-80 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 " /></label>
    <label htmlFor="Password"><input type="password" value={password} onChange={handleChangeInput} name="password" required id="password" placeholder="Password" className="w-80 bg-slate-800 my-2 py-2 px-4 rounded-lg text-slate-400 placeholder:text-slate-600 outline-none active:border-2 active:border-blue-500 focus:border-blue-500 border-2 border-transparent hover:border-2 hover:border-blue-500 "/></label>
    <button type="submit" className="w-80 bg-gradient-to-tr to-slate-800 from-blue-600 text-slate-400 my-2 py-2 rounded-lg hover:to-blue-900 hover:from-teal-600">Login</button>
    </form>
    </div>
    </div>
    <div className="fixed w-full h-screen top-0 left-0 bg-black opacity-40">
    <iframe className="PhotoZoom_iframe__LeuQM w-full h-screen fixed z-20 blur-2xl rounded-full saturate-100" allowFullScreen="" frameBorder="0" src="//player.vimeo.com/video/471585055?title=0&amp;horizontal=1&amp;byline=1&amp;autoplay=true&amp;muted=true&amp;loop=true" __idm_id__="27967492"></iframe>
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

export default Login;

