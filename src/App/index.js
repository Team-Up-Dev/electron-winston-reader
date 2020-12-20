import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function App() {
  const [path, setPath] = useState(null);

  useEffect(() => {
    window.ipcRenderer.on("file:open", (data, path) => setPath(path));
    window.ipcRenderer.on("file:change", (data, path) => {});
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
