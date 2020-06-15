import React from 'react';
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
        <Nav.Item>
            <NavLink className="nav-link" to="/">Home</NavLink>
        </Nav.Item>
        <Nav.Item>
            <NavLink className="nav-link" to="/practice">Vocab Practice</NavLink>
        </Nav.Item>
        {/* <Nav.Item>
            <NavLink className="nav-link" to="/practice">Verb Conjugation Practice</NavLink>
        </Nav.Item> */}
        <Nav.Item>
            <NavLink className="nav-link" to="/list">List</NavLink>
        </Nav.Item>
        </Nav>
    )
}

export default Navbar;