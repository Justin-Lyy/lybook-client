import React from 'react'
import { useRouter } from 'next/router'
import validate from '../../util/validate'
import newItem from '../../util/item/newItemUtil'
import addItem from '../../util/user/addItemUtil'
import Cookies from 'universal-cookie'
import Layout from '../../components/layout'
import { Container } from 'react-bootstrap'
import styles from '../../styles/styles.module.css'

const cookies = new Cookies()

const NewItem = (pageProps)=> {
    const router = useRouter()
    const [info, setInfo] = React.useState({})
    const [formVal, setFormVal] = React.useState()

    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('./login')
        
        console.log('authenticated')
    },[])

    const changeHandler = (event, autoValue) => {

        const {name, value} = event.target

        if (value === undefined) value = autoValue

        setInfo( prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    const clickHandler = async (event) => {
        event.preventDefault()

        const reg = /[^A-Za-z0-9 ]/;

        if (info.name === undefined || info.name.length < 1) {
            setFormVal('Please set an appropriate item name')
            return 
        }

        if (info.asin === undefined || reg.test(info.asin) || info.asin.length !== 10) {
            setFormVal('Invalid ASIN Number')
            return 
        }

        if (info.link === undefined || info.link.length < 4) {
            setFormVal('Invalid Link')
            return 
        }

        try {   
            const res = await validate(cookies.get('tokenv6'))
            console.log('Validated')

            if (!res) router.push('./login')

            const data = {
                name: info.name,
                asin: info.asin,
                link: info.link
            }

            const res2 = await newItem(data, cookies.get('tokenv6')) 
            if (!res2.ok) throw "Error creating the item you wanted"

            const res3 = await addItem(res2.item._id, cookies.get('tokenv6')) 
            if (!res3.ok) throw "Error adding the item you wanted"
                
            router.push(`/item/${res2.item._id}`)

        } catch (error) {
            console.error(error)
            setFormVal('There was a problem adding your item, please check your inputs')
        }    
    }

    return (
        <Layout>
            { pageProps.valid ? <Container className={styles.vcenter}>
                <div className="p-4">
                    <h2 className="w-100 text-center">Start Tracking a New Item</h2>
                    <hr/>
                    <form className={styles.formstyles}>
                        <label>Enter the Item Name</label>
                        <div className="input-group mb-4"> 
                            <input name="name" type="text" 
                                    onChange={changeHandler} required
                                    className="form-control"></input>
                        </div>
                        <label>Enter the Item's ASIN</label>
                        <div className="input-group mb-4">
                            <input name="asin" type="text" 
                                    onChange={changeHandler} required
                                    className="form-control"></input>
                        </div>
                        <label>Enter the link for your item</label>
                        <div className="mb-4">
                            <input name="link" type="text" 
                                    onChange={changeHandler} required
                                    className="form-control"></input>
                        </div>
                        <button type="button" className={`${styles.submitbtn} mb-4 btn btn-primary w-100`} 
                                onClick={clickHandler}
                        >Start Tracking!</button>
                        <p className="text-danger w-100 text-center">{formVal}</p>
                    </form>
                </div>
            </Container> : ''}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    try {   
        const res = await validate(context.req.cookies.tokenv6)

        return {
            props: {valid: true},
        }
    } catch (error) {
        console.error(error)

        return {
            props: {valid: false},
        }
    }
}

export default NewItem