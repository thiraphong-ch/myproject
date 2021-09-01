import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import { NavLink, useHistory } from "react-router-dom";

// import { UserStoreContext } from "../context/UserContext";

//redux
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const NavBar = () => {
  const history = useHistory();
  // const [profile, setProfile] = React.useState(null);
  // const userStore = React.useContext(UserStoreContext);

  //redux
  const profileRedux = useSelector((state) => state.authReducer.profile);
  const totalRedux = useSelector((state) => state.cartReducer.totalR);
  const dispatch = useDispatch();

  // Version Old (Not use Context)
  // const getProfile = () => {
  //   const profileValue = JSON.parse(localStorage.getItem("profile"));
  //   if (profileValue) {
  //     setProfile(profileValue);
  //   }
  // };

  // React.useEffect(() => {
  //   console.log("use Effect Navbar");
  //   getProfile();
  // }, []);

  // Version Context
  // const getProfile = () => {
  //   const profileValue = JSON.parse(localStorage.getItem("profile"));
  //   if (profileValue) {
  //     userStore.updateProfile(profileValue);
  //   }
  // };

  // React.useEffect(() => {
  //   // console.log("use Effect Navbar");
  //   getProfile();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("profile");
  //   history.replace("/");
  //   // history.go(0);
  //   userStore.updateProfile(null);
  // };

  //redux section 9
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  };

  React.useEffect(() => {
    // console.log("use Effect Navbar");
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.replace("/");
    // history.go(0);
    dispatch(updateProfile(null));
  };

  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark">
        <NavLink className="navbar-brand" to="/" exact={true}>
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Posuto Logo"
          />{" "}
          React API
        </NavLink>
        {/* <Navbar.Brand href="#home">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Posuto Logo"
          />{" "}
          React Bootstrap
        </Navbar.Brand> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/" exact activeClassName="active">
              หน้าหลัก
            </NavLink>
            <NavLink className="nav-link" to="/about" activeClassName="active">
              ประวัติผู้พัฒนาเว็บ
            </NavLink>
            <NavLink
              className="nav-link"
              to="/product"
              activeClassName="active"
            >
              สินค้า
            </NavLink>

            <NavLink className="nav-link" to="/cart" activeClassName="active">
              ตะกร้าสินค้า {totalRedux} ชิ้น
            </NavLink>

            <NavDropdown
              title="Workshop (Pagination + CRUD)"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/hospital");
                }}
              >
                ข้อมูลสถานพยาบาล (Pagination)
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/category");
                }}
              >
                หมวดหมู่ข่าว (CRUP)
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink className="nav-link" to="/upload" activeClassName="active">
              อัปโหลดไฟล์
            </NavLink>
            <NavLink className="nav-link" to="/member" activeClassName="active">
              เมนูสมาชิก
            </NavLink>
            <NavLink className="nav-link" to="/chart" activeClassName="active">
              รายงาน Charts
            </NavLink>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          {/* {userStore.profile ? (
            <span className="navbar-text text-white">
              ยินดีต้อนรับคุณ {userStore.profile.name} role:{" "}
              {userStore.profile.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                Log out
              </button>
            </span>
          ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/register"
                  activeClassName="active"
                >
                  สมัครสมาชิก
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  เข้าระบบ
                </NavLink>
              </Nav>
            </>
          )} */}

          {profileRedux ? (
            <span className="navbar-text text-white">
              ยินดีต้อนรับคุณ {profileRedux.name} role: {profileRedux.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                Log out
              </button>
            </span>
          ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/register"
                  activeClassName="active"
                >
                  สมัครสมาชิก
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  เข้าระบบ
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
