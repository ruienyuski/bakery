import { Outlet } from 'react-router-dom';
import { useEffect, useState, useReducer } from 'react';
import Message from "../../components/Message";
import {MessageContext, MessageReducer, initState} from "../../store/messageStore"
import Navbar from '../../components/front/FrontNavbar';
import Footer from '../../components/front/FrontFooter';
import axios from 'axios';

export default function FrontLayout() {
  const [cartData, setCartData] = useState([]);
  const reducer = useReducer(MessageReducer, initState);

  const getCart = async() => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
    setCartData(res.data.data);
  }
  useEffect(() => {
    getCart();
  }, [])
  return<MessageContext.Provider value={reducer}>
    <Message />
    <Navbar cartData={cartData} />
    <Outlet context={{getCart, cartData}} />
    <Footer />
  </MessageContext.Provider>
}