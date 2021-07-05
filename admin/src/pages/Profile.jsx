import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import student from "../img/student.png";
import Loading from "../components/Loading";
import pencil from "../img/pencilPrize.webp";
import shoe from "../img/englishPrize.png";
import bag from "../img/skillPrize.jpeg";

function Profile() {
  let { id } = useParams();
  const [data, setData] = useState();
  const [packages, setPackages] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const result = await Axios({
      method: "GET",
      url: `http://localhost:3000/getUser/${id}`,
    }).then(({ data }) => {
      return data;
    });

    setData(result);
    setPackages(result.userCarts);
  }



  function deleteCart (id) {
    Axios({
      method: "DELETE",
      url: `http://localhost:3000/deleteCart/${id}`,
    })
      .then(data => {
        fetchData()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateCart (id) {
    Axios({
      method: "PUT",
      url: `http://localhost:3000/updateCart/${id}`,
    })
      .then(data => {
        fetchData()
      })
      .catch((err) => {
        console.log(err);
      });
  }



  if (!data || !packages) {
    return <Loading />;
  }


  return (
    <div>
      <Container>
        <Card style={{ marginLeft: "250px" }} className="w-50 mt-5">
          <Card.Header style={{ fontSize: "30px", fontWeight: "bold" }}>
            {data?.userName}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>User Id </Card.Title>
                <Card.Text>{data.userId}</Card.Text>
                <Card.Title>Email</Card.Title>
                <Card.Text>{data.userEmail}</Card.Text>
                <Card.Title>Phone Number</Card.Title>
                <Card.Text>{data.userPhoneNumber}</Card.Text>
              </Col>
              <Col>
                <img width="220px" src={student} alt="" />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {packages.length > 0 ? (
          <Row className="mt-5" md={3}>
            {packages.map((pack) => {
              return (
                <Col className="mb-5" key={pack.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      style={{ height: "300px" }}
                      variant="top"
                      src={
                        pack.packageTag === "englishacademy"
                          ? "https://www.ruangguru.com/hubfs/1%20Homepage%20RG/EA_newwww.png"
                          : pack.packageTag === "skillacademy"
                          ? "https://www.ruangguru.com/hubfs/1%20Homepage%20RG/sa_newww.png"
                          : "https://www.ruangguru.com/hubfs/1%20Homepage%20RG/ruanglesonline.png"
                      }
                    />
                    <Card.Body>
                      <Card.Title>{pack.packageName}</Card.Title>
                      <Card.Img
                        style={{ height: "150px" }}
                        src={
                          pack.packageTag === "englishacademy"
                            ? shoe
                            : pack.packageTag === "skillacademy"
                            ? bag
                            : pencil
                        }
                      />
                      <div className="mt-3">
                      {
                        pack.orderStatus === "IN_PROGRESS" ? 
                        (
                          <div>
                            <Button onClick={() => updateCart(pack.id)} className="mr-3"  variant="success">Accept</Button>
                            <Button onClick={() => deleteCart(pack.id)} variant="danger">Reject</Button>
                          </div>
                        )
                        : 
                        (
                          <p className="text-success bg-light rounded">Berhasil Verifikasi Paket</p>
                        )
                      }
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <h3 className="mt-5 d-flex justify-content-md-center">Siswa Belum Mendaftar di Kelas Manapun</h3>
        )}
      </Container>
    </div>
  );
}

export default Profile;
