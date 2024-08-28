import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { getToken } from "../utils/Utils";

function ControlPanelStructure() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const selector = useSelector((state) => state.user);

  useEffect(() => {
    let token = getToken();
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-r from-green-600 to-blue-600">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 pt-4 md:pt-1 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center ">
              <div className="grid grid-cols-12 grid-rows-1 py-2 gap-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ControlPanelStructure;
