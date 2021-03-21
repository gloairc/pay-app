import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AccountBalanceWalletTwoTone, ExitToApp } from "@material-ui/icons";
import "../App.css";

const Navybar = (props) => {
    const loggedIn = props.user.userId === undefined ? false : true;

    return (
        <Navbar
            bg="light"
            variant="light"
            fixed="top"
            style={{ position: "sticky", fontWeight: "bold" }}
            className="px-2"
        >
            <Navbar.Brand as={Link} to="/">
                <AccountBalanceWalletTwoTone />{" "}
          PayApp
        </Navbar.Brand>

            <Nav className="mr-auto" id="navBar-left">
                {loggedIn ? (
                    <Nav.Link as={Link} to="/landing">
                        Home
                    </Nav.Link>
                ) : (<></>)}
            </Nav>

            {loggedIn ? (
                <Nav className="ml-auto" id="navBar-right">

                    <Nav.Link as={Link} to="/logout">
                        Logout{" "}
                        <span class="align-middle">
                            <ExitToApp />
                        </span>
                    </Nav.Link>
                </Nav>
            ) : (<></>)}
        </Navbar>
    )
}

export default Navybar