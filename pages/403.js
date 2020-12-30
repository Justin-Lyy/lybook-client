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
            <h1>403</h1>
          </Row>
          <Row>
            <h5>403 Error, you were not authorized to view that page</h5>
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