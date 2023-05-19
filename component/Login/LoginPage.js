"use client";
import { MainContext } from "@/context/MainContext";
import { LoginRequest } from "@/helper/api";
import { removeCookie } from "@/helper/cookies";
import { setCookieWithOptions } from "@/helper/cookies";
import { decodeJwtToken } from "@/helper/decodeJwt";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [login, setLogin] = useState(true);
  const { setUserData, userData } = MainContext();
  const userId = userData?.data?._id;
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await LoginRequest("/login", { email, password });
      if (response.status === 200 && response.data) {
        setCookieWithOptions("user", response.token);
        setUserData(decodeJwtToken(response.token));
        console.log(response);
        router.push("/chat");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await LoginRequest("/registration", {
        name,
        email,
        password,
      });
      console.log(response);
      if (response.status === 200 && response.token) {
        console.log(response.token);
        removeCookie("user");
        setCookieWithOptions("user", response.token);
        setUserData(decodeJwtToken(response.token));
        router.push("/chat");
        // handleLoginSubmit(event);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
  if(userId)router.push("/chat");
  }, [userId])

  return (
    <div className="bg-[url('https://devconfbd.com/images/star-bg.svg')]">
      <div className="h-screen bg-[url('/images/pattern.png')]  flex flex-col justify-center items-center">
        <div className="border login bg-slate-900 border-slate-700 w-80 py-6 flex items-center flex-col mb-3 transition-all  hover:border-sky-800  ">
          <h1 className="mb-2 lg:mb-4  font-semibold text-gradient hero-title text-2xl lg:text-3xl text-center lg:text-left mt-2">
            ChatCord
          </h1>
          {login ? (
            <form
              className="mt-4 w-64 flex flex-col"
              onSubmit={handleLoginSubmit}
            >
              <input
                autoFocus
                className="text-xs w-full mb-2 rounded border bg-slate-800 border-slate-800 px-2 py-2 focus:outline-none text-white active:outline-none"
                id="email"
                placeholder="Email"
                type="email"
              />
              <input
                autoFocus
                className="text-xs w-full mb-3 rounded border bg-slate-800  border-slate-800 px-2 py-2 focus:outline-none text-white active:outline-none"
                id="password"
                placeholder="Password"
                type="password"
              />
              <button className="btn btn-primary btn-md rounded bg-gradient-to-r font-bold text-white from-[#4BA2D3] to-[#c51b46] to-[99%]  transition-all duration-500  px-1 py-1 mb-4">
                Log In
              </button>
            </form>
          ) : (
            <form
              className="mt-4 w-64 flex flex-col"
              onSubmit={handleSignUpSubmit}
            >
              <input
                autoFocus
                className="text-xs w-full mb-2 rounded border bg-slate-800 border-slate-800 px-2 py-2 focus:outline-none text-white active:outline-none"
                id="name"
                placeholder="Name"
                type="text"
              />
              <input
                autoFocus
                className="text-xs w-full mb-2 rounded border bg-slate-800 border-slate-800 px-2 py-2 focus:outline-none text-white active:outline-none"
                id="email"
                placeholder="Email"
                type="email"
              />
              <input
                autoFocus
                className="text-xs w-full mb-3 rounded border bg-slate-800  border-slate-800 px-2 py-2 focus:outline-none text-white active:outline-none"
                id="password"
                placeholder="Password"
                type="password"
              />
              <button className="btn btn-primary btn-md rounded bg-gradient-to-r font-bold text-white from-[#4BA2D3] to-[#c51b46] to-[99%]  transition-all duration-500  px-1 py-1 mb-4">
                Sign Up
              </button>
            </form>
          )}
          {error && (
            <div
              className="bg-[#e7222273] flex flex-row  items-center w-64 px-2 py-2  text-white  rounded relative mb-4"
              role="alert"
            >
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z"></path>
                  <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
                </svg>
              </span>
              <span className="block text-sm sm:inline  px-6">{error}</span>
            </div>
          )}
          {/* <a className="text-xs text-white mt-4 cursor-pointer -mb-4">
            Forgot password?
          </a> */}
        </div>
        <div className="bg-slate-900 border border-slate-700     text-center w-80 py-4">
          {login ? (
            <>
              <span className="text-sm text-gray-700">
                Don't have an account?
              </span>
              <a
                className="text-gray-500 text-sm font-semibold ml-1 hover:underline"
                onClick={() => setLogin(false)}
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-700">
                Already have an account?
              </span>
              <a
                className="text-gray-500 text-sm font-semibold ml-1 hover:underline"
                onClick={() => setLogin(true)}
              >
                Login
              </a>
            </>
          )}
        </div>
        <div className="mt-3 text-center ">
          <span className="text-xs text-white">Get the app</span>
          <div className="flex mt-3 space-x-2 ">
            <div className="bg-no-repeat apple-store-logo bg-white rounded"></div>
            <div className="bg-no-repeat google-store-logo bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
