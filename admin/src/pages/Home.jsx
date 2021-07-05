import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom";
import Axios from "axios";

import Loading from "../components/Loading";
import student from "../img/student.png" 


function Home() {
  const [datas, setDatas] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await Axios({
        method: "GET",
        url: "http://localhost:3000/allUser",
      }).then(({ data }) => {
        return data;
      });

      setDatas(result);
    }
    fetchData();
  }, []);

  if(!datas) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <Container>
        <h1 className="mb-5 mt-4 d-flex justify-content-center">Daftar Siswa</h1>
        {datas.length === 0 ? 
        (
          <h1 className="mb-5 mt-4 d-flex justify-content-center">Belum ada siswa yang mendaftar</h1>
        )
        : 
        (
        <Row md={3}>
          {datas.map((data) => {
            return (
              <Col key={data.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={student} />
                  <Card.Body>
                    <Card.Title>{data.userName}</Card.Title>
                    <Card.Text>
                      {data.userEmail}
                    </Card.Text>
                    <Link to={`/profile/${data.id}`}>
                      <Button variant="primary">Lihat Profile</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        )
      }
      </Container>
    </div>
  );
}

export default Home;
