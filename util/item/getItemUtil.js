const serverLink = 'http://localhost:8888'

const getItem = async (itemid, token) => {
    const options = {
        method: 'get',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
    }

    try {
        const res = await fetch(`${serverLink}/items/${itemid}`, options)
        const jsonres = await res.json()

        // console.log(res)

        if (res.ok) {
            return {...jsonres}
        }
        
        // console.log(res)

        // throw 'Failed to add item'
    } catch(error) {
        console.log(error)
        return undefined
    }
}   

export default getItem