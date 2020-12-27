const serverLink = 'http://localhost:8888'

const login = async (data={'email': 'justin@gmail.com', 'password': 'testing'}) => {
    var options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    }
  
    // console.log(data)
  
    try {
        const res = await fetch(`${serverLink}/auth/login`, options)
        const jsonres = await res.json()
        // console.log(jsonres)
        return jsonres
    } catch(error) {
        console.log(error)
    }
}

export default login