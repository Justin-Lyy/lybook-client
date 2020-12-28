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
    
    // options = JSON.stringify(options)

    const res = await fetch(`${serverLink}/auth/ping`, options)

    // console.log(token)

    return res.ok
}

export default validate