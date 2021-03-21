import { Alert, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react"

const SelectDate = (props) => {
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log("formData", formData);
        setErrorMsg("")

        if (formData.startDate === undefined || formData.endDate === undefined) {
            console.log("form is not valid")
        } else if (formData.startDate > formData.endDate) {
            setErrorMsg("Start date cannot be later than end date")
        } else {
            const selectedDateRange = {
                startDate: formData.startDate,
                endDate: formData.endDate
            }
            props.setDateRange(selectedDateRange);
            props.onHide()
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center mb-3">
                    <Col id="startDate-col" xs="auto">
                        <Form.Group controlId="startDateInput">
                            <Form.Label column sm>Start Date:</Form.Label>

                            <Form.Control
                                required
                                type="date"
                                title="startDate"
                                onChange={(event) => {
                                    setFormData((state) => {
                                        return { ...state, startDate: event.target.value }
                                    })
                                }}
                            />
                        </Form.Group>
                    </Col>



                    <Col id="endDate-col" xs="auto">
                        <Form.Group controlId="endDateInput">
                            <Form.Label column sm>End Date:</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                title="endDate"
                                onChange={(event) => {
                                    setFormData((state) => {
                                        return { ...state, endDate: event.target.value }
                                    })
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {
                    errorMsg ? (<Row>
                        <Alert variant="danger">{errorMsg}</Alert>
                    </Row>) : (<div></div>)
                }
                <Row>
                    <Button variant="info" type="submit">
                        Select</Button>
                </Row>
            </Form >
        </div >
    )
}

export default SelectDate