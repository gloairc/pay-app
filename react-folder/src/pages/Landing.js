import { Button, Row } from "react-bootstrap"

const Landing = (props) => {

    return (
        <div id="landing-cont" class="container-fluid">

            <div>
                <h3>Balance: </h3>
                <h4>${props.user.balance}</h4>
            </div>

            <div class="mt-3">
                <Row>
                    <Button href="/history" block>View History</Button>
                </Row>
                <br />
                <Row>
                    <Button href="/transfer/1" block> Make Transaction</Button>
                </Row>
            </div>

        </div>
    )
}

export default Landing