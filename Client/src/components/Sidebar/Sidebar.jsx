import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Business,
  ChevronLeft,
  People,
  PersonAddAlt,
  Dashboard,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } ${variant === "v2"
            ? "border-r border-gray-200 dark:border-white"
            : "rounded-r-2xl shadow-lg"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-white font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Seçenekler
              </span>
            </h3>
            <ul className="mt-3">
              {/* Root */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("dashboard") && "bg-blue-600"
                  }`}
              >
                <NavLink
                  end
                  to="/dashboard"
                  className={`block text-white truncate transition duration-150 ${pathname.endsWith("dashboard")
                    ? ""
                    : "hover:text-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <Dashboard
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("dashboard")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Anasayfa
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Profile */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/profile") && "bg-blue-600"
                  }`}
              >
                <NavLink
                  end
                  to="/dashboard/profile"
                  className={`block text-white truncate transition duration-150 ${pathname.endsWith("/profile")
                    ? ""
                    : "hover:text-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <Home
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("/profile")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Profil
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Employees */}
              {user.role !== "Admin" ? (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/employees") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/employees"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/employees")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grow flex items-center">
                        <People
                          className={`shrink-0 w-5 h-5 ${pathname.endsWith("/employees")
                            ? "text-yellow-300"
                            : "text-white"
                            }`}
                        />
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Personeller
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ) : null}

              {/* Create User */}
              {user.role !== "CompanyUser" ? (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/createuser") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/createuser"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/createuser")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grow flex items-center">
                        <PersonAddAlt
                          className={`shrink-0 w-5 h-5 ${pathname.endsWith("/createuser")
                            ? "text-yellow-300"
                            : "text-white"
                            }`}
                        />
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Kullanıcısı Oluştur
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ) : null}

              {/* Register Company */}
              {user.role === "Admin" ? (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/registercompany") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/registercompany"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/registercompany")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grow flex items-center">
                        <Business
                          className={`shrink-0 w-5 h-5 ${pathname.endsWith("/registercompany")
                            ? "text-yellow-300"
                            : "text-white"
                            }`}
                        />
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Şirket Kayıt Et
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ) : null}

              {/* Create Employee */}
              {user.role === "CompanyManager" ? (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/createemployee") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/createemployee"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/createemployee")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <PersonAddAlt
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("/createemployee")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Personel Ekle
                      </span>
                    </div>
                  </NavLink>
                </li>
              ) : null}

              {/* Create Department */}
              {user.role === "CompanyManager" ? (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/createdepartment") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/createdepartment"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/createdepartment")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <Business
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("/createdepartment")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Departman Ekle
                      </span>
                    </div>
                  </NavLink>
                </li>
              ) : null}

              {/* Create Job */}
              {user.role === "CompanyManager" ? (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/createjob") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/createjob"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/createjob")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <Business
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("/createjob")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Meslek Ekle
                      </span>
                    </div>
                  </NavLink>
                </li>
              ) : null}

              {/* Assign User */}
              {(user.role === "CompanyManager" ||
                user.role === "CompanyOwner") && (
                  <li
                    className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/userempassign") && "bg-blue-600"
                      }`}
                  >
                    <NavLink
                      end
                      to="/dashboard/userempassign"
                      className={`block text-white truncate transition duration-150 ${pathname.endsWith("/userempassign")
                        ? ""
                        : "hover:text-gray-200"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <People
                          className={`shrink-0 w-5 h-5 ${pathname.endsWith("/userempassign")
                            ? "text-yellow-300"
                            : "text-white"
                            }`}
                        />
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Kullanıcıya Personel Ata
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}

              {/* Create Leave Request */}
              {user.role === "CompanyUser" && (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/createleaverequest") && "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/createleaverequest"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/createleaverequest")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <Business
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("/createleaverequest")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        İzin Talebi Oluştur
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}

              {/* Manage Leave Requests */}
              {user.role === "CompanyManager" && (
                <li
                  className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/manageleaverequests") &&
                    "bg-blue-600"
                    }`}
                >
                  <NavLink
                    end
                    to="/dashboard/manageleaverequests"
                    className={`block text-white truncate transition duration-150 ${pathname.endsWith("/manageleaverequests")
                      ? ""
                      : "hover:text-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <Business
                        className={`shrink-0 w-5 h-5 ${pathname.endsWith("/manageleaverequests")
                          ? "text-yellow-300"
                          : "text-white"
                          }`}
                      />
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        İzin Taleplerini Yönet
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}

              {/* Create Event */}
              {(user.role === "CompanyManager" ||
                user.role === "CompanyOwner") && (
                  <li
                    className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-opacity-30 hover:bg-opacity-40 ${pathname.endsWith("/createevent") && "bg-blue-600"
                      }`}
                  >
                    <NavLink
                      end
                      to="/dashboard/createevent"
                      className={`block text-white truncate transition duration-150 ${pathname.endsWith("/createevent")
                        ? ""
                        : "hover:text-gray-200"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <Business
                          className={`shrink-0 w-5 h-5 ${pathname.endsWith("/createevent")
                            ? "text-yellow-300"
                            : "text-white"
                            }`}
                        />
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Etkinlik Oluştur
                        </span>
                      </div>
                    </NavLink>
                  </li>
                )}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-white hover:text-gray-200"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <ChevronLeft className="shrink-0 w-5 h-5 sidebar-expanded:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
