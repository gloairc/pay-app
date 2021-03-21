import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react"

const SelectDate = (props) => {
    const [formData, setFormData] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        const selectedDateRange = {
            startDate: formData.startDate,
            endDate: formData.endDate
        }
        props.setDateRange(selectedDateRange)
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col id="startDate-col" xs="auto">
                        <Form.Group as={Row} controlId="startDateInput">
                            <Form.Label column sm>Start Date:</Form.Label>
                            <Col sm>
                                <Form.Control
                                    type="date"
                                    title="startDate"
                                    onChange={(event) => {
                                        setFormData((state) => {
                                            return { ...state, startDate: event.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col id="endDate-col" xs="auto">
                        <Form.Group as={Row} controlId="endDateInput">
                            <Form.Label column sm>End Date:</Form.Label>
                            <Col sm>
                                <Form.Control
                                    type="date"
                                    title="endDate"
                                    onChange={(event) => {
                                        setFormData((state) => {
                                            return { ...state, endDate: event.target.value }
                                        })
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="info" type="submit" onClick={props.onHide}>
                        Select</Button>
                </Row>
            </Form>
        </div>
    )
}

export default SelectDate