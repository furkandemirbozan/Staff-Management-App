import React, { useEffect } from "react";

function ProfileWidget({ employeeData }) {
  useEffect(() => {
    console.log("employeeData", employeeData);
    return () => { };
  }, [employeeData]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 shadow-lg rounded-xl p-5">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-white">Profilim</h2>
      </header>

      <div className="flex flex-col grow justify-center gap-2">
        <div className="flex flex-col grow items-center px-5 py-4 pb-2">
          <div className="flex items-center gap-4 leading-3">
            <div className="flex flex-col max-w-48 text-white">
              <h1 className="font-semibold text-3xl h-fit line-clamp-3">
                {employeeData.employeeFirstName} {employeeData.employeeLastName}
              </h1>
              <h1 className="text-base h-fit">
                {employeeData.departmentName}
              </h1>
              <h1 className="text-sm font-light h-fit">
                {employeeData.jobTitle}
              </h1>
            </div>

          </div>
        </div>

        {employeeData.managerName && (
          <div className="flex justify-between items-end px-5 py-2">
            <h1 className="font-semibold text-xl line-clamp-1 text-white mr-2">
              Yöneticim:
            </h1>
            <h1 className="text-base line-clamp-1 text-white">
              {employeeData.managerName}
            </h1>
          </div>
        )}

        <div className="flex justify-between items-end px-5 pb-2 mb-2">
          <h1 className="font-semibold text-xl line-clamp-1 text-white mr-2">
            İşe Giriş Tarihim:
          </h1>
          <h1 className="text-base line-clamp-1 text-white">
            {employeeData.hireDate &&
              employeeData.hireDate.split("T")[0].replaceAll("-", "/")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileWidget;
