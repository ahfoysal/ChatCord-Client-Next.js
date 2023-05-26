"use client";

import ConversationBody from "@/component/conversation/Body";
import ConversationFooter from "@/component/conversation/Footer";
import ConversationHeader from "@/component/conversation/Header";

import EmojiPicker from "emoji-picker-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import { MainContext } from "@/context/MainContext";
let socket;
const ENDPOINT = process.env.BACKEND;

export default function Home() {
  const { userData } = MainContext();
  const { id } = useParams();
  const [isEmojiShown, setIsEmojiShown] = useState(false);
  const [chats, setChats] = useState({});
  const [messageText, setMessageText] = useState("");
  const [hasTextInput, setHasTextInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [socketConnected, setSocketConnected] = useState(false);

  const userId = userData?.data?._id;

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const conversationID = id;

  const chatFetch = async (page = 1) => {
    console.log("fetch");
    if (currentPage !== totalPages) {
      console.log(currentPage, totalPages);
    }
    try {
      const response = await axios.get(
        `${process.env.BACKEND}api/v1/conversation/${conversationID}`,
        {
          params: { page },
        }
      );
      setChats(response.data);
      console.log(response.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      socket.emit("join chat", conversationID);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    if (userId) {
      socket.emit("setup", userData?.data);
      socket.on("connection", () => setSocketConnected(true));
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", (room) => {
        console.log(room.userId, "is typing");
        if (userId === room.userId) return;
        setIsTyping(true);
      });
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, []);
  useEffect(() => {
    let latestMessageTimestamp = null;

    const handleNewMessage = (newMessage) => {
      if (newMessage?.messageType === "image") {
        chatFetch();
      }
      console.log(newMessage?.text, "from socket io");

      if (latestMessageTimestamp === newMessage?.time) {
        return console.log("duplicate");
      }

      latestMessageTimestamp = newMessage?.time;

      setChats((prevChats) => ({
        ...prevChats,
        conversation: {
          ...prevChats.conversation,
          messages: [newMessage, ...prevChats.messages],
        },
      }));

      // save updated chats object to AsyncStorage
      // const updatedChats = {
      //   ...chats,
      //   conversation: {
      //     ...chats.conversation,
      //     messages: [newMessage, ...chats.conversation.messages],
      //   },
      // };
      // setDataToAsyncStorage(conversationID, updatedChats);
    };

    socket.on("message received", handleNewMessage);

    return () => {
      socket.off("message received", handleNewMessage);
      latestMessageTimestamp = null;
    };
  }, []);

  useEffect(() => {
    chatFetch();
  }, []);

 
  
  const sendMessage = async (messageText, messageType) => {
    console.log("sending");
    console.log(messageText, messageType);
    socket.emit("stop typing", chats._id);
    if (messageType !== "image" && !hasTextInput) {
      return console.log("ok");
    }
    try {
      setMessageText("");
      let message = {
        conversationId: conversationID,
        senderId: userId,
        sender: userData?.data,
        createdAt: Date.now(),
      };
      if (messageType === "text") {
        message.text = messageText;
        message.messageType = "text";
      } else if (messageType === "image") {
        message.text = messageText;
        message.messageType = "image";
      }
      setChats((prevChats) => ({
        ...prevChats,
        conversation: {
          ...prevChats.conversation,
          messages: [message, ...prevChats.messages],
        },
      }));
      socket.emit("new message", {
        message,
        chats,
      });
      const response = await axios.post(
        `${process.env.BACKEND}api/v1/newmessage`,
        message
      );
      // console.log(response.data);
      // chatFetch();

      setHasTextInput(false);
    } catch (error) {
      console.error(error);
    }
  };
  const conversationVariants = {
    initial: { x: "100%" },
    animate: { x: "0%" },
    exit: { x: "100%" }
  };

  return (
    <motion.section
    className="bg-[url('https://devconfbd.com/images/star-bg.svg')] flex sm:flex flex-col flex-auto border-l relative border-gray-800"
    variants={conversationVariants}
    initial="initial"
    animate={"animate"}
    exit="exit"
    transition={{ duration: 0.1 }}
  >
    <ConversationHeader userId={userId} chats={chats} />
    <ConversationBody userId={userId} chats={chats} />
    <div className="absolute bottom-16 right-10">
      {isEmojiShown && <EmojiPicker />}
    </div>
    <ConversationFooter
      messageText={messageText}
      hasTextInput={hasTextInput}
      setMessageText={setMessageText}
      setHasTextInput={setHasTextInput}
      sendMessage={sendMessage}
      isemojiShown={isEmojiShown}
      setIsemojiShown={setIsEmojiShown}
      chatFetch={chatFetch}
    />
  </motion.section>
  );
}
