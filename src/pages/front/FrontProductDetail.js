import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';


export default function FrontProductDetail() {
  const [product, setProduct] = useState({});
  const [cartNum, setCartNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const {getCart} = useOutletContext();
  const {id} = useParams();

  const getData = async(id) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`)
    setProduct(res.data.product)
  }  
  useEffect(() => {
    getData(id)
  },[id])

  const AddToCart = async() => {
    setLoading(true);
    const postData = {
      data: {
        product_id: product.id,
        qty: cartNum           
      }
    }
    try {
      await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,postData);
      getCart();
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }


  return<>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-7">
          <img src={product.imageUrl} className='img-fluid' alt="" />
        </div>
        <div className="col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white px-0 mb-0 py-3">
              <li className="breadcrumb-item"><Link className="text-muted" to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link className="text-muted" to="/product">Product</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
          <h2 className="fw-bold h1 mb-1">{product.title}</h2>
          <p className="mb-0 text-muted text-end"><del>NT${product.origin_price}</del></p>
          <p className="h4 fw-bold text-end">NT${product.price}</p>
          <div className="row align-items-center">
            <div className="col-6">
              <select className="form-select py-2" aria-label="Default select example"
              onChange={e => setCartNum(e.target.value * 1)} >
                <option value="" disabled>---請選擇數量---</option>
                {
                  [...Array(20)].map((_,i) => {
                    return(
                      <option value={i+1} key={i}>{i+1}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="col-6">
              <button type="button" onClick={() => AddToCart()} className="text-nowrap btn btn-primary w-100 py-2">
                <span className="pe-1">加入購物車</span>
                {
                  loading? 
                  <div className="spinner-border text-white spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                  </div>
                  :false 
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-4">
        <p>內容成分: <br/>{product.description}</p>
        </div>
        <div className="col-md-3">
          <p  className="text-muted">商品說明:<br/>{product.content}</p>
        </div>
      </div>
    </div>
  </>
}