import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "./Content";
import TvListing from "../pages/TvListing";
import PhoneListing from "../pages/PhoneListing";
import LaptopListing from "../pages/LaptopListing";
import Cart from "../pages/Cart";

function Container() {
  const [pageType, setPageType] = useState("tv");

  const [cart, setCart] = useState({});
  

  return (
    <>
      <Header
        pageType={pageType}
        setPageType={setPageType}
        cart={cart}
      />
      
      <Content
        pageType={pageType}
        setPageType={setPageType}
        cart={cart}
        setCart={setCart}
      />

      <Footer />
    </>
  );
}

export default Container;