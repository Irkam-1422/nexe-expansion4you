import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token,setToken] = useState(null) 
    const [userId,setId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setId(id)

        localStorage.setItem(storageName, JSON.stringify({jwtToken, id}))
    },[])

    const logout = useCallback(() => {
        setToken(null)
        setId(null)

        localStorage.removeItem(storageName)
    },[])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) login(data.token, data.userId)
    },[login])

    return {login,logout,token,userId}
}