import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../slice/messageSlice';

export default function OrderModal({closeModal , getImportData, tempItem}) {
  const [tempData, setTempData] = useState({})
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const {value, name, checked} = e.target;
    if(['address','email','name','tel'].includes(name)){
      setTempData((pre) => {
        return {
          ...pre,
          user: {
            ...pre.user,
            [name]:value  
          }          
        }
      })
    }
    else if (name === 'is_paid') {
      setTempData((pre) => {
        return {
          ...pre,
          [name]:checked
        }
      })      
    } else {
      setTempData((pre) => {
        return {
          ...pre,
          [name]:value
        }
      }) 
    }   
  }
  useEffect(() => {
    if(tempItem.id) {
      setTempData(tempItem)
    } else {
      setTempData({
        "create_at": 1523539519,
        "is_paid": false,
        "message": "這是留言",
        "products": {
          "L8nBrq8Ym4ARI1Kog4t": {
            "id": "L8nBrq8Ym4ARI1Kog4t",
            "product_id": "-L8moRfPlDZZ2e-1ritQ",
            "qty": "3"
          }
        },
        "user": {
          "address": "kaohsiung",
          "email": "test@gmail.com",
          "name": "test",
          "tel": "0912346768"
        },
        "num": 2        
      })
    }
  }, [tempItem]);



  const submit = async() => {
    try {
      const api =`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempItem.id}`
      const res = await axios.put(api,
        {data:tempData}
        );
      dispatch(createAsyncMessage(res.data));
      closeModal();
      getImportData();
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    }
  }

  return(
    <>
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      id="OpenOrderModal"
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {`編輯 ${tempData?.user?.name}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <div className='form-group mb-2'>
              <label className='w-100' htmlFor='name'>
                客戶名稱
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='form-control'
                  onChange={handleChange}
                  value={tempData?.user?.name}
                />
              </label>
            </div>
            <div className='form-group mb-2'>
              <label className='w-100' htmlFor='tel'>
                聯絡電話
                <input
                  type='tel'
                  id='tel'
                  name='tel'
                  className='form-control'
                  onChange={handleChange}
                  value={tempData?.user?.tel}
                />
              </label>
            </div>
            <div className='form-group mb-2'>
              <label className='w-100' htmlFor='email'>
                Email
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='form-control'
                  onChange={handleChange}
                  value={tempData?.user?.email}
                />
              </label>
            </div>
            <div className='form-group mb-2'>
              <label className='w-100' htmlFor='address'>
                地址
                <input
                  type='text'
                  id='address'
                  name='address'
                  className='form-control'
                  onChange={handleChange}
                  value={tempData?.user?.address}
                />
              </label>
            </div>                                     
            <p className="fs-6 mb-0">購買項目</p>
            <ul className="mb-2 list-group">
                    {
                      Object.values(tempData.products|| {}).map((item) => {
                        return<li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                          {item?.product?.title}
                          <label htmlFor='qty'>
                            數量
                            <input
                              type='number'
                              id='qty'
                              name='qty'
                              className='form-control'
                              disabled
                              value={item?.qty}
                              onChange={handleChange}                  
                            />
                          </label>                        
                        </li>
                      })
                    }
            </ul> 
            <div className='row'>
              <div className='form-group mb-2'>
                <label className='w-100' htmlFor='total'>
                  付款金額
                  <input
                    type='number'
                    id='total'
                    name='total'
                    className='form-control'
                    disabled
                    value={tempData?.total} 
                    onChange={handleChange}                        
                  />
                </label>
              </div>
            </div>
            <hr />
            <div className='form-group mb-2'>
              <label className='w-100' htmlFor='message'>
                其他內容
                <textarea
                  type='text'
                  id='message'
                  name='message'
                  className='form-control'
                  value={tempData?.message}                       
                />
              </label>
            </div>
            <div className='form-group mb-2'>
              <div className='form-check'>
                <label
                  className='w-100 form-check-label'
                  htmlFor='is_paid'
                >
                  是否付款
                  <input
                    type='checkbox'
                    id='is_paid'
                    name='is_paid'
                    className='form-check-input'
                    checked={tempData?.is_paid}
                    onChange={handleChange}                           
                  />
                </label>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>          
    </>
  )
}
