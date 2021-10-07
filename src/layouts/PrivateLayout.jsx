import React from "react";

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col lg:flex-row flex-nowrap h-full w-full">
        <main className="flex w-full  overflow-y-scroll items-center justify-center">{children}</main>
      </div>
    </div>
  );
};

export default PrivateLayout;
