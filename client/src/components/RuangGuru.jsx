import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import Loading from "./Loading";
import prizeImg from "../img/pencilPrize.webp";

function RuangGuru() {
  const [datas, setDatas] = useState();
  const [show, setShow] = useState(false);
  const [packageName, setPackageName] = useState("");
  useEffect(() => {
    async function fetchData() {
      const result = await Axios({
        method: "GET",
        url: "http://localhost:3000/package/ruangguru",
      }).then((data) => {
        return data;
      });

      setDatas(result.data);
    }
    fetchData();
  }, []);

  function addPackage(id) {
    Axios({
      method: "POST",
      url: `http://localhost:3000/addPackage/${id}`,
      headers: {
        token: localStorage.getItem("jwtToken"),
      },
    })
      .then(({ data }) => {
        setPackageName(data.data.packageName);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!datas) {
    return <Loading />;
  } else {
    return (
      <div className="mt-5">
        <Alert show={show} variant="success">
          <Alert.Heading>Berhasil Menambahkan Paket</Alert.Heading>
          <p>
            Selamat!! kamu berhasil menambahkan{" "}
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              {packageName}{" "}
            </span>
            kedalam koleksi materi belajar kamu. Kamu berpeluang mendapatkan
            hadiah menarik, setelah kami memverifikasi data kamu. Selamat
            Belajar 😊  
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Tutup
            </Button>
          </div>
        </Alert>
        <h2 className="mb-4 d-flex justify-content-center">Ruang Guru</h2>

        <Row>
          {datas.map((data) => {
            return (
              <Col key={data.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    style={{ height: "300px" }}
                    variant="top"
                    src="https://www.ruangguru.com/hubfs/1%20Homepage%20RG/ruanglesonline.png"
                  />
                  <Card.Body>
                    <Card.Title>{data.packageName}</Card.Title>
                    <Card.Img style={{ height: "150px" }} src={prizeImg} />
                    <Button
                      onClick={() => addPackage(data.id)}
                      className="mt-3"
                      variant="primary"
                    >
                      Daftar Sekarang
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default RuangGuru;
