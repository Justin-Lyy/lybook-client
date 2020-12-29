import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

const Layout = ({children}) => {

    return (
        <React.Fragment>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand>
                    <h3 className="mx-4">LyBook</h3>
                </Navbar.Brand>
                <Nav className="p-3">
                    <Link href="/user/dashboard">
                        <a className="">Dashboard</a>
                    </Link>
                    <Link href="/item/newItem">
                        <a className="ml-5">New Item</a>
                    </Link>
                    <Link href="/user/login">
                        <a className="ml-5">Login</a>
                    </Link>
                    <Link href="/user/register">
                        <a className="ml-5">Register</a>
                    </Link>
                </Nav>
            </Navbar>        
            {children}
        </React.Fragment>
    )
}

export default Layout