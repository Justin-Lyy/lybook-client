const serverLink = 'http://localhost:8888'

// ={'email': 'justin@gmail.com', 'password': 'testing'}

const login = async (data) => {
    var options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    }
  
    console.log(data)

    try {
        const res = await fetch(`${serverLink}/auth/login`, options)
        const jsonres = await res.json()
        
        if (res.ok) {
            return {...jsonres, ok: true}
        }
        
        throw 'Login failed'
    } catch(error) {
        console.log(error)
        return {ok: false}
    }
}

export default login