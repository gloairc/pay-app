import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useState } from "react"

const Transaction2 = () => {

    return (
        <div>
            enter amount


            <div class="mt-3">
                <Row>
                    <Button variant="outline-secondary" as={Link} to="/transfer/1">Back</Button>
                </Row>
            </div>
        </div>
    )
}

export default Transaction2