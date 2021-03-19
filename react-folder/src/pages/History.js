import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";

const History = () => {

    return (
        <div>
            Transaction History

            <div>
                <Row>
                    <Button as={Link} to="/landing">Back</Button>
                </Row>
            </div>
        </div>
    )
}

export default History