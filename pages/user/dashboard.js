import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import validate from '../../util/validate'
import React from 'react'

const cookies = new Cookies()

const Dashboard = (pageProps) => {
    const router = useRouter()


    React.useEffect(async ()=>{
        console.log(cookies.getAll())
        console.log(pageProps)
    },[])

    return (
        <>
            <div>this page requires authentication</div>
        </>
    )
}


export async function getServerSideProps(context) {
    try {   
       const res = await validate(context.req.cookies.tokenv5)
    } catch (error) {
        console.error(error)
    }
    return {
        props: {tokenv5: context.req.cookies.tokenv5},
    }
}

export default Dashboard