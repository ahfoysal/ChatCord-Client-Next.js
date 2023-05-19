"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import { MdArrowBackIosNew } from "react-icons/md";
const ConversationHeader = ({ chats, userId }) => {
    const router = useRouter()
    const otherMember = chats?.conversation?.members?.filter(
        (member) => member.id._id !== userId
      )[0];
    
      const otherMemberName = otherMember?.id?.name;
      const otherMemberPhotoUrl = otherMember?.id?.photoUrl;
      const otherMemberIsActive = otherMember?.id?.isActive;
      console.log(chats, otherMemberPhotoUrl)
  return (
    <div className="chat-header px-2 py-4 flex flex-row flex-none justify-between items-center shadow">
     <div className="flex flex-row items-center">
     <MdArrowBackIosNew onClick={() => router.back()} className="mr-2 text-blue-500" size={30}/>
      <div className="flex">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
          <Image
          width={50}
          height={50}
            className="shadow-md rounded-full w-full h-full object-cover"
            src={otherMemberPhotoUrl}
            alt=""
          />
        </div>
        <div className="text-sm">
          <p className="font-bold">{otherMemberName}</p>
          <p>Active 1h ago</p>
        </div>
      </div>
     </div>

      <div className="flex">
        <button
          href="#"
          className="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4 text-blue-500"
        >
          <HiInformationCircle
            className="w-full h-full fill-current text-blue-500"
            size={30}
          />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;
