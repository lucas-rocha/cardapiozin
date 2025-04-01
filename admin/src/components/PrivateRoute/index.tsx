import { APP_ROUTES } from "@/constants/app-routes"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useEffect } from "react"

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps ) => {
  const { push } = useRouter()
  const { isAuthenticated, loading } = useContext(AuthContext)

  console.log("Usuário autenticado?", isAuthenticated)

  useEffect(() => {
    if(!loading && !isAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [isAuthenticated, push, loading])

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  )
}

export default PrivateRoute