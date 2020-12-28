import React from 'react'
import { useRouter } from 'next/router'
import validate from '../../util/validate'
import newItem from '../../util/item/newItemUtil'
import addItem from '../../util/user/addItemUtil'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const NewItem = (pageProps)=> {
    const router = useRouter()
    const [info, setInfo] = React.useState({})

    React.useEffect(async ()=>{
        if (pageProps.valid === false) router.push('./login')
        
        console.log('authenticated')
    },[])

    const changeHandler = (event, autoValue) => {

        const {name, value} = event.target

        if (value === undefined) value = autoValue

        setInfo( prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    const clickHandler = async (event) => {
        event.preventDefault()

        try {   
            const res = await validate(cookies.get('tokenv6'))
            console.log('Validated')

            if (!res) router.push('./login')

            const data = {
                name: info.name,
                asin: info.asin,
                link: info.link
            }
    
            const res2 = await newItem(data, cookies.get('tokenv6')) 
            if (!res2.ok) throw "Error creating the item you wanted"

            const res3 = await addItem(res2.item._id, cookies.get('tokenv6')) 
                
            router.push(`/item/${res2.item._id}`)

        } catch (error) {
            console.error(error)
        }    
    }

    return (
        <>
            <div>register a new item here</div>
            <form method="post" action="#">
                <div>
                    <label>Enter the Item Name</label>
                    <input name="name" type="text" onChange={changeHandler} required></input>
                </div>
                <div>
                    <label>Enter the Item's ASIN</label>
                    <input name="asin" type="text" onChange={changeHandler} required></input>
                </div>
                <div>
                    <label>Enter the link for your item</label>
                    <input name="link" type="text" onChange={changeHandler} required></input>
                </div>
                <button onClick={clickHandler}>Submit</button>
            </form>

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

        return {
            props: {valid: false},
        }
    }
}

export default NewItem