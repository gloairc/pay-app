import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const Transaction1 = (props) => {

    return (
        <div>
            Choose a Receipient
            <div>
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>
                            <span class="fw-bold">Username</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder={props.usernameText}
                                value={props.formData.username}
                                onChange={(event) => {
                                    // console.log(event.target)
                                    props.setFormData((state) => {
                                        return { ...state, username: event.target.value };
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </div>



            <div>
                <Row>
                    <Button as={Link} to="/landing">Back</Button>
                </Row>

            </div>
        </div>
    )
}

export default Transaction1