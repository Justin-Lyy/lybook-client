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
            { pageProps.valid ? pageProps.items.map( item => {
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
            }): ''}
            
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