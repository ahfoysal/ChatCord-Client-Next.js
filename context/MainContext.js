"use client";
import { firebaseCloudMessaging } from "@/firebase/test";
import { getCookie } from "@/helper/cookies";
import { decodeJwtToken } from "@/helper/decodeJwt";
import { createContext, useContext, useEffect, useState } from "react";
const contextProviderS = createContext();

export function ContextProviderS({ children }) {
  const [userData, setUserData] = useState({});
  const token = getCookie("user");
  const decodedToken = decodeJwtToken(token);


  const loggedInCheck = () => {
    firebaseCloudMessaging.init()
    if (decodedToken) {
     
      console.log(decodedToken);
      setUserData(decodedToken);
    }

  }
  useEffect(() => {
    loggedInCheck()
  }, [])
  

  return (
    <contextProviderS.Provider value={{ userData, setUserData }}>
      {children}
    </contextProviderS.Provider>
  );
}

export function MainContext() {
  return useContext(contextProviderS);
}
