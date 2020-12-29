import { useRouter } from 'next/router'
import validate from '../../util/validate'
import React from 'react'
import Link from 'next/link'
import getDashboard from '../../util/user/dashboardUtil'
import Layout from '../../components/layout'
import {Container} from 'react-bootstrap'
import styles from '../../styles/styles.module.css'

const Dashboard = (pageProps) => {
    const router = useRouter()


    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('./login')
        
        console.log(pageProps.items)
    },[])

    return (
        <Layout>
            <Container className={styles.vcenter}>
                <h2>Dashboard</h2>
                <hr className="w-100"/>
                { (pageProps.valid && pageProps.items.length !== 0) ? pageProps.items.map( item => {
                    return (
                        <div key={item._id}>
                            <h2>{item.name}</h2>
                            <p>price: {item.price}</p>
                            <p>amazon id: {item.ASIN}</p>
                            <Link href={`../item/${item._id}`}>
                                <a>more info</a>
                            </Link>
                        </div>
                    )
                }): <p className="mt-3">You aren't tracking any items at the moment</p>}
                
                <hr className="w-100"/>

                <Link href="/item/newItem">
                    <a className="p-2 bg-primary text-light rounded w-25 text-center mt-3">Add a New Item</a>
                </Link>
            </Container>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    try {   
        const res = await validate(context.req.cookies.tokenv6)
        
        if (!res) throw 'User not authenticated'

        const res2 = await getDashboard(context.req.cookies.tokenv6)

        const items = Object.keys(res2).map(key => res2[key])

        console.log(items)

        return {
            props: {items: items, valid: res},
        }

    } catch (error) {
        console.error(error)
        return {
            props: {valid: false},
        }
    }
    
}

export default Dashboard