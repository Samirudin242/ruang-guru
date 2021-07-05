import React, { useEffect, useState } from "react";
import Axios from "axios";
import NavbarReact from "../components/Navbar";
import Loading from "../components/Loading";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import pencil from "../img/pencilPrize.webp";
import shoe from "../img/englishPrize.png";
import bag from "../img/skillPrize.jpeg";

function Learn() {
  const [datas, setDatas] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await Axios({
        method: "GET",
        url: "http://localhost:3000/getUserData",
        headers: {
          token: localStorage.getItem("jwtToken"),
        },
      }).then((data) => {
        return data;
      });

      setDatas(result.data.user.userCarts);
    }
    fetchData();
  }, []);

  if (!datas) {
    return <Loading />;
  }

  return (
    <div>
      <Container>
        <NavbarReact />
        <div className="mt-5">
          <Row md={3} className="justify-content-md-center">
            {datas.map((data) => {
              return (
                <Col className="mb-5" key={data.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      style={{ height: "300px" }}
                      variant="top"
                      src={
                        data.packageTag === "englishacademy"
                          ? "https://www.ruangguru.com/hubfs/1%20Homepage%20RG/EA_newwww.png"
                          : data.packageTag === "skillacademy"
                          ? "https://www.ruangguru.com/hubfs/1%20Homepage%20RG/sa_newww.png"
                          : "https://www.ruangguru.com/hubfs/1%20Homepage%20RG/ruanglesonline.png"
                      }
                    />
                    <Card.Body>
                      <Card.Title>{data.packageName}</Card.Title>
                      <Card.Img
                        style={{ height: "150px" }}
                        src={
                          data.packageTag === "englishacademy"
                            ? shoe
                            : data.packageTag === "skillacademy"
                            ? bag
                            : pencil
                        }
                      />
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Learn;
