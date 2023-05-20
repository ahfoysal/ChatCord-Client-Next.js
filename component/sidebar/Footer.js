import Image from "next/image";
import React from "react";
import { IoPowerSharp, IoSettingsOutline } from "react-icons/io5";
import { removeCookie } from "@/helper/cookies";

const NavFooter = ({ userData, router, setUserData }) => {
  return (
    <div className=" absolute sm:hidden md:flex bottom-20 sm:bottom-2 justify-center z-10 w-full flex">
      <div className="flex items-center gap-5  bg-slate-900 shadow-md shadow-black w-fit justify-center rounded-lg px-4 py-3">
        <div className="w-8 h-8 relative flex flex-shrink-0">
          <Image
            alt={"/images/logo.svg"}
            className="shadow-md rounded-full w-full h-full object-cover"
            height={500}
            width={500}
            src={userData?.data?.photoUrl || "/images/person.jpg"}
          />
        </div>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none  text-white-600 hover:text-blue-700 "
        >
          <IoSettingsOutline size={28} />
        </button>
        <button
          type="button"
          className="flex flex-shrink-0 focus:outline-none hover:  text-white-600 hover:text-blue-700 "
          onClick={() => {
             removeCookie("user"); 
             setUserData({})
            router.push("/");
          }}
        >
          <IoPowerSharp size={28} />
        </button>
      </div>
    </div>
  );
};

export default NavFooter;
