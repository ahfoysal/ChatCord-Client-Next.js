import React from 'react';
import Svgs from './Svgs';
import ScrollableFeed from 'react-scrollable-feed';
import GetTimeAgo from "@/helper/time";
import Image from 'next/image';

const ConversationBody = ({chats, userId}) => {

  
  
  const reversedMessages = chats?.conversation?.messages ? [...chats.conversation.messages].reverse() : [];
  return (
    <ScrollableFeed className=" p-4  sm:pb-0 scroll-feed flex-1" >
     {reversedMessages.map((message, index) => {
        const isMe = message?.senderId === userId;
        const isImageMessage = message?.messageType === 'image';
        const sender = chats?.conversation?.members?.filter(
          (member) => member?.id?._id === message?.senderId
        )[0];
       
        return (
          <div key={index}>
            <p className="p-4 text-center text-sm text-gray-500">{GetTimeAgo(message.createdAt)}</p>
            {isMe ? (
              <div className="flex flex-row justify-end">
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                  <div className="flex items-center flex-row-reverse group">
                    {isImageMessage ? (
                      <a className="w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md" href="#">
                        <img className="absolute shadow-md w-full h-full rounded-l-lg object-cover" src={message.text} alt="message-image"/>
                      </a>
                    ) : (
                      <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">{message.text}</p>
                    )}
                    <Svgs />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row  items-center justify-start">
                <div className="w-10 h-10 relative flex flex-shrink-0 mr-4">
                  <Image width={50}  height={50} className="shadow-md rounded-full w-full h-full object-cover" src={sender.id.photoUrl} alt=""/>
                </div>
                <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                  {isImageMessage ? (
                    <a className="w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md" href="#">
                      <img className="absolute shadow-md w-full h-full rounded-r-lg object-cover" src={message.text} alt="message-image"/>
                    </a>
                  ) : (
                    <div className="flex items-center group">
                      <p className="px-6 py-3 rounded-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">{message.text}</p>
                      <Svgs />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
     })}
    </ScrollableFeed>
  );
}

export default ConversationBody;
