import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import Layout from '../components/layout' 
import styles from '../styles/styles.module.css'
import Link from 'next/link'

const Home = (pageProps) => {

  return (
    <>
      <Layout>
        <Container className={styles.vcenter}>
          <Row>
            <h1>Welcome!</h1>
          </Row>
          <Row>
            <h5>LyBook is a web app designed to help you track items being sold on Amazon!</h5>
          </Row>
          <Row>
            <p>
              <Link href="/user/login">
                <a>Login </a>
              </Link>
              or
              <Link href="/user/register">
                <a> Register </a>
              </Link>
              to get started
            </p>
            
          </Row>
        </Container>
      </Layout>
    </>

  )
}

export default Home