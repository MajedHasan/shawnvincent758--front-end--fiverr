import React from "react";
import Header from "../merchandise/_components/header";

const ProfileLayout = ({ children }) => {
  return (
    <>
      <main>
        <Header />
        <div className="container mx-auto w-full max-w-[1240px]">
          {children}
        </div>
      </main>
    </>
  );
};

export default ProfileLayout;
