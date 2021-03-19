import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";


const Transaction1 = () => {

    return (
        <div>
            Enter name
            <div>
                <Row>
                    <Button as={Link} to="/landing">Back</Button>
                </Row>

            </div>
        </div>
    )
}

export default Transaction1