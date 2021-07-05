import React, { useState, useEffect } from "react";
import logo from "../img/logo.png";
import { Row, Col, Container } from "react-bootstrap";
import "./style/frontPage.css";

import Register from "./Register";
import Login from "./Login";

function FrontPage() {
  let arr = ["Super Canggih", "Super Lengkap", "Super Praktis", "Super Murah"];
  const [register, setRegister] = useState(false);
  const [tagline, setTagline] = useState(arr[0]);
  let a = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setTagline(arr[a]);
      a === arr.length - 1 ? (a = 0) : (a += 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function isRegister() {
    setRegister(!register);
  }

  return (
    <div>
      <Container className="containerCustom">
        <Row className>
          <Col className="ml-3">
            <img
              src={logo}
              alt="ruang guru logo"
              width="350px"
              height="200px"
            />
            <div
              style={{ fontSize: "34px", fontWeight: "700", cursor: "pointer" }}
              className="mt-3"
            >
              <p style={{ marginBottom: "0" }}>Ruang Guru Super App:</p>
              <p>
                Belajar <span>{tagline}</span>
              </p>
            </div>
          </Col>
          <Col>
            {register ? (
              <Register regis={isRegister} />
            ) : (
              <Login regis={isRegister} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FrontPage;
