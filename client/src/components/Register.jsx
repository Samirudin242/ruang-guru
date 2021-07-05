import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

function Register({ regis }) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const isInvalid =
    userId === "" ||
    userName === "" ||
    userEmail === "" ||
    userPhoneNumber === "";
  const [error, setError] = useState([]);

  const onSubmit = async (event) => {
    Axios({
      method: "POST",
      url: "http://localhost:3000/register",
      data: {
        userId,
        userName,
        userEmail,
        userPhoneNumber,
      },
    })
      .then(({ data }) => {
        regis();
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
        <h3 className="mb-3">Register</h3>
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserName(target.value)}
            value={userName}
            type="text"
            placeholder="Enter User Name"
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
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserPhoneNumber(target.value)}
            value={userPhoneNumber}
            type="text"
            placeholder="Enter Phone Number"
          />
        </Form.Group>
        <Button disabled={isInvalid} variant="primary" type="submit">
          Submit
        </Button>
        <p className="mt-5 ml-5">
          Sudah mempunyai akun ?{" "}
          <span
            style={{ fontSize: "17px", fontWeight: "600", cursor: "pointer" }}
            onClick={regis}
          >
            Login
          </span>
        </p>
      </Form>
    </div>
  );
}

export default Register;
