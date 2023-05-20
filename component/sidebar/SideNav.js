"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatList from "@/component/chat/ChatList";
import Image from "next/image";
import { MainContext } from "@/context/MainContext";
import { useRouter, usePathname } from "next/navigation";
import NavFooter from "./Footer";
import { messaging } from "@/firebase/firebase";
import { getToken, isSupported } from "firebase/messaging";

const SideNav = () => {
  const [chats, setChats] = useState([]);
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
      // console.log(data);
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

    const updateProfile = async (token) => {
      const profile = {
        userId: userData?.data?._id,
        deviceId: token,
      }
      console.log(profile);
      const { data } = await axios.post(
        `${process.env.BACKEND}api/v1/updateProfile`,
        profile
      );
      console.log(data);
    }
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BEX3XjhPUSt46lfmwpqaBRFWRbFlE-CpgL56n3hkAMPYgoWt7dvCRl8GemfS-aRVd8yMlGdwX8TfrKaH8VTz31A",
      });
      console.log("Token Gen", token);
      if(token !== userData?.data?.deviceId) {
           updateProfile(token)

      }

      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    (async () => {
        if(userData && userData?.data?._id){
          const hasFirebaseMessagingSupport = await isSupported();
          if (hasFirebaseMessagingSupport) {
            await requestPermission();
          }
        }
    })();
  }, []);

  useEffect(() => {
    if (userData?.data?._id) {
      chatFetch();
      // requestPermission();
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
        <a
          href="#"
          className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2  md:block group-hover:block"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
          </svg>
        </a>
      </div>
      <div className="search-box p-4 flex-none">
        <div className="relative">
          <label>
            <input
              className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
              type="text"
              placeholder="Search Messenger"
            />
            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  fill="#bbb"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div className="contacts  p-2 pb-32 sm:pb-12 flex-1 overflow-y-scroll overflow-x-hidden">
        {chats?.conversations?.map((chat, index) => (
          <ChatList chat={chat.id} userId={userId} key={index} />
        ))}
        
      </div>
      <NavFooter  router={router} setUserData={setUserData} userData={userData}/>
     
    </section>
  );
};

export default SideNav;
