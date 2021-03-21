import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useEffect, useState } from "react"

const Record = (props) => {
    const [isReceived, setIsReceived] = useState(false)

    useEffect(() => {
        if (props.data.to === props.user.username) { //user received
            setIsReceived(true)
        }
    }, [])


    return (
        <Card key={props.index}>

            <Row>
                <Col >
                    {new Date(props.data.createdAt).toLocaleDateString("en-AU")}
                </Col>


                <Col>
                    <Row>{isReceived ? (<>Receive</>) : (<>Send</>)}</Row>
                    <Row className="text-muted">{isReceived ? (<>From {props.data.from}</>) : (< >To {props.data.to}</>)}  </Row>
                </Col>

                <Col className="d-flex justify-content-center align-items-center">
                    <div >
                        {isReceived ? (<>+ SGD ${props.data.amount.toFixed(2)} </>) : (<> - SGD ${props.data.amount.toFixed(2)} </>)}
                        {"   "}
                        <Button size="sm" className="p-0" variant="light"
                            as={Link} to={`/history/${props.data._id}`}>
                            <KeyboardArrowRight /></Button>
                    </div>
                </Col>
            </Row>

        </Card >
    )
}

export default Record