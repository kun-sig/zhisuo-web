import { Outlet } from "react-router";
import Navigation from "./navigation";
import Header2 from "../../components/header2";

export default function Admin() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-[64px] flex-shrink-0">
        <Header2 />
      </div>
      <div className="flex flex-grow flex-row min-h-0">
        <div>
          <Navigation />
        </div>
        <div className="h-full w-[1px] bg-gray-50 inset-shadow-sm"></div>
        <div className="h-full w-full overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>

  )
}
