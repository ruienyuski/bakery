import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/front/FrontNavbar';
import Footer from '../../components/front/FrontFooter';
import axios from 'axios';
import MessageToast from '../../components/MessageToast';

export default function FrontLayout() {
  const [cartData, setCartData] = useState([]);

  const getCart = async() => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
    setCartData(res.data.data);
  }
  useEffect(() => {
    getCart();
  }, [])
  return<>
    <MessageToast />
    <Navbar cartData={cartData} />
    <Outlet context={{getCart, cartData}} />
    <Footer />
  </>
}