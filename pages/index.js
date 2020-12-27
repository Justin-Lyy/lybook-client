
import Link from 'next/link'
import React from 'react'
import login from '../util/login'
import Cookies from 'universal-cookie'

const data = {'email': 'justin@gmail.com', 'password': 'testing'}
const cookies = new Cookies()

const add30 = () => {
  const current = new Date()
  return new Date (current.getTime() + 30*60000)
} 

const Home = (pageProps) => {

  return (
    <React.Fragment>
      <div>Home page</div>
      <p>login to get started</p>
      <div>
        <Link href={'/user/login'}>
          <a>login</a>
        </Link>
      </div>
      <div>
        <Link href={'/user/login'}>
          <a>register</a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Home