
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

  const clickHandler = async (event)=> {
    const res = await login()
    console.log(res.token)

    var expdate = add30()

    cookies.set('tokenv5', res.token, {
      path: '/',
      expires: expdate
    })

    console.log(cookies)
  }
  return (
    <>
      <div>Home page</div>
      <p>login to get started</p>
      <Link href={'/user/dashboard'}>
        <a>login</a>
      </Link>
    </>
  )
}

export default Home