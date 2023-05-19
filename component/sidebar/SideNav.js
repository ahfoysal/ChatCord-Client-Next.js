"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSend, AiOutlineSearch } from "react-icons/ai";
import ChatList from "@/component/chat/ChatList";
import Image from "next/image";
import { MainContext } from "@/context/MainContext";
import { useRouter, usePathname } from "next/navigation";

const SideNav = () => {
  const [chats, setChats] = useState([]);
  const { userData } = MainContext();
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

  useEffect(() => {
    if (userData?.data?._id) {
      chatFetch();
    }
    if (!userData?.data?._id) {
      router.push("/");
    }
  }, [userData]);
  return (
    <section
      className={
        (isHidden ? "" : "hidden") +
        "hidden sm:flex flex-col flex-none overflow-auto w-full sm:w-24 hover:flexclasw-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out"
      }
    >
      <div className="header p-4 flex flex-row justify-between items-center flex-none">
        <div className="py-2 h-16 relative flex flex-shrink-0">
          {/* logo */}
          <Image
            src={userData?.data?.photoUrl}
            alt={`'s profile`}
            className="rounded-full"
            height={50}
            width={50}
          />
        </div>
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

      <div className="contacts p-2 flex-1 overflow-x-scroll">
        {chats?.conversations?.map((chat, index) => (
          <ChatList chat={chat.id} userId={userId} key={index} />
        ))}
      </div>
    </section>
  );
};

export default SideNav;
