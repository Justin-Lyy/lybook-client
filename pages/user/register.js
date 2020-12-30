import React from 'react'
import validateEmail from '../../util/emailRegex'
import register from '../../util/user/registerUtil'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import {Container } from 'react-bootstrap'
import styles from '../../styles/styles.module.css'
import validate from '../../util/validate'

const Register = (pageProps)=> {
    const [userLogin, setLogin] = React.useState({})
    const [formVal, setFormVal] = React.useState()
    const router = useRouter()

    React.useEffect(async ()=>{
        console.log(pageProps)
        if (pageProps.valid === true) router.push('./dashboard')
        
        console.log('authenticated')
    },[])

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

        if (userLogin.password === undefined || userLogin.password === undefined) {
            setFormVal("Your password field(s) are empty")
            return
        }

        if (userLogin.password !== userLogin.confirm) {
            setFormVal("Your passwords don't match")
            return
        }

        if (userLogin.password.length < 4) {
            setFormVal("Your password should be at least 4 characters")
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
        <Layout>
            {pageProps.valid ? '':
                <Container className={styles.vcenter}>
                <h2 className="w-100 text-center">Register</h2>
                <form className={styles.formstyles}>
                    <hr/>
                    <label className="form-label mt-2" htmlFor="email">Enter your Email for Verification</label>
                    <div className="input-group mb-4">
                        <span className="input-group-text">user@email.com</span>
                        <input type="email" 
                                onChange={changeHandler} 
                                name="email" 
                                required={true}
                                className="form-control"
                        ></input>
                    </div>
                    <label className="form-label" htmlFor="password">Enter your Password</label>
                    <div className="input-group mb-4">
                        <input type="password" 
                                onChange={changeHandler} 
                                name="password" 
                                required={true}
                                className="form-control"
                        ></input>
                    </div>
                    <label className="form-label" htmlFor="confirm">Confirm your Password</label>
                    <div className="input-group mb-4">
                        <input type="password" 
                                onChange={changeHandler} 
                                name="confirm" 
                                required={true}
                                className="form-control"
                        ></input>
                    </div>
                    <button type="button" className={`${styles.submitbtn} mb-4 btn btn-primary w-100`} 
                            onClick={clickHandler}
                    >Login</button>
                    <p className="text-danger w-100 text-center">{formVal}</p>
                </form>
            </Container>
            }
        </Layout>
    )
}

export async function getServerSideProps(context) {
    try {   
        const res = await validate(context.req.cookies.tokenv6)

        return {
            props: {valid: res},
        }
    } catch (error) {
        console.error(error)

        return {
            props: {valid: false},
        }
    }
}

export default Register