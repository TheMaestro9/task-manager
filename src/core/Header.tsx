import React from "react";
import logo from "../assets/icons/logo.svg";
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center ">
      <img src={logo} width={30} height={30} className="App-logo" alt="logo" />
      <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
    </header>
  );
};

export default Header;
