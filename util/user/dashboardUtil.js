const serverLink = 'http://localhost:8888'

// ={'email': 'justin@gmail.com', 'password': 'testing'}

const getDashboard = async (token) => {
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
        const res = await fetch(`${serverLink}/user/dashboard`, options)
        const jsonres = await res.json()

        if (res.ok) {
            return {...jsonres}
        }
        
        console.log(res)

        throw 'Failed to add item'
    } catch(error) {
        console.log(error)
        return undefined
    }
}   

export default getDashboard