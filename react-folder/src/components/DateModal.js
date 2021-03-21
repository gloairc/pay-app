import { Modal, Button } from "react-bootstrap"
import SelectDate from "./SelectDate"

const DateModal = (props) => {

    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="dateRangePicker-modal"
                centered
                show={props.show}
                onHide={props.onHide}

            >
                <Modal.Header>
                    <Modal.Title id="dateRangePicker-modal">
                        Change Date Range
                        <Button variant="outline-secondary" onClick={props.onHide}>X</Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SelectDate setDateRange={props.setDateRange} onHide={props.onHide} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DateModal