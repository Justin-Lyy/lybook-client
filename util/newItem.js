const serverLink = 'http://localhost:8888'

// ={'email': 'justin@gmail.com', 'password': 'testing'}

const addItem = async (data, token) => {
    const options = {
        method: 'post',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify(data)
    }

    console.log('this is the data')
    console.log(data)

    try {
        const res = await fetch(`${serverLink}/items/newItem`, options)
        const jsonres = await res.json()
        
        if (res.ok) {
            return {...jsonres, ok: true}
        }
        
        throw 'Failed to add item'
    } catch(error) {
        console.log(error)
        return {ok: false}
    }
}

export default addItem