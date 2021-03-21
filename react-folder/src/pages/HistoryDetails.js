import { Row, Button, Col, Card, ListGroup } from "react-bootstrap"
import { useParams, Link } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";

const HistoryDetails = (props) => {
    const [transferDetail, setTransferDetail] = useState({})
    const [received, setReceived] = useState(false) //defaut give

    const transactionId = useParams().id;

    // console.log("props.user", props.user)
    //based on id -> axios and retrieve details
    // sent/ received, amount, from/to, datetime, transaction id, note
    useEffect(() => {
        axios
            .get(`/api/transaction/${transactionId}`)
            .then((response) => {
                // console.log("transferDetails", response)
                const formattedDate = new Date(response.data.createdAt).toLocaleString("en-AU")
                const updatedTransferDetails = { ...response.data, createdAt: formattedDate }
                setTransferDetail(updatedTransferDetails)
                // console.log("formattedDate", formattedDate);
                // console.log("updatedTransferDetails", updatedTransferDetails)
                if (response.data.to === props.user.username) {
                    setReceived(true)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, []) // only on loading

    return (
        <div>
            <div>
                <h4 className="text-center">Transaction Details</h4>
            </div>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col sm className="text-muted" >You {received ? (<span> received</span>) : (<span> sent</span>)}</Col>
                            <Col sm className="text-end"> SGD ${transferDetail.amount ? (<span>{transferDetail.amount.toFixed(2)}</span>) : (<></>)} </Col>
                        </Row>

                        <Row>
                            <Col sm className="text-muted">{received ? (<span>From</span>) : (<span>To</span>)}</Col>
                            <Col sm className="text-end">{received ? (<span>{transferDetail.from}</span>) : (<span>{transferDetail.to}</span>)}</Col>
                        </Row>

                        <Row>
                            <Col sm className="text-muted">Date & Time </Col>
                            <Col sm className="text-end">  {transferDetail ? (<span>{transferDetail.createdAt}</span>) : (<></>)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col className="text-muted">Transaction ID: </Col>
                        </Row>
                        <Row>
                            <Col>{transactionId}</Col>
                        </Row>
                        <Row>
                            <Col className="text-muted">Comment:</Col>
                        </Row>
                        <Row>
                            <Col>{transferDetail ? (<span>{transferDetail.comment}</span>) : (<></>)}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>

            <div class="mt-3">
                <Row>
                    <Button variant="outline-secondary" as={Link} to="/history">All Transactions</Button>
                </Row>
            </div>
        </div>
    )
}

export default HistoryDetails