import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { Router } from 'next/router'

const Layout = ({children}) => {
    
    const handleClick = () => {
        const cookies = new Cookies()
        cookies.remove('tokenv6', {
            path: '/'
        })

        Router.push('/user/login')
    }

    return (
        <React.Fragment>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand>
                    <h3 className="mx-5">LyBook</h3>
                </Navbar.Brand>
                <Nav className="p-3">
                    <Link href="/user/dashboard">
                        <a className="">Dashboard</a>
                    </Link>
                    <Link href="/user/newItem">
                        <a className="ml-5">New Item</a>
                    </Link>
                    <Link href="/user/register">
                        <a className="ml-5">Register</a>
                    </Link>
                    <Link href="/user/login">
                        <a className="ml-5">Login</a>
                    </Link>
                    <Link href="/user/login">
                        <a onClick={handleClick}className="ml-5">Logout</a>
                    </Link>
                </Nav>
            </Navbar>        
            {children}
        </React.Fragment>
    )
}

export default Layout