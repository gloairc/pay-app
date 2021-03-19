import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react"
import axios from "axios"


const Transaction1 = (props) => {
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("check receipient username");
        axios
            .get("/api/user", { params: { username: formData.username } })
            .then((response) => {
                console.log("response", response)
                if (response.data._id === undefined) {
                    setErrorMsg("There is no such user.")
                }

            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    const showErrorMsg = () => {
        if (errorMsg) {
            return (
                <Alert variant="danger">{errorMsg}</Alert>
            )
        }
    }

    return (
        <div>
            Choose a Receipient
            <div>
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="username">
                        <Form.Label>
                            <span class="fw-bold">Username</span>
                        </Form.Label>
                        <Form.Control
                            type="string"
                            value={formData.username}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, username: event.target.value };
                                });
                            }}
                        />
                    </Form.Group>
                    <br />
                    <Row>
                        {showErrorMsg()}
                    </Row>

                    <Row>
                        <Button type="submit">Next</Button>
                    </Row>
                </Form>
            </div>

            <div class="mt-3">
                <Row>
                    <Button variant="outline-secondary" as={Link} to="/landing">Back</Button>
                </Row>
            </div>

        </div>
    )
}

export default Transaction1