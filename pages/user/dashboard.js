import { useRouter } from 'next/router'
import validate from '../../util/validate'
import React from 'react'
import Link from 'next/link'

const Dashboard = (pageProps) => {
    const router = useRouter()


    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('./login')
        
        console.log(pageProps.items)
    },[])

    return (
        <>
            <div>this page requires authentication</div>
            { pageProps.items.map( item => {
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
            }) }
            
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
        
        const items = [
            {
                name: 'keyboard',
                price: '100',
                amazon_id: '123',
                id: "1"
            },
            {
                name: 'mouse',
                price: '50',
                amazon_id: '123',
                id: "2"
            },
            {
                name: 'mouse pad',
                price: '20',
                amazon_id: '123',
                id: "3"
            }
        ]

        return {
            props: {items: items, valid: res},
        }

    } catch (error) {
        console.error(error)
    }
    
}

export default Dashboard