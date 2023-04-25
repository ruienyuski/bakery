import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../store/messageStore";

export default function ProductModal({closeModal , getImportData, type, tempItem}) {
  const [tempData, setTempData] = useState({
    "title": "",
    "category": "",
    "origin_price": 100,
    "price": 50,
    "unit": "",
    "description": "",
    "content": "",
    "is_enabled": 1,
    "imageUrl": "", 
  })
  const [, dispatch] = useContext(MessageContext);
  useEffect(() => {
    if (type === 'create') {
      setTempData({
        "title": "",
        "category": "",
        "origin_price": 100,
        "price": 50,
        "unit": "",
        "description": "",
        "content": "",
        "is_enabled": 1,
        "imageUrl": "", 
      })
    } else if (type === 'edit'){
      setTempData(tempItem)
    }
  }, [type, tempItem])

  const handleChange = (e) => {
    const {value, name, checked} = e.target;
    if(['origin_price','price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]:Number(value)
      })      
    }
    else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]:+checked
      })      
    }
    else {
      setTempData({
        ...tempData,
        [name]:value
      })
    }
  }

  const submit = async() => {
    let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
    let method = 'post';
    try {
      if (type === 'edit') {
        api =`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempItem.id}`
        method = 'put'
      } 
      const res = await axios[method](api,
        {data:tempData}
        );
      handleSuccessMessage(dispatch, res);
      closeModal();
      getImportData();
    } catch (error) {
      handleErrorMessage(dispatch, error);
    }
  }

  return(
    <>
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      id="OpenProductModal"
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
              
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.imageUrl}                            
                    />
                  </label>
                </div>
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.category}                      
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.unit}                             
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.origin_price}                              
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.price}                                
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description}                          
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.content}                          
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handleChange}
                        checked={!!tempData.is_enabled}                              
                      />
                    </label>
                  </div>
                </div>
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
