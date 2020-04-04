import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, Container } from "react-bootstrap";

const PROP_TYPES = {
  title: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  onNavItemClick: PropTypes.func,
};

const DEFAULT_PROPS = {
  title: "",
  navItems: [],
  onNavItemClick: () => {},
};

export default function Header({ title, navItems, onNavItemClick }) {
  return (
    <Navbar
      className="justify-content-between"
      bg="primary"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                onSelect={() => onNavItemClick(item.path)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = PROP_TYPES;
Header.defaultProps = DEFAULT_PROPS;
