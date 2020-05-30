import React from 'react';
import { Nav } from 'react-bootstrap'

const Navbar = () => {

    return (
        <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
        <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1">Tagalog</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Japanese</Nav.Link>
        </Nav.Item>
        </Nav>
    )
}

export default Navbar;