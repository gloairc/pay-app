import {
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";


const LoginSignup = (props) => {

    return (
        <div id="login-signup-cont" class="container-fluid">
            <div class="form-h1">
                <h1>{props.header}</h1>
            </div>

            <div id="login-form-cont" class="container-fluid">
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>
                            <span class="fw-bold">Username</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                value={props.formData.username}
                                onChange={(event) => {
                                    // console.log(event.target)
                                    props.setFormData((state) => {
                                        return { ...state, username: event.target.value };
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>
                            <span class="fw-bold">Password</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="Password"
                                placeholder="password"
                                value={props.formData.password}
                                onChange={(event) => {
                                    props.setFormData((state) => {
                                        return { ...state, password: event.target.value };
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <br />
                    <Row>
                        <Button variant="primary" type="submit" block>
                            {props.button}
                        </Button>
                    </Row>

                    <br />
                    <Row>
                        {props.message()}
                    </Row>
                </Form>
            </div>

            <div id="login-signup" class="container-fluid">
                <Row>
                    Don't have an account?
                <Button variant="secondary" block>
                        {props.oppHeader}
                    </Button>
                </Row>
            </div>
        </div>
    )
}

export default LoginSignup