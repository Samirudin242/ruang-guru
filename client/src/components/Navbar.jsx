import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { AuthContext } from "../context/auth";
import logo from "../img/logo.png";

function NavbarReact() {
  const context = useContext(AuthContext);
  const history = useHistory();
  function logOut() {
    context.logout();
    history.push("/");
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <Link to="/">
            <img
              src={logo}
              width="50"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="ml-5">
            <Link to="/learn">Koleksi Materi</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="mr-2">{context.user.userName}</Nav.Link>
          <FaUserGraduate size={30} className="mt-2" />
          <Nav.Link onClick={logOut} className="ml-5">
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarReact;
