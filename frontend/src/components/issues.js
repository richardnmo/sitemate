import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function NewIssue() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} md="4" controlId="issueName">
        <Form.Label>Issue</Form.Label>
        <Form.Control required type="text" placeholder="Issue name" />
        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        <Form.Control.Feedback type="invalid">
          Please input a name.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="issueDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control required type="text" placeholder="Issue description" />
        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        <Form.Control.Feedback type="invalid">
          Please input a description for your issue.
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Create Issue</Button>
    </Form>
  );
}

export default NewIssue;
