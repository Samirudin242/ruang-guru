import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

import { AuthContext } from "../context/auth";

function Login({ regis }) {
  const context = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const isInvalid = userId === "" || userEmail === "";
  const [error, setError] = useState();

  const onSubmit = async (event) => {
    Axios({
      method: "POST",
      url: "http://localhost:3000/login",
      data: {
        userId,
        userEmail,
      },
    })
      .then(({ data }) => {
        context.login(data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    event.preventDefault();
  };

  return (
    <div>
      <h5 style={{ color: "red" }}>{error}</h5>
      <Form onSubmit={onSubmit} className="border p-4 w-75 rounded">
        <h3 className="mb-3">Login</h3>
        <Form.Group>
          <Form.Label>User ID</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserId(target.value)}
            value={userId}
            type="text"
            placeholder="Enter User Id"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserEmail(target.value)}
            value={userEmail}
            type="email"
            placeholder="Enter Email"
          />
        </Form.Group>
        <Button disabled={isInvalid} variant="primary" type="submit">
          Submit
        </Button>
        <p className="mt-5 ml-5">
          Belum mempunyai akun ?{" "}
          <span
            style={{ fontSize: "17px", fontWeight: "600", cursor: "pointer" }}
            onClick={regis}
          >
            Register
          </span>
        </p>
      </Form>
    </div>
  );
}

export default Login;
