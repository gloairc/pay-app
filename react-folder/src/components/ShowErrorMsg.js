import { Alert } from "react-bootstrap";

const showErrorMsg = (props) => {
    if (props.error) {
        return (
            <Alert variant="danger">{props.error}</Alert>
        )
    }
}

export default showErrorMsg