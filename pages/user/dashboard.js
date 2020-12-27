import { Router, useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import validate from '../../util/validate'
import React from 'react'

const cookies = new Cookies()

const Dashboard = (pageProps) => {
    const router = useRouter()


    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('./login')
        
    },[])

    return (
        <>
            <div>this page requires authentication</div>
        </>
    )
}


export async function getServerSideProps(context) {
    try {   
       const res = await validate(context.req.cookies.tokenv6)
        return {
            props: {valid: res},
        }
    } catch (error) {
        console.error(error)
    }
    
}

export default Dashboard