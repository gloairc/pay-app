import { Alert, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react"

const Transaction2 = (props) => {
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState()

    const balanceAmt = props.user.balance

    const handleBackClick = () => { //reset receipient
        console.log("handle back click")
        props.setReceipient({})
    }

    const showErrorMsg = () => {
        if (errorMsg) {
            return (
                <Alert variant="danger">{errorMsg}</Alert>
            )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("sent");
        if (formData.amount > (balanceAmt)) {
            setErrorMsg("You do not have enough")
        } else {
            //axios to own bank account and deduct
            //axios to R's account to add
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