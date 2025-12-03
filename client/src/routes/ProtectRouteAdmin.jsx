
import { useEffect, useState } from "react"
import LoadingToRedirect from "./LoadingToRedirect"
import useStore from "@/store/store"
import { currentAdmin } from "@/api/auth"
import LoadingToAdmin from "./LoadingToAdmin"

const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useStore((state)=> state.user)
    const token = useStore((state)=> state.token)
    
    useEffect(()=>{
        if(user && token){
            // send to back
            currentAdmin(token)
            .then((res)=>setOk(true))
            .catch((res)=>setOk(false))
        }
    },[]) // [] กันลูปอินฟินิตี้

    return ok ? element: <LoadingToAdmin />

  return (
    element
  )
}
export default ProtectRouteAdmin