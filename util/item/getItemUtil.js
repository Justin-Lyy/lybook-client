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

        if (res.ok) {
            return {...jsonres, ok: res.ok, resCode: res.status}
        }

        throw res.status
        
    } catch(error) {
        return {ok: false, resCode: error}
    }
}   

export default getItem