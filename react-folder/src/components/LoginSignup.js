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
                <h1 className="text-center">{props.header}</h1>
            </div>

            <div id="login-form-cont" class="container-fluid">
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>
                            <span class="fw-bold">Username</span>
                        </Form.Label>
                        <Col>
                            {props.mobileText !== undefined ?
                                (<Form.Control
                                    type="text"
                                    placeholder={props.usernameText}
                                    value={props.formData.username}
                                    onChange={(event) => {
                                        // console.log(event.target)
                                        props.setFormData((state) => {
                                            return { ...state, username: event.target.value };
                                        });
                                    }}
                                    onBlur={(event) => props.handleBlurName(event)}
                                />) : (<Form.Control
                                    type="text"
                                    placeholder={props.usernameText}
                                    value={props.formData.username}
                                    onChange={(event) => {
                                        // console.log(event.target)
                                        props.setFormData((state) => {
                                            return { ...state, username: event.target.value };
                                        });
                                    }}
                                />)}
                        </Col>
                    </Form.Group>
                    {props.mobileText !== undefined ?
                        (<Form.Group controlId="mobile">
                            <Form.Label>
                                <span class="fw-bold">Mobile</span>
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    type="number"
                                    placeholder={props.mobileText}
                                    value={props.formData.mobile}
                                    onChange={(event) => {
                                        // console.log(event.target)
                                        props.setFormData((state) => {
                                            return { ...state, mobile: event.target.value };
                                        });
                                    }}
                                    onBlur={(event) => props.handleBlurMobile(event)}
                                />
                            </Col>
                        </Form.Group>) : (<></>)
                    }


                    <Form.Group controlId="password">
                        <Form.Label>
                            <span class="fw-bold">Password</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder={props.passwordText}
                                value={props.formData.password}
                                onChange={(event) => {
                                    // console.log(event.target.value)
                                    //figure out a way to only allow 6 digit number
                                    // if (event.target.value.match(/[0-9]*/)) {
                                    props.setFormData((state) => {
                                        return { ...state, password: event.target.value };
                                    }
                                    )
                                    // };
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
                    {props.wordsOnTopOfButton2}
                    <Button variant="secondary" block href={props.oppHeaderLink}>
                        {props.oppHeader}
                    </Button>
                </Row>
            </div>
        </div>
    )
}

export default LoginSignup