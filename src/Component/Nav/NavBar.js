import React from "react";

export default function NavBar() {
  const navLinkStyle = {
    transition: "all 0.3s ease",
  };
  return (
    <div className="header-bottom  header-sticky">
      <div className="container">
        <div className="row align-items-center">
          {/* <!-- Logo --> */}
          <div className="col-xl-2 col-lg-2">
            <div className="logo">
              <a href="index.html">
                <img
                  src="./img/logo/logo-01.png"
                  alt=""
                  height="39"
                  width="171"
                />
              </a>
              {/* <a href="index.html"><img src="assets" alt="" height="39" width="171"/></a> */}
            </div>
          </div>
          <div className="col-xl-10 col-lg-10">
            <div className="menu-wrapper  d-flex align-items-center justify-content-end">
              {/* <!-- Main-menu --> */}
              <div className="main-menu d-none d-lg-block">
                <nav>
                  <ul id="navigation">
                    <li>
                      <a href="#" style={navLinkStyle}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#about" style={navLinkStyle}>
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#services" style={navLinkStyle} >
                        Services
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* <!-- Header-btn --> */}
              <div className="header-right-btn d-none d-lg-block ml-20">
                <a href="#contact" className="btn header-btn" style={navLinkStyle}>
                  Contact
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Mobile Menu --> */}
          <div className="col-12">
            <div className="mobile_menu d-block d-lg-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
