import { jwtDecode } from "jwt-decode";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface UserData {
  avatar?: string; // Use optional chaining if the property might not exist
  name?: string;
  // Add other properties as needed
}

const NavbarAdmin: React.FC = () => {
  const token: string | null = localStorage.getItem("token");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (token) {
      const user: UserData = jwtDecode(token);
      setUserData(user);
      console.log(user);
    }
  }, []);

  return (
    <div>
      {(() => {
        if (token === null) {
          return (
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark container-fluid">
              <div className="ms-3">
                <Link
                  to="/"
                  className="navbar-brand"
                  style={{ fontWeight: 900, color: "lightpink" }}
                >
                  <span>Linh's Bookstore</span>
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ms-3 ms-md-0 mb-2 mb-lg-0 text-nowrap">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      Trang Chủ
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      id="navbarDropdown1"
                      href="#"
                    >
                      Vận Hành
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-start mt-0"
                      aria-labelledby="navbarDropdown1"
                    >
                      <Link to={"/admin/book-manage"} className="dropdown-item">
                        Quản Lý Sản Phẩm
                      </Link>
                      <Link
                        to={"/admin/order-manage"}
                        className="dropdown-item"
                      >
                        Quản Lý Đơn Hàng
                      </Link>
                      <Link to={"/"} className="dropdown-item">
                        xxxx
                      </Link>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      id="navbarDropdown2"
                      href="#"
                    >
                      Quản Lý Quy Định
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-start mt-0"
                      aria-labelledby="navbarDropdown2"
                    >
                      <Link to={"/admin/rule/1"} className="dropdown-item">
                        Quy Định 1
                      </Link>
                      <Link to={"/admin/rule/2"} className="dropdown-item">
                        Quy Định 2
                      </Link>
                      <Link to={"/admin/rule/3"} className="dropdown-item">
                        Quy Định 3
                      </Link>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/admin/contact"}>
                      Liên Hệ
                    </Link>
                  </li>
                </ul>
                <div className="search-box d-block d-lg-flex ms-3 me-3 ms-lg-auto">
                  <ul className="navbar-nav mb-2 mb-lg-0 me-2 d-none d-lg-block">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        id="navbarDropdown3"
                        href="#"
                      >
                        <i className="fa-solid fa-user"></i>
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end mt-1"
                        aria-labelledby="navbarDropdown3"
                      >
                        <Link to={"/register"} className="dropdown-item">
                          Đăng Ký
                        </Link>
                        <Link to={"/login"} className="dropdown-item">
                          Đăng Nhập
                        </Link>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-xl-none offcanvas offcanvas-start" id="demo">
                <div className="offcanvas-header">
                  <a
                    href=""
                    className="navbar-brand"
                    style={{ fontWeight: 900, color: "lightpink" }}
                  >
                    <span>Linh's Bookstore</span>
                  </a>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <form className="d-flex ">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control me-2"
                      placeholder="Tìm Kiếm"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      typeof="submit"
                    >
                      Search
                    </button>
                  </form>

                  <ul className="navbar-nav mt-3 ms-3 ms-lg-0 mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active text-dark" href="#">
                        Trang Chủ
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-dark"
                        data-bs-toggle="dropdown"
                        id="navbarDropdown1"
                        href="#"
                      >
                        Vận Hành
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-start mt-0"
                        aria-labelledby="navbarDropdown1"
                      >
                        <li className="dropdown-item">Quản Lý Sản Phẩm</li>
                        <li className="dropdown-item">Quản Lý Đơn Hàng</li>
                        <li className="dropdown-item">xxx</li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-dark"
                        data-bs-toggle="dropdown"
                        id="navbarDropdown2"
                        href="#"
                      >
                        Quản Lý Quy Định
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-start mt-0"
                        aria-labelledby="navbarDropdown2"
                      >
                        <li className="dropdown-item">Quy Định 1</li>
                        <li className="dropdown-item">Quy Định 2</li>
                        <li className="dropdown-item">Quy Định 3</li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-dark" href="#">
                        Liên Hệ
                      </a>
                    </li>
                  </ul>
                  <hr />

                  <div className="d-flex flex-column">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-2 me-2">
                      <li className="nav-item">
                        <a className="nav-link">
                          <i className="fa-solid fa-cart-shopping text-dark"></i>
                          <span className="text-dark ms-2">Giỏ hàng</span>
                        </a>
                      </li>
                    </ul>

                    <ul className="navbar-nav mb-2 mb-lg-0 ms-2 me-2">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          data-bs-toggle="dropdown"
                          id="navbarDropdown3"
                          href="#"
                        >
                          <i className="fa-solid fa-user text-dark"></i>
                          <span className="text-dark ms-2">User</span>
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-end mt-1"
                          aria-labelledby="navbarDropdown3"
                        >
                          <li className="dropdown-item text-dark">Hồ Sơ</li>
                          <li className="dropdown-item text-dark">Đăng Xuất</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-dark d-block d-xl-none me-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#demo"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </nav>
          );
        } else {
          return (
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark container-fluid">
              <div className="ms-3">
                <Link
                  to="/"
                  className="navbar-brand"
                  style={{ fontWeight: 900, color: "lightpink" }}
                >
                  <span>Linh's Bookstore</span>
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav ms-3 ms-md-0 mb-2 mb-lg-0 text-nowrap">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link active">
                      Trang Chủ
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      id="navbarDropdown1"
                      href="#"
                    >
                      Vận Hành
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-start mt-0"
                      aria-labelledby="navbarDropdown1"
                    >
                      <Link to={"/admin/book-manage"} className="dropdown-item">
                        Quản Lý Sản Phẩm
                      </Link>
                      <Link
                        to={"/admin/order-manage"}
                        className="dropdown-item"
                      >
                        Quản Lý Đơn Hàng
                      </Link>
                      <Link to={"/"} className="dropdown-item">
                        xxxx
                      </Link>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      id="navbarDropdown2"
                      href="#"
                    >
                      Quản Lý Quy Định
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-start mt-0"
                      aria-labelledby="navbarDropdown2"
                    >
                      <Link to={"/admin/rule/1"} className="dropdown-item">
                        Quy Định 1
                      </Link>
                      <Link to={"/admin/rule/2"} className="dropdown-item">
                        Quy Định 2
                      </Link>
                      <Link to={"/admin/rule/3"} className="dropdown-item">
                        Quy Định 3
                      </Link>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/admin/contact"}>
                      Liên Hệ
                    </Link>
                  </li>
                </ul>
                <div className="search-box d-block d-lg-flex ms-3 me-3 ms-lg-auto">
                  <ul className="navbar-nav mb-2 mb-lg-0 me-2 d-none d-lg-block">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        id="navbarDropdown3"
                        href="#"
                      >
                        <i className="fa-solid fa-user"></i>
                      </a>

                      <ul
                        className="dropdown-menu dropdown-menu-end mt-2"
                        aria-labelledby="navbarDropdown3"
                      >
                        <Link to={"/profile"} className="dropdown-item">
                          Hồ Sơ
                        </Link>
                        <Link to={"/logout"} className="dropdown-item">
                          Đăng Xuất
                        </Link>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-xl-none offcanvas offcanvas-start" id="demo">
                <div className="offcanvas-header">
                  <a
                    href=""
                    className="navbar-brand"
                    style={{ fontWeight: 900, color: "lightpink" }}
                  >
                    <span>Linh's Bookstore</span>
                  </a>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <form className="d-flex ">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control me-2"
                      placeholder="Tìm Kiếm"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      typeof="submit"
                    >
                      Search
                    </button>
                  </form>

                  <ul className="navbar-nav mt-3 ms-3 ms-lg-0 mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active text-dark" href="#">
                        Trang Chủ
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-dark"
                        data-bs-toggle="dropdown"
                        id="navbarDropdown1"
                        href="#"
                      >
                        Vận Hành
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-start mt-0"
                        aria-labelledby="navbarDropdown1"
                      >
                        <li className="dropdown-item">Quản Lý Sản Phẩm</li>
                        <li className="dropdown-item">Quản Lý Đơn Hàng</li>
                        <li className="dropdown-item">xxx</li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-dark"
                        data-bs-toggle="dropdown"
                        id="navbarDropdown2"
                        href="#"
                      >
                        Quy Định Bán Hàng
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-start mt-0"
                        aria-labelledby="navbarDropdown2"
                      >
                        <li className="dropdown-item">Quy Định 1</li>
                        <li className="dropdown-item">Quy Định 2</li>
                        <li className="dropdown-item">Quy Định 3</li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-dark" href="#">
                        Liên Hệ
                      </a>
                    </li>
                  </ul>
                  <hr />

                  <div className="d-flex flex-column">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-2 me-2">
                      <li className="nav-item">
                        <a className="nav-link">
                          <i className="fa-solid fa-cart-shopping text-dark"></i>
                          <span className="text-dark ms-2">Giỏ hàng</span>
                        </a>
                      </li>
                    </ul>

                    <ul className="navbar-nav mb-2 mb-lg-0 ms-2 me-2">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          data-bs-toggle="dropdown"
                          id="navbarDropdown3"
                          href="#"
                        >
                          <i className="fa-solid fa-user text-dark"></i>
                          <span className="text-dark ms-2">User</span>
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-end mt-1"
                          aria-labelledby="navbarDropdown3"
                        >
                          <li className="dropdown-item text-dark">Hồ Sơ</li>
                          <li className="dropdown-item text-dark">Đăng Xuất</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-dark d-block d-xl-none me-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#demo"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </nav>
          );
        }
      })()}
    </div>
  );
};

export default NavbarAdmin;