import {Link, useOutletContext,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/front/Formelements';
import axios from 'axios';

export default function FrontCheckout() {
  const {cartData, getCart} = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const navigate = useNavigate();
  const onSubmit = async(data) => {
    const {name,email,address,tel,message} = data;
    const form = {
      data: {
        user: {
          name,email,address,tel
        },
        message
      }
    }
    const res =await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`,form);
    getCart();
    navigate(`/success/${res.data.orderId}`);
  };

  return<>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-4 pt-3">寄送資料</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">
        <div className="col-md-4">
          <div className="border p-4 mb-4">
          {
            cartData?.carts?.map((el) => {
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
            <table className="table mt-4 border-top border-bottom text-muted">
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
          </div>
        </div>
        <div className="col-md-6">
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-0">
              <Input
                id='email'
                labelText='Email'
                type='email'
                errors={errors}
                register={register}
                rules={{
                  required: 'Email 為必填',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email 格式不正確',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id='name'
                type='text'
                errors={errors}
                labelText='使用者名稱'
                register={register}
                rules={{
                  required: '使用者名稱為必填',
                  maxLength: {
                    value: 10,
                    message: '使用者名稱長度不超過 10',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id='tel'
                labelText='電話'
                type='tel'
                errors={errors}
                register={register}
                rules={{
                  required: '電話為必填',
                  minLength: {
                    value: 6,
                    message: '電話不少於 6 碼'
                  },
                  maxLength: {
                    value: 12,
                    message: '電話不超過 12 碼'
                  }
                }}
              ></Input>
            </div>
            <div className="mb-2">
            <Input
              id='address'
              labelText='地址'
              type='address'
              errors={errors}
              register={register}
              rules={{
                required: '地址為必填',
              }}
            ></Input>
            </div>
            <div className="mb-2">
              <label htmlFor="message" className="form-label">其他留言</label>
              <textarea name="message" {...register('message')} className="form-control" rows="3" id="message" placeholder="message ... "></textarea>
            </div>            
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to="/product" className="text-dark mt-md-0 mt-3"><i className="fas fa-chevron-left me-2"></i> 繼續購物</Link>
              <button type='submit'  className="btn btn-dark py-3 px-7">送出表單</button>
            </div>
          </form>
        </div>
      </div>      
    </div>
  </>
}