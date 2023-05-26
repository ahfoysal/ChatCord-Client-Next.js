"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatList from "@/component/chat/ChatList";
import { MainContext } from "@/context/MainContext";
import { useRouter, usePathname } from "next/navigation";
import NavFooter from "./Footer";
import localforage from "localforage";
import { BsPencilSquare } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Discover from "../chat/DiscoverList";

const SideNav = () => {
  const [chats, setChats] = useState([]);
  const [find, setFind] = useState([]);
  const { userData, setUserData } = MainContext();
  const router = useRouter();
  const isChatPath = usePathname().includes("/chat/");
  const chatId = isChatPath ? usePathname().split("/")[2] : null;
  const isHidden = isChatPath && chatId;

  const userId = userData?.data?._id;

  const chatFetch = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND}api/v1/user/${userId}`
      );
      console.log(data);
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (token) => {
    const profile = {
      userId: userData?.data?._id,
      deviceId: token,
    };
    console.log(profile);
    const { data } = await axios.post(
      `${process.env.BACKEND}api/v1/updateProfile`,
      profile
    );
    console.log(data);
  };
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await localforage.getItem("fcm_token");
      console.log("Token Gen", token);
      if (token !== userData?.data?.deviceId) {
        //  updateProfile(token)
      }

      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  const discover = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND}api/v1/discover/${userId}`
      );
      console.log(data);
      setFind(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData?.data?._id) {
      chatFetch();
      discover();
      requestPermission();
    }
    if (!userData?.data?._id) {
      router.push("/");
    }
  }, [userData]);

  return (
    <section
      className={
        (isHidden ? "hidden" : "") +
        " nav sm:flex flex relative  flex-col overflow-hidden  flex-none  w-full sm:w-24 hover:flexclasw-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out"
      }
    >
      <div className="header p-4 flex flex-row justify-between items-center flex-none">
        <p className="text-md font-bold  md:block group-hover:block">Chats</p>
        <button className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2  md:block group-hover:block">
          <BsPencilSquare className="w-full h-full" />
        </button>
      </div>
      <div className="search-box p-4 flex-none">
        <div className="relative">
          <label>
            <input
              className="rounded-lg py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
              type="text"
              placeholder="Search Messenger"
            />
            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
              <BiSearch className="w-6 h-6" />
            </span>
          </label>
        </div>
      </div>

      <div className="contacts  p-2  pb-32 sm:pb-12 flex-1 overflow-y-scroll overflow-x-hidden ">
        {chats?.conversations?.map((chat, index) => (
          <ChatList chat={chat} userId={userId} key={index} />
        ))}
        {find && find.length > 0 && (
          <p className="font-extrabold py-4">
            <span className="text-gradient bg-gradient-to-r from-[#7BEFFF] to-[#07C926]">
              More
            </span>
            {"  "}
            <span className="transition-all text-gradient bg-gradient-to-r from-[#df07f3] to-[#0beaf1]">
              on
            </span>
            {"  "}
            <span className="text-gradient bg-gradient-to-r to-[#FFE602] from-[#FF1585]">
              ChatCord
            </span>
          </p>
        )}
        {find?.map((user, index) => (
          <Discover router={router} userId={userId} user={user} key={index} />
        ))}
      {chats.friends.length > 0 &&  <>
        <p className=" font-extrabold py-4">
          <span className="transition-all   text-gradient  bg-gradient-to-r  from-[#df07f3] to-[#0beaf1]">
            Friends
          </span>
        </p>
        {chats.friends?.map((user, index) => (
          <Discover router={router} userId={userId} user={user} key={index} />
        ))}
        </>}
      </div>
      <NavFooter
        router={router}
        setUserData={setUserData}
        userData={userData}
      />
    </section>
  );
};

export default SideNav;
