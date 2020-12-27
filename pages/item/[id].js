import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Item = (pageProps) => {

    React.useEffect(async ()=>{
        console.log(cookies.getAll())
        // console.log(pageProps)
    },[])

    return (
        <>
            <p>item stuff</p>
        </>
    )
} 

export async function getServerSideProps({ params }, context) {
    console.log(params)
    console.log(context)

    return {
        props: {}
    }
}

export default Item