import { Row, Button } from "react-bootstrap"
import { useParams, Link } from "react-router-dom";


const HistoryDetails = () => {
    const transactionId = useParams().id;

    return (
        <div>
            Transaction History Specific {transactionId}
            <div>
                <Row>
                    <Button as={Link} to="/history">All Transactions</Button>
                </Row>
            </div>
        </div>
    )
}

export default HistoryDetails