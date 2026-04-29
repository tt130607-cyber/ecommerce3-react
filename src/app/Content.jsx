import TvListing from "../pages/TvListing";
import PhoneListing from "../pages/PhoneListing";
import LaptopListing from "../pages/LaptopListing";
import Cart from "../pages/Cart";


const Content = ({ pageType, setPageType, cart, setCart }) => {
  return (
    <>
      {pageType === 'tv' && <TvListing cart={cart} setCart={setCart} pageType={pageType} setPageType={setPageType} />}
      {pageType === 'phone' && <PhoneListing cart={cart} setCart={setCart} pageType={pageType} setPageType={setPageType} />}
      {pageType === 'laptop' && <LaptopListing cart={cart} setCart={setCart} pageType={pageType} setPageType={setPageType} />}
      {pageType === 'cart' && <Cart cart={cart} setCart={setCart} pageType={pageType} setPageType={setPageType} />}
    </>
  );
};


export default Content;