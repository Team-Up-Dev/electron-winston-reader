import { Container, Row, Col, Button } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h1 className="text-center">Insert File</h1>
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
