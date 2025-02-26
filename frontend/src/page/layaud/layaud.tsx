import { Outlet } from "react-router-dom"
import SideBar from "../../components/sideBar/sideBar"

const Layaud = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
        <aside className="fixed top-0 left-0 w-[250px] h-full">
            <SideBar/>
        </aside>
        <main className="mt-24 h-[calc(100vh-6rem)] overflow-y-auto p-8">
            <Outlet/>
        </main>
    </div>
  )
}

export default Layaud