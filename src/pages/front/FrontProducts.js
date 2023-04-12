import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

export default function FrontProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    "current_page": 0,
    "total_pages": 1
  });
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState([]);
  const [newData, setNewData] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState('')
  const {getCart} = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    (async() => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
        setProducts(res.data.products);
        setIsLoading(false);
      }
      catch(error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    let temp_category = ''; 
    const result_category = products.reduce((prev,el) => {
      if(el.category !== temp_category) {
        prev.push(el.category)
      }
      temp_category = el.category
      return prev;
    },[])
    let result = result_category.filter((element, index, arr) =>{
      return arr.indexOf(element) === index;
    });    
    setCategory(result);    
    const Data = [];
    /* eslint-disable */
    const tempData = products.filter((el) => {
      if(filter==='') {
        return products
      } else if (filter === el.category){
        return el
      }
    })
    tempData.forEach((data, i) => {
      if( i % 6 === 0) {
        Data.push([])
      }
      const pagenum = parseInt( i / 6);
      Data[pagenum].push(data);
    })
    setNewData(Data);
  }, [products,filter,pagination.current_page])

  useEffect(() => {
    if(newData.length > 0) {
      setList(newData[pagination.current_page]);
      setPagination(pre => {
        pre.total_pages = newData.length;
        return {...pre}
      });
    }
  },[newData,list])

  const AddToCart = async(id) => {
    setLoading(true);
    setLoadingItem(id)
    const postData = {
      data: {
        product_id: id,
        qty: 1           
      }
    }
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,postData);
      getCart();
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return<>
    <div className="container mt-md-5 mt-3 mb-7">
      <Loading isLoading={isLoading} />
      <div className="row">
        <div className="col-md-4">
          <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    菜單 Menu
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><Link onClick={() => setFilter('')} 
                    className="py-2 d-block fs-5 text-muted link-underline link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    >全部商品</Link></li>
                    {
                      category.map((item) => {
                        return <li key={item}><Link onClick={() => setFilter(item)} 
                        className="py-2 d-block fs-5 text-muted link-underline link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                        >{item}</Link></li>
                      })
                    }
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
          {
            list?.map((product) => {
            return <div className="col-md-6" key={product.id}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <Link to={`/product/${product.id}`}>
                  <img src={product.imageUrl}
                  height="300" width="100"
                  className="card-img-top rounded-0 object-cover" alt="..." />
                </Link>
                <div className="card-body p-0 row justify-content-between align-items-top">
                  <div className="col-md-8">
                    <h4 className="mb-0 mt-3 mb-1"><Link to={`/product/${product.id}`} className='link-underline link-underline-opacity-0'>{product.title}</Link></h4>
                    <p className="card-text mb-0">
                    <span className="fs-5 me-2">NT${product.price}</span>
                    <span className="text-muted "><del>NT${product.origin_price}</del></span>
                    </p>               
                  </div>
                  <div className="col-md-4 mt-3 text-end">
                    <button type="button" className="btn btn-primary py-3" onClick={() => AddToCart(product.id)}>
                    加入購物車
                      {
                        loading && loadingItem === product.id? 
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
            })
          }
          </div>
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              <li className="page-item">
                <Link 
                className={`page-link ${0 === pagination.current_page ? "disabled" : ""}`}
                to="/" 
                aria-label="Previous"
                onClick={
                  (e) => {
                    e.preventDefault();
                    setPagination((pre) => {
                          return {
                            ...pre,
                            current_page:pre.current_page -1
                          }
                    })
                  }
                }                 
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {
                [...new Array(pagination?.total_pages)].map((_, i) => (
                  <li key={`${i}_page`} 
                  className={`page-item ${(i  === pagination.current_page) && 'active'}`}>
                  <Link className="page-link" 
                    onClick={
                      (e) => {
                        e.preventDefault();
                        setPagination((pre) => {
                          return {
                            ...pre,
                            current_page:i
                          }
                        })
                      }
                    }                  
                  >{i+1}</Link>
                  </li>
                ))
              }
              <li className="page-item">
                <Link 
                className={`page-link ${pagination.total_pages === pagination.current_page +1 ? "disabled" : ""}`}
                to="/"
                aria-label="Next"
                onClick={
                  (e) => {
                    e.preventDefault();
                    setPagination((pre) => {
                          return {
                            ...pre,
                            current_page:pre.current_page+1
                          }
                    })
                  }
                }                  
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
}