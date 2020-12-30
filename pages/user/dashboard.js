import { useRouter } from 'next/router'
import validate from '../../util/validate'
import React from 'react'
import Link from 'next/link'
import getDashboard from '../../util/user/dashboardUtil'
import Layout from '../../components/layout'
import {Container} from 'react-bootstrap'
import styles from '../../styles/styles.module.css'

const Dashboard = (pageProps) => {

    return (
        <Layout>
            { pageProps.valid ? 
                <Container className={styles.dashboard}>
                    <h2>Dashboard</h2>
                    <hr className="w-75"/>
                    { (pageProps.items.length !== 0) ? pageProps.items.map( item => {
                        return (
                            <div key={item._id} className="w-75 text-left">
                                <h4>{item.name}</h4>
                                <Link href={`/item/${item._id}`}>
                                    <a className="d-block mb-2">More Info</a>
                                </Link>
                                <p className="d-inline">Price: {item.status === 'Price updated' ? item.price: "No price availabe"}</p>
                                <p className="d-inline mx-4">Amazon ID (ASIN): {item.ASIN}</p>
                                <p className="d-inline mx-2">Last updated: {item.date.length !== 0 ? item.date[item.date.length-1] : "Never"}</p>
                                <a className="d-inline mx-2" href={item.link}>Amazon Link</a>
                                <hr className="w-100"/>
                            </div>
                        )
                    }): <>
                        <p className="mt-3">You aren't tracking any items at the moment</p>
                        <hr className="w-75"/>
                        </>}
                    
                    <Link href="../user/newItem">
                        <a className="p-2 bg-primary text-light rounded w-25 text-center my-3">Add a New Item</a>
                    </Link>
                </Container>
            : ''}
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