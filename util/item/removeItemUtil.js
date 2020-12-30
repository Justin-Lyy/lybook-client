const serverLink = 'http://localhost:8888'

const getItem = async (itemid, token) => {
    const data = {itemid: itemid}

    let options = {
        method: 'put',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify(data)
    }

    try {
        const res = await fetch(`${serverLink}/user/removeItem`, options)

        if (!res.ok) {
            throw 'Failed to remove item'
        }
        
        options.method = 'delete'
        const res2 = await fetch(`${serverLink}/items/deleteItem`, options)

        return {res2, res, ok: res.ok}
    } catch(error) {
        console.log(error)
        return undefined
    }
}   

export default getItem