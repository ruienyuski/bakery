import axios from 'axios';
import { useEffect,useState } from 'react';
import {Link, useParams} from 'react-router-dom';

export default function FrontSuccess() {
  const {orderId} = useParams();
  const [orderData, setOrderData] = useState();
  const [payState, setPayState] = useState(false);

  const getData = async(orderId) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`)
    setOrderData(res.data.order);
    setPayState(res.data.order.is_paid)
  }

  const PayOrder = async() => {
    const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`)
    setPayState(res.data.success);
  }

  useEffect(() => {
    getData(orderId)
  },[orderId])

  return<>
    <div className="position-relative d-flex">
      <div className="container d-flex flex-column" style={{"minHeight": "100vh"}}>
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          <Link className="navbar-brand" to="/">巷弄烘培坊</Link>
        </nav>
        <div className="row my-auto pb-7">
          <div className="col-md-4 d-flex flex-column">
            <div className="my-auto">
              <h2>確認付款</h2>
              <div className="border p-4 my-4">
              <h3 className="fw-bold mb-4 pt-3">訂單內容</h3>
              {
                Object.values(orderData?.products || {}).map((el) => {
                return <div className="d-flex mb-2" key={el.id}>
                  <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" className="me-2"
                  style={{"width": "48px", "height": "48px", "objectFit": "cover"}} />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{el.product.title}</p>
                      <p className="mb-0">NT${el.total}</p>
                    </div>
                    <p className="mb-0 fw-bold">x{el.qty}</p>
                  </div>
                </div>
                })
              }

                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總金額</p>
                  <p className="mb-0 h4 fw-bold">NT${orderData?.total}</p>
                </div>
              </div>
              {
                payState
                ? <button className="btn btn-success mt-4 me-2 px-5" type="button" disabled>付款完成</button>
                : <button className="btn btn-danger mt-4 me-2 px-5" type="button" onClick={() => PayOrder()}>進行付款</button>
              }
              <Link to="/" className="btn btn-primary mt-4 px-5">回到首頁</Link>
            </div>


          </div>
        </div>
      </div>
      <div className="w-md-50 w-100 position-absolute opacity-1" style={{
        "zIndex": "-1", "minHeight": "100vh", "right": "0", "backgroundImage": "url(https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80)",
        "backgroundPosition": "center center"
      }}>
      </div>
    </div>    
  </>
}