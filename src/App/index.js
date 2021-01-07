import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function App() {
  const [path, setPath] = useState(null);
  // const [data, setData] = useState([]);

  useEffect(() => {
    window.ipcRenderer.on("file:open", (dat, json) => {
      const realData = JSON.parse(json);
      setPath(realData.path);
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
    </Container>
  );
}

export default App;
