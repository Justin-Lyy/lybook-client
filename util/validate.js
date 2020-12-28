const serverLink = 'http://localhost:8888'

const validate = async (token)=> {
    const options = {
        method: 'get',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token 
        },
    }

    const res = await fetch(`${serverLink}/auth/ping`, options)

    return res.ok
}

export default validate