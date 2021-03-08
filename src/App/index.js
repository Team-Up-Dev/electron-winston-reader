import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

function App() {
  const [path, setPath] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    window.ipcRenderer.on("file:open", (dat, json) => {
      const realData = JSON.parse(json);
      setPath(realData.path);
      setData(realData.data);
    });
    window.ipcRenderer.on("file:change", (dat, json) => console.log(json));
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h1 className="text-center">
            {path === null ? "Insert File" : "Now Reading File"}
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <Button
            variant="primary"
            onClick={() => window.ipcRenderer.send("file:request")}
          >
            Choose File
          </Button>
        </Col>
      </Row>
      {data && data.length > 0 && (
        <Row className="justify-content-center mt-2">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Message</th>
                  <th>Level</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.message}</td>
                    <td>{row.level}</td>
                    <td>{row.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
