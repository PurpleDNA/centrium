import { useNavigate } from "react-router-dom"
import { useAuth } from "./Auth/AuthContext"
import { FC, ReactNode, useEffect } from "react"

interface Props {
    children: ReactNode
}

const ProtectedRoutes: FC<Props> = ({children}) => {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        if (!isAuthenticated) {
            navigate('/walletconnect' , {replace: true})
        }
    }, [navigate, isAuthenticated])

  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoutes