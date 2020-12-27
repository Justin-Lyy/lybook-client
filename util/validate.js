const serverLink = 'http://localhost:8888'

const validate = async (token)=> {
    var options = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
        },
    }

    console.log(token)
    console.log("validated!")

    return 'failed'
}

export default validate