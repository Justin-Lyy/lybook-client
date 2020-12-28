import { useRouter } from 'next/router'
import validate from '../../util/validate'
import React from 'react'
import Link from 'next/link'
import getDashboard from '../../util/user/dashboardUtil'

const Dashboard = (pageProps) => {
    const router = useRouter()


    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('./login')
        
        console.log(pageProps.items)
    },[])

    return (
        <>
            <div>this page requires authentication</div>
            {/* { pageProps.items.map( item => {
                return (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <p>price: {item.price}</p>
                        <p>amazon id: {item.amazon_id}</p>
                        <Link href={`../item/${item.id}`}>
                            <a>more info</a>
                        </Link>
                    </div>
                )
            }) } */}
            
            <hr/>

            <Link href="../item/newItem">
                <a>add a new item</a>
            </Link>
        </>
    )
}


export async function getServerSideProps(context) {
    try {   
        const res = await validate(context.req.cookies.tokenv6)
        
        if (!res) throw 'User not authenticated'

        const items = await getDashboard(context.req.cookies.tokenv6)

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