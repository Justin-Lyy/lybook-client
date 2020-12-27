import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import validate from '../../util/validate'

const Item = (pageProps) => {
    const router = useRouter()

    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('../user/login')

    },[])

    return (
        <>
            <h1>{pageProps.name}</h1>
            <p>Price: {pageProps.price}</p>
            <p>Info: {pageProps.extra_info}</p>
            <a href={pageProps.amazon_link}>Amazon link</a>
            <p>item stuff</p>
            <Link href={'../user/dashboard'}>
                <a>Back to dashboard</a>
            </Link>
        </>
    )
} 

export async function getServerSideProps(context) {
    let item_id = context.params

    console.log(item_id)

    const data = {
        name: 'test',
        price: 100000,
        extra_info: 'no more info',
        amazon_link: '#'
    }

    try {
        const res = await validate(context.req.cookies.tokenv6)

        return {
            props: {...data, valid: res}
        }
    } catch (error) {
        console.error(error)
        return {
            props: {valid: false}
        }
    }
 
}

export default Item