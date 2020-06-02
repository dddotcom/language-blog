import React from 'react';
import { Nav } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

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
            <NavLink className="nav-link" to="/practice">Practice</NavLink>
        </Nav.Item>
        {/* <Nav.Item>
            <NavLink className="nav-link" to="/list">List</NavLink>
        </Nav.Item> */}
        </Nav>
    )
}

export default Navbar;