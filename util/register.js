const serverLink = 'http://localhost:8888'

// ={'email': 'justin@gmail.com', 'password': 'testing'}

const register = async (data) => {
    console.log(data)

    var options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    }

    console.log(data)

    try {
        const res = await fetch(`${serverLink}/auth/signup`, options)
        const jsonres = await res.json()

        if (res.ok) {
            return {...jsonres, ok: true}
        }
        
        throw 'registration failed'
    } catch(error) {
        console.log(error)
        return {ok: false}
    }
}

export default register