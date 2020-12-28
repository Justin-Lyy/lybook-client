import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import validate from '../../util/validate'
import getItem from '../../util/item/getItemUtil'

const Item = (pageProps) => {
    const router = useRouter()

    const handleClick = (event) => {
        console.log('deleting')
    }

    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('../user/login')
        console.log(pageProps)
    },[])

    return (
        <>
            <p>item stuff</p>
            <Link href={'../user/dashboard'}>
                <a>Back to dashboard</a>
            </Link>
            <form>
                <buton onClick={handleClick}>Remove Item</buton>
            </form>
        </>
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