import React from 'react'
import login from '../../util/login'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import validateEmail from '../../util/emailRegex'

const cookies = new Cookies()

const add30 = () => {
    const current = new Date()
    return new Date(current.getTime() + 60*60000)
}

const Login = ()=> {
    const [userLogin, setLogin] = React.useState({})
    const router = useRouter()

    const changeHandler = (event) => {
        const {name, value} = event.target
        setLogin( prevLogin => {
            return {
                ...prevLogin,
                [name]: value
            }
        })
    }

    const clickHandler = async (event)=> {
        event.preventDefault()

        if (validateEmail(userLogin.email) === false) {
            console.log('invalid email')
            return
        } 

        const data = {
            email: userLogin.email,
            password: userLogin.password
        }

        const res = await login(data)
        if (res.ok === true) {
            console.log(res)

            const expdate = add30()

            await cookies.set('tokenv6', res.token, {
                path: '/',
                expires: expdate
            })

            router.push('./dashboard')
        }        
    }

    return (
        <div>
            <h1>Login form</h1>
            <form>
                <div>
                    <label htmlFor="email">Enter your email</label>
                    <input type="email" placeholder="your email" onChange={changeHandler} name="email" required={true}></input>
                </div>
                <div>
                    <label htmlFor="password">Enter your password</label>
                    <input type="password" onChange={changeHandler} name="password" required={true}></input>
                </div>
                <button onClick={clickHandler}>submit</button>
            </form>
            <p>{userLogin.email}</p>
        </div>
    )
}

export default Login