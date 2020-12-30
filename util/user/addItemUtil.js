const serverLink = 'http://localhost:8888'

// ={'email': 'justin@gmail.com', 'password': 'testing'}

const addItem = async (itemid, token) => {
    const data = {itemid}

    const options = {
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
        const res = await fetch(`${serverLink}/user/addItem`, options)
        
        if (res.ok) {
            return {res, ok: true}
        }
        
        // throw 'Failed to add item'
    } catch(error) {
        return {ok: false}
    }
}

export default addItem