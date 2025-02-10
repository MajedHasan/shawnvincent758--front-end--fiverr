import React from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

const MerchandiseLayout = ({ children }) => {
  return (
    <main className="w-full">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default MerchandiseLayout;
