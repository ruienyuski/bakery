import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import OrderModal from "../../components/OrderModal";
import DeleteModal from "../../components/DeleteModal";
import DeleteAllModal from "../../components/DeleteAllModal";
import Pagination from "../../components/Pagination";
import Loading from '../../components/Loading';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const ItemModal = useRef(null);
  const deleteItemModal = useRef(null);
  const deleteAllModal = useRef(null);

  useEffect(() => {
    ItemModal.current= new Modal('#OpenOrderModal', {
      backdrop: 'static'
    });
    deleteItemModal.current= new Modal('#DeleteModal', {
      backdrop: 'static'
    });
    deleteAllModal.current= new Modal('#DeleteAllModal', {
      backdrop: 'static'
    });
    setIsLoading(true);
    getData();
    }, [])

  const openModal = (data) =>{
    setTempOrder(data);
    ItemModal.current.show();
  }
  const closeModal = () =>{
    ItemModal.current.hide();
  }

  const openDeleteModal = (data) => {
    setTempOrder(data);
    deleteItemModal.current.show();
  }
  const closeDeleteModal = () => {
    deleteItemModal.current.hide();
  }


  const openDeleteAllModal = () => {
    deleteAllModal.current.show();
  }
  const closeDeleteAllModal = () => {
    deleteAllModal.current.hide();
  }

  const deleteOrder = async(id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`);
      if(res.data.success) {
        setIsLoading(true);
        getData();
        closeDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAllOrder = async() => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders/all`);
      if(res.data.success) {
        setIsLoading(true);
        getData();
        closeDeleteAllModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async(page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`);
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
    setIsLoading(false);
  }


  return(
    <>
          <div className="p-3">
            <Loading isLoading={isLoading} />
            <OrderModal 
            closeModal={closeModal} 
            getImportData={getData}
            tempItem={tempOrder}
            />
            <DeleteModal
            close={closeDeleteModal}
            text={tempOrder?.user?.name}
            handlDelete={deleteOrder}
            id={tempOrder.id}
            />
            <DeleteAllModal
            close={closeDeleteAllModal}
            handlDelete={deleteAllOrder}
            /> 
            {
              orders.length === 0
              ? <div className="text-danger">沒有訂單</div>
              : <><h3>訂單列表</h3>
                <hr />
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openDeleteAllModal()}
                  >
                    刪除全部訂單
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">客戶名稱</th>
                      <th scope="col">訂單內容 <span className="badge bg-danger">購買數量</span></th>
                      <th scope="col">付款金額</th>
                      <th scope="col">付款狀態</th>
                      <th scope="col">編輯</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((el) => {
                      return(
                        <tr key={el.id}>
                          <td>{el?.user?.name}</td>
                          <td>{Object.values(el?.products || {}).map((item) => {
                            return<div key={item.id}>
                              <div>
                              <button type="button" className="btn btn-light" >
                              {item?.product?.title} <span className="badge text-bg-danger">{item.qty}</span>
                              </button>                          
                              </div>
                            </div>
                          })}</td>
                          <td>{el.total}</td>
                          <td>{el.is_paid ? '付款' : '未付款'}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => openModal(el)}
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
                <Pagination pagination={pagination} getImportData={getData} />
                </>
            }
          </div>      
    </>
  )
}