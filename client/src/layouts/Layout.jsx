import MainNav from "@/components/navbar/MainNav"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <MainNav />

        <main className="h-full px-4 mt-2">
            <Outlet />
        </main>
    </div>
  )
}
export default Layout