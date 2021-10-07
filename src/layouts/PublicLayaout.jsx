import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <main className="h-full  bg-gray-300">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
