import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react"
import axios from "axios"
// import ShowMsg from "../components/ShowErrorMsg"


const Transaction1 = (props) => {
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.username === undefined) {
            setErrorMsg("Please enter a receipient.")
        }
        else if (formData.username === props.user.username) {
            setErrorMsg("You cannot transfer money to yourself.")
        } else {
            setErrorMsg("")
            axios
                .get("/api/user", { params: { username: formData.username } })
                .then((response) => {
                    // console.log("response", response)
                    if (response.data._id === undefined) { // alert no such user
                        setErrorMsg("There is no such user.")
                    } else { // there is such user, move on to next step
                        // let basicReceipientInfo = [response.data]
                        // props.setReceipient(basicReceipientInfo)
                        // console.log("BRI", basicReceipientInfo)
                        props.setReceipient(response.data)
                        // console.log("BRI", basicReceipientInfo)
                    }

                })
                .catch((error) => {
                    console.log("error", error)
                    if (error.response === undefined) { //JSON token error etc
                        setErrorMsg(error.message)
                    }
                    else if (error.response.data.error === undefined) {
                        setErrorMsg(error.response.statusText);
                    } else {
                        setErrorMsg(
                            error.response.statusText + ", " + error.response.data.error
                        );
                    }
                })
        }
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
            <h4 className="text-center">Choose a Receipient</h4>
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
                        {/* <ShowMsg error={errorMsg} /> */}
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