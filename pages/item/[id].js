import React from 'react'
import { useRouter } from 'next/router'
import validate from '../../util/validate'
import getItem from '../../util/item/getItemUtil'
import removeItem from '../../util/item/removeItemUtil'
import Cookies from 'universal-cookie'
import Layout from '../../components/layout'
import styles from '../../styles/styles.module.css'
import { Container } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'
// import Datetime from 'luxon/src/datetime.js'

const cookies = new Cookies()

const Item = (pageProps) => {
    const router = useRouter()

    const handleClick = async (event) => {
        event.preventDefault()

        try {   
            const res = await validate(cookies.get('tokenv6'))
            console.log('Validated')

            if (!res) router.push('./login')

            const res2 = await removeItem(pageProps.item._id, cookies.get('tokenv6')) 
            if (!res2.ok) throw "Error removing the item you specified" 
                
            

        } catch (error) {
            console.error(error)
        }    
    }

    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('../user/login')
        pageProps.item.date = pageProps.item.date.map( d => new Date(d).toLocaleString())
    },[])

    return (
        <Layout>
            <Container className={styles.vcenter}>
                <div className="pt-4 w-100">
                    <h2 className="mt-4">{pageProps.item.name}</h2>
                    <hr/>
                    <p className={`p-2 bg-${pageProps.item.status === 'Price updated' ? 'success': 'danger'} rounded text-light text-center`}>Status: {pageProps.item.status}</p>
                    <h5 className="d-inline">Last Updated: {pageProps.item.date.length !== 0 ? pageProps.item.date[pageProps.item.date.length-1] : "Never"}</h5>
                    <h5 className="d-inline mx-4">Last Price: {pageProps.item.price.length !== 0 ? "$" + pageProps.item.price[pageProps.item.price.length-1] : "None Listed"}</h5>
                    <div className="mt-4">
                        <Line
                            data= {{
                                labels: pageProps.item.date.map( d => new Date(d).toLocaleString()),
                                datasets: [
                                    {
                                        data: pageProps.item.price,
                                        fill: true,  
                                        borderColor:'rgb(2, 117, 216)',
                                        backgroundColor: 'rgba(2, 117, 216, 0.5)',
                                        label: 'Price'
                                    },
                                ]
                            }}
                        />
                    </div>
                    <form className="mt-4">
                        <button className={`${styles.submitbtn} mb-4 btn btn-danger w-25`} onClick={handleClick}>Remove Item</button>
                    </form>
                </div>
            </Container>
        </Layout>
    )
} 

export async function getServerSideProps(context) {
    let item_id = context.params.id

    try {
        const res = await validate(context.req.cookies.tokenv6)

        if (!res) throw 'User not authenticated'

        const res2 = await getItem(item_id, context.req.cookies.tokenv6)

        if (!res2.ok)

        return {
            props: {item: res2, valid: res}
        }
    } catch (error) {
        console.error(error)
        return {
            props: {valid: false}
        }
    }
 
}

export default Item