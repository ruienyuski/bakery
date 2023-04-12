import { useState } from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import axios from 'axios';

export default function FrontCart() {

  const [coupon, setCoupon] = useState('');

  const {cartData, getCart} = useOutletContext();

  const addCoupon = async(code) => {
    const sendcode = {
      data: {
        "code": code
      }
    }
    await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`, sendcode);
    getCart();
  }

  const updateCart = async(id, product_id, qty) => {
    if(qty < 1) {
      qty = 1
    }
    const cartItem = {
      data: {
        "product_id": product_id,
        "qty": qty        
      }
    }
    await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`, cartItem);
    getCart();
  }

  const removeCartItem = async(id) => {
    await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
    getCart();
  }

  const removeCartAll = async() => {
    await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/carts`);
    getCart();
  }  

  return<>
      <div className="container">
        <div className="mt-3">
          
          <div className="row">
            <div className="col-md-8">
              

              {
                cartData?.carts?.length === 0
                ? <h3 className="mt-3 mb-4">購物車尚無商品</h3>
                : <><h3 className="mt-3 mb-4">購物車內容</h3>
                <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 ps-0">商品名稱</th>
                    <th scope="col" className="border-0">數量</th>
                    <th scope="col" className="border-0">金額</th>
                    <th scope="col" className="border-0">
                      <button className="btn btn-sm btn-primary mt-3 text-wrap" style={{"width": "5rem"}}
                      onClick={() => removeCartAll()}
                      >清空內容</button>                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartData?.carts?.map((el) => {
                      return <tr className="border-bottom border-top" key={el.id}>
                        <th scope="row" className="border-0 px-0 font-weight-normal py-4">
                          <img src={el.product.imageUrl} className="me-3" alt="" style={{"width": "72px", "height": "72px", "objectFit": "cover"}} />
                          <p className="mb-0 fw-bold d-inline-block">{el.product.title}</p>
                        </th>
                        <td className="border-0 align-middle" style={{"maxWidth": "160px"}}>
                          <div className="input-group pe-5">
                            <div className="input-group-prepend">
                              <button className="btn btn-outline-primary border-0 py-2"
                              type="button"
                              id="button-addon1"
                              onClick={(e) => {
                                e.preventDefault();
                                updateCart(el.id, el.product_id, el.qty - 1)
                              }}
                              >
                                <i className="bi bi-dash-lg"></i>
                              </button>
                            </div>
                            <input type="Number"
                            style={{'width':'50px'}}
                            className="form-control border-0 text-center my-auto shadow-none"
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1" value={el.qty}
                            readOnly
                            />
                            <div className="input-group-append">
                              <button className="btn btn-outline-primary border-0 py-2"
                              type="button"
                              id="button-addon2"
                              onClick={(e) => {
                                e.preventDefault();
                                updateCart(el.id, el.product_id, el.qty + 1)
                              }}
                              >
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="border-0 align-middle"><p className="mb-0 ms-auto">NT${el.product.price}</p></td>
                        <td className="border-0 align-middle">
                          <button className="btn" type="button" onClick={() => removeCartItem(el.id)}>
                            <i className="bi bi-trash3-fill text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    })
                  }
                </tbody>
                </table></> 
              }

            </div>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">訂單細項</h4>              
                <div className="input-group my-3">
                  <input type="text"
                  className="form-control" 
                  onChange={(e) =>setCoupon(e.target.value)}
                  value={coupon}
                  placeholder="輸入優惠碼" 
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2" />
                  <button className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => addCoupon(coupon)}
                  >套用優惠碼</button>
                </div>                
                <table className="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">小計</th>
                      <td className="text-end border-0 px-0 pt-4">NT${cartData.total}</td>
                    </tr>
                    {
                      cartData.total !== cartData.final_total
                      ? <tr>
                          <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">折價後金額</th>
                          <td className="text-end border-0 px-0 pt-0 pb-4">NT${cartData.final_total}</td>
                        </tr>
                      : ''
                    }
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總金額</p>
                  <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
                </div>
                <Link to="/checkout" className="btn btn-primary w-100 mt-4">下一步</Link>
              </div>
            </div>
          </div>
        </div>    
      </div>
  </>
}