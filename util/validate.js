const serverLink = 'http://localhost:8888'

const validate = async (token)=> {
    var options = {
        method: 'get',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
    }

    // options = JSON.stringify(options)

    var res = await fetch(`${serverLink}/auth/ping`, options)

    console.log(token)
    // console.log(res)

    if (res.ok === true) {
      return false
    }

    return false
}

export default validate