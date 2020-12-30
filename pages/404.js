import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Layout from '../components/layout' 
import styles from '../styles/styles.module.css'

const Home = (pageProps) => {

  return (
    <>
      <Layout>
        <Container className={styles.vcenter}>
          <Row>
            <h1>404</h1>
          </Row>
          <Row>
            <h5>404 Error, couldn't find what you were looking for</h5>
          </Row>
        </Container>
        <footer className="fixed-bottom bg-dark p-3">
                <a className="text-primary" href="https://github.com/Justin-Lyy/">https://github.com/Justin-Lyy/</a>
        </footer>
      </Layout>
    </>

  )
}

export default Home