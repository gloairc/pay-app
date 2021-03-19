import { Alert, Form, Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react"
import axios from "axios"

const Transaction2 = (props) => {
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState()

    const balanceAmt = props.user.balance
    const pageHistory = useHistory();

    const handleBackClick = () => { //reset receipient
        console.log("handle back click")
        props.setReceipient({})
    }

    const showErrorMsg = () => {
        if (errorMsg) {
            return (
                <Alert variant="danger">{errorMsg[0]}</Alert>
            )
        }
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("sent");
        if (formData.amount > (balanceAmt)) {
            setErrorMsg(["You do not have sufficient amount"])
        } else { //sufficient amount
            //axios to own bank account and deduct
            //axios to R's account to add
            const completedFormData = { ...formData, from: props.user.username, to: props.receipient.username }
            axios
                .post("/api/transaction", completedFormData)
                .then((response) => {
                    console.log("response", response)
                    if (response.data.errors !== undefined) { //errors
                        setErrorMsg([response.data.message])
                    } else {
                        //redirect
                        pageHistory.push(`/history/{${response.data._id}}`)
                    }

                })
                .catch((error) => { //cannot connect
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

    return (
        <div>
            Transfer to {props.receipient.username}
            <div>
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="amount">
                        <Form.Label>
                            <span class="fw-bold">Amount</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={formData.amount}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, amount: event.target.value };
                                });
                            }}
                        />
                        Transferable Amount: ${balanceAmt}
                    </Form.Group>
                    <br />
                    <Form.Group controlId="comment">
                        <Form.Label>
                            <span class="fw-bold">Comment</span>
                        </Form.Label>
                        <Form.Control
                            type="string"
                            value={formData.comment}
                            onChange={(event) => {
                                setFormData((state) => {
                                    return { ...state, comment: event.target.value };
                                });
                            }}
                        />
                    </Form.Group>
                    <br />
                    <Row>
                        {showErrorMsg()}
                    </Row>

                    <Row>
                        <Button type="submit">Send</Button>
                    </Row>
                </Form>
            </div>


            <div class="mt-3">
                <Row>
                    <Button variant="outline-secondary" onClick={handleBackClick}>Back</Button>
                </Row>
            </div>
        </div>
    )
}

export default Transaction2