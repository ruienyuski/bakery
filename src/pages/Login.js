import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [loginState, setLoginState] = useState({});
  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value});
  }

  const submit = async(e) => {

    try {
      const loginData = await axios.post(`/v2/admin/signin`, data);
      const {token, expired} = loginData.data;
    
      document.cookie =`hexToken=${token}; expires=${new Date(expired)};`
    
      if(loginData.data.success) {
        navigate('/admin/products');
      }
    } catch (error) {
  
      setLoginState(error.response.data);
      console.log(loginState);
    }


}



  return (<div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>登入帳號</h2>

        <div className={`alert alert-danger ${loginState.message ? 'd-block' : 'd-none'}`} role="alert">
          {loginState.message}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label w-100">
            Email
            <input id="email" className="form-control" onChange={handleChange} name="username" type="email" placeholder="Email Address" />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label w-100">
            密碼
            <input type="password" className="form-control" onChange={handleChange}  name="password" id="password"  />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
      </div>
    </div>
  </div>)
}

export default Login;