import React from 'react'
import login from '../../util/user/loginUtil'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import validateEmail from '../../util/emailRegex'
import Layout from '../../components/layout'
import {Container } from 'react-bootstrap'
import styles from '../../styles/styles.module.css'

const cookies = new Cookies()

const add30 = () => {
    const current = new Date()
    return new Date(current.getTime() + 60*60000)
}

const Login = ()=> {
    const [userLogin, setLogin] = React.useState({})
    const [formVal, setFormVal] = React.useState()
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
            setFormVal('Invalid Email')
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

            setFormVal('')

            router.push('./dashboard')
        } else{
            setFormVal('Please check your credentials')
        }        
    }

    return (
        <Layout>
            <Container className={`${styles.vcenter}`}>
                <div className="p-4">
                    <h2 className="w-100 text-center">Login</h2>
                    <hr/>
                    <form className={styles.formstyles}>
                        <div className="input-group my-4">
                            <span className="input-group-text">user@email.com</span>
                            <input type="email" 
                                    onChange={changeHandler} 
                                    name="email" 
                                    required={true}
                                    className="form-control"
                            ></input>
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text">Password</span>
                            <input type="password" 
                                    onChange={changeHandler} 
                                    name="password" 
                                    required={true}
                                    className="form-control"
                            ></input>
                        </div>
                        <button type="button" className={`${styles.submitbtn} mb-4 btn btn-primary w-100`} 
                                onClick={clickHandler}
                        >Login</button>
                        <p className="text-danger w-100 text-center">{formVal}</p>
                    </form>
                </div>
            </Container>
        </Layout>
    )
}

export default Login