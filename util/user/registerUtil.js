const serverLink = 'http://localhost:8888'

// ={'email': 'justin@gmail.com', 'password': 'testing'}

const register = async (data) => {

    var options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    }

    try {
        const res = await fetch(`${serverLink}/auth/signup`, options)
        const jsonres = await res.json()

        if (res.ok) {
            return {...jsonres, ok: true}
        }
        
        throw 'registration failed'
    } catch(error) {
        return {ok: false}
    }
}

export default register