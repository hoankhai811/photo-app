import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import userAvatar from "../assets/userAvatar.png";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.googleId]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  //! md = 768px	@media (min-width: 768px) { ... }
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* !SideBar hiển thị trên desktop */}
      <div className="hidden md:flex h-screen flex-initial ">
        {/* Đã xử lý xong user với user khách */}
        <Sidebar user={user && user} />
      </div>
      {/* Menu Mobile xử lý tài khoản khách ok! */}
      <div className="Menu flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {user ? (
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="logo" className="w-10 rounded-full" />
            </Link>
          ) : (
            <Link to="/login">
              <img src={userAvatar} alt="logo" className="w-10 rounded-full" />
            </Link>
          )}
        </div>
        {/* !Sidebar hiện thị trên mobile */}
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="w-full absolute flex justify-end items-center p-2 ">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {/* truyền closeToggle để khi click vào logo trong sidebar của Mobile thì sẽ đóng sideBar  */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
