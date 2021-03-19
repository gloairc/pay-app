import { Button, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Landing = (props) => {

    return (
        <div id="landing-cont" class="container-fluid">

            <div>
                <h3>Balance: </h3>
                <h4>${props.user.balance}</h4>
            </div>

            <div class="mt-3">
                <Row>
                    <Button as={Link} to="/history" block>View History</Button>
                </Row>
                <br />
                <Row>
                    <Button as={Link} to="/transfer/1" block> Make Transaction</Button>
                </Row>
            </div>

        </div>
    )
}

export default Landing