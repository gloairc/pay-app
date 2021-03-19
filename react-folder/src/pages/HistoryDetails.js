import { Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom";


const HistoryDetails = () => {

    return (
        <div>
            Transaction History Specific
            <div>
                <Row>
                    <Button as={Link} to="/history">Back</Button>
                </Row>
            </div>
        </div>
    )
}

export default HistoryDetails