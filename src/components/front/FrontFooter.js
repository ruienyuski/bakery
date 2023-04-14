import { NavLink } from 'react-router-dom';

export default function FrontFooter() {
  return<>
    <div className="bg-light py-4">
    </div>
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <NavLink className="text-white h4" to="/">巷弄烘培坊</NavLink>
          {/* <ul className="d-flex list-unstyled mb-0 h4">
            <li><NavLink to="/" className="text-white mx-3"><i className="fab fa-facebook"></i></NavLink></li>
            <li><NavLink to="/" className="text-white mx-3"><i className="fab fa-instagram"></i></NavLink></li>
            <li><NavLink to="/" className="text-white ms-3"><i className="fab fa-line"></i></NavLink></li>
          </ul> */}
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">service@mail.com</p>
          </div>
          <p className="mb-0">© 202x 巷弄烘培坊 All Rights Reserved.</p>
        </div>
      </div>
    </div>      
  </>
}