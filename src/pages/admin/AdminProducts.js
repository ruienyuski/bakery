import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import Loading from '../../components/Loading';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const ItemModal = useRef(null);
  const deleteItemModal = useRef(null);

  useEffect(() => {
    ItemModal.current= new Modal('#OpenProductModal', {
      backdrop: 'static'
    });
    deleteItemModal.current= new Modal('#DeleteModal', {
      backdrop: 'static'
    });
    setIsLoading(true);    
    getData();
    }, [])

  const openModal = (type,item) =>{
    setType(type);
    setTempProduct(item);
    ItemModal.current.show();
  }
  const closeModal = () =>{
    ItemModal.current.hide();
  }

  const openDeleteModal = (data) => {
    setTempProduct(data);
    deleteItemModal.current.show();
  }
  const closeDeleteModal = () => {
    deleteItemModal.current.hide();
  }
  const deleteProduct = async(id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`);
      if(res.data.success) {
        setIsLoading(true);
        getData();
        closeDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async(page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
    setIsLoading(false);
  }


  return(
    <>
      <div className="p-3">
      <Loading isLoading={isLoading} />
        <ProductModal 
        closeModal={closeModal} 
        getImportData={getData}
        tempItem={tempProduct}
        type={type}
        />
        <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title}
        handlDelete={deleteProduct}
        id={tempProduct.id}
        />
        {
          products.length === 0
          ? <div className="text-danger">沒有產品</div>
          : <><h3>產品列表</h3>
            <hr />
            <div className="text-end">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openModal('create', {})}
              >
                建立新商品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">名稱</th>
                  <th scope="col">售價</th>
                  <th scope="col">啟用狀態</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                {products.map((el) => {
                  return(
                    <tr key={el.id}>
                      <td>{el.category}</td>
                      <td>{el.title}</td>
                      <td>{el.price}</td>
                      <td>{el.is_enabled ? '啟用' : '未啟用'}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => openModal('edit', el)}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => openDeleteModal(el)}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination pagination={pagination} getImportData={getData} /></> 
        }
      </div>      
    </>
  )
}