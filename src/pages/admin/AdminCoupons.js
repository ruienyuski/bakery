import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import Loading from '../../components/Loading';

export default function AdminCoupon() {
  const [coupons, setCoupon] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempCoupon, setTempCoupon] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const ItemModal = useRef(null);
  const deleteItemModal = useRef(null);

  useEffect(() => {
    ItemModal.current= new Modal('#OpenCouponModal', {
      backdrop: 'static'
    });
    deleteItemModal.current= new Modal('#DeleteModal', {
      backdrop: 'static'
    });
    setIsLoading(true);    
    getData();
    }, [])

  const openModal = (type,product) =>{
    setType(type);
    setTempCoupon(product);
    ItemModal.current.show();
  }
  const closeModal = () =>{
    ItemModal.current.hide();
  }

  const openDeleteModal = (data) => {
    setTempCoupon(data);
    deleteItemModal.current.show();
  }
  const closeDeleteModal = () => {
    deleteItemModal.current.hide();
  }
  const deleteData = async(id) => {
    const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`);
    if(res.data.success) {
      setIsLoading(true);
      getData();
      closeDeleteModal();
    }
  }

  const getData = async(page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`);
    setCoupon(res.data.coupons);
    setPagination(res.data.pagination);
    setIsLoading(false);
  }

  const toDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  }

  return(
    <>
          <div className="p-3">
            <Loading isLoading={isLoading} />
            <CouponModal 
            closeModal={closeModal} 
            getImportData={getData}
            tempItem={tempCoupon}
            type={type}
            />
            <DeleteModal
            close={closeDeleteModal}
            text={tempCoupon.title}
            handlDelete={deleteData}
            id={tempCoupon.id}
            />
            {
              coupons.length === 0
              ? <div className="row justify-content-between">
                  <div className="col text-danger">沒有優惠卷</div>
                  <div className="col  text-end">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openModal('create', {})}
                    >
                      建立優惠卷
                    </button>
                  </div>                
                </div>
              : <><h3>優惠卷列表</h3>
                <hr />
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openModal('create', {})}
                  >
                    建立優惠卷
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">標題</th>
                      <th scope="col">折扣</th>
                      <th scope="col">到期日</th>
                      <th scope="col">優惠碼</th>
                      <th scope="col">啟用狀態</th>
                      <th scope="col">編輯</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((el) => {
                      return(
                        <tr key={el.id}>
                          <td>{el.title}</td>
                          <td>{el.percent}</td>
                          <td>{toDate(el.due_date)}</td>
                          <td>{el.code}</td>                      
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