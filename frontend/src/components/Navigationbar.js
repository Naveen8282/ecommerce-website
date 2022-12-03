import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { Store } from "../Store";

function Navigationbar() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="lg" variant="light">
      <Container>
      <LinkContainer to="/">
            <Navbar.Brand>Cognizant</Navbar.Brand>
          </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
         
          <Nav className="me-auto">
            <Link to="/electronics" className="nav-link">
              Electronics
            </Link>
            <Link to="/outfits" className="nav-link">
              Outfits
            </Link>
            {/* <Link to="/sports" className="nav-link">
              Sports
            </Link> */}
          </Nav>
          <Nav>
            <Link to="/cart" className="nav-link">
              <AiOutlineShoppingCart size={25} />
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Navigationbar;
