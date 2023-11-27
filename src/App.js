import React from "react";
// import Footer from "./;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import Loader from "./Component/loader/Loader";
import NavBar from "./Component/Nav/NavBar";
import TopInfo from "./Component/Nav/TopInfo";
import About from "./Component/pages/about/About";
import ShippingDetails from "./page/ShippingDetails";
import Footer from "./Component/Footer"
import Contact from "./Component/pages/contact/Contact"
import Info from "./Component/Info"
import Service from "./Component/pages/services/Service"

export default function App() {
  return (
    <div className="header-area">
      <div className="main-header">
        <BrowserRouter >
          <Routes>
            <Route path="/shippingdetails" element={<ShippingDetails />}  />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Loader />
      <TopInfo />
      <NavBar />
      <Header />
      <Info />
      <Service />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
