import React from 'react'
import validateEmail from '../../util/emailRegex'
import register from '../../util/register'
import { useRouter } from 'next/router'

const Register = ()=> {
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

        if (userLogin.password !== userLogin.confirm) {
            console.log(`passwords don't match`)
            return
        }

        const data = {
            email: userLogin.email,
            password: userLogin.confirm
        }

        const res = await register(data)

        if (res.ok) {
            router.push('./login')
        }
    }

    return (
        <div>
            <h1>Login form</h1>
            <form>
                <div>
                    <label htmlFor="email">Enter your email</label>
                    <input type="email" placeholder="your email" onChange={changeHandler} name="email"></input>
                </div>
                <div>
                    <label htmlFor="password">Enter your password</label>
                    <input type="password" onChange={changeHandler} name="password"></input>
                </div>
                <div>
                    <label htmlFor="confirm">Confirm your password</label>
                    <input type="password" onChange={changeHandler} name="confirm"></input>
                </div>
                <button onClick={clickHandler}>submit</button>
            </form>
            <p>{userLogin.email}</p>
        </div>
    )
}

export default Register