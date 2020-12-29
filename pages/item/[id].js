import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import validate from '../../util/validate'
import getItem from '../../util/item/getItemUtil'
import removeItem from '../../util/item/removeItemUtil'
import Cookies from 'universal-cookie'
import Layout from '../../components/layout'
import styles from '../../styles/styles.module.css'
import { Container } from 'react-bootstrap'

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
        console.log(pageProps)
    },[])

    return (
        <Layout>
            <Container className={styles.vcenter}>
                <p>item stuff</p>
                <Link href={'../user/dashboard'}>
                    <a>Back to dashboard</a>
                </Link>
                <form>
                    <buton onClick={handleClick}>Remove Item</buton>
                </form>
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