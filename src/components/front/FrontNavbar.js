import { NavLink } from 'react-router-dom';

export default function FrontNavbar({cartData}) {

  return<>
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink className="navbar-brand fs-1" to="/">巷弄烘培坊</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <NavLink className="nav-link fs-5" aria-current="page" to="/">首頁</NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link fs-5" to="/product">菜單</NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link fs-5" to="/admin/products">後台</NavLink>
            </li>
            <li className="nav-item mx-3 ">
              <NavLink className="nav-link" to="/cart">
                <div className="position-relative" style={{'width': '20px'}}>
                  <i className="bi bi-cart-fill fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartData?.carts?.length}
                  </span>                  
                </div>
              </NavLink>
            </li>                         
          </ul>
        </div>
      </div>
    </nav>    
  </>
}