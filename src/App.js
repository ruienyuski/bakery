import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import FrontLayout from './pages/front/FrontLayout';
import FrontHome from './pages/front/FrontHome';
import FrontProducts from './pages/front/FrontProducts';
import FrontProductDeatil from './pages/front/FrontProductDetail';
import FrontCart from './pages/front/FrontCart';
import FrontCheckout from './pages/front/FrontCheckout';
import FrontSuccess from './pages/front/FrontSuccess';
import NotFound from './pages/front/NotFound';

function App() {

  return (
    <div className="App">
     <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/admin" element={<Dashboard />}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="orders" element={<AdminOrders />} />
       </Route>
       <Route path="/" element={<FrontLayout />}>
        <Route path="" element={<FrontHome />}></Route>
        <Route path="product" element={<FrontProducts />}></Route>
        <Route path="product/:id" element={<FrontProductDeatil />}></Route>
        <Route path="cart" element={<FrontCart />}></Route>
        <Route path="checkout" element={<FrontCheckout />}></Route>
       </Route>
       <Route path="/success/:orderId" element={<FrontSuccess />}></Route>
       <Route path="*" element={<NotFound />}></Route>
     </Routes>
    </div>
  );
}

export default App;
