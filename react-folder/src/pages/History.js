import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";

const History = () => {

    return (
        <div>
            Transaction History


            <div class="mt-3">
                <Row>
                    <Button variant="outline-secondary" as={Link} to="/landing">Back</Button>
                </Row>
            </div>
        </div>
    )
}

export default History