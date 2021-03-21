import { useEffect } from "react"
import { Button, Row, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const Landing = (props) => {

    useEffect(() => {
        sessionStorage.removeItem("tempDateRange");
    }, [])

    return (
        <div id="landing-cont" class="container-fluid">

            <Row>
                <h5 className="text-center">Welcome {props.user.username}</h5>
            </Row>

            <Card>
                <Card.Body>
                    <h3>Balance: </h3>
                    <h4 className="text-end">SGD ${(props.user.balance).toFixed(2)}</h4>
                </Card.Body>
            </Card>

            <div class="mt-3">
                <Row>
                    <Button as={Link} to="/history" block>View History</Button>
                </Row>
                <br />
                <Row>
                    <Button as={Link} to="/transfer" block> Make Transaction</Button>
                </Row>
            </div>

        </div>
    )
}

export default Landing