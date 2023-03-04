import React from "react";
import notfound from '../images/notfound.gif'
import Image from "next/image";
const NotFound = () => {
  return (
    <div className="flex justify-center items-center bg-[#040204] w-full h-screen overflow-hidden">
    <div className="">
    <Image src={notfound} alt="" className="" />
    </div>
    </div>
    );
};

export default NotFound;
