import React from "react";

function ExpandedProfileWidget({ employeeCardData }) {
  return (
    <div className="flex flex-col col-span-full row-span-1 sm:col-span-12 xl:col-span-6 bg-gradient-to-r from-green-400 to-blue-600 dark:bg-black shadow-sm rounded-xl bg-no-repeat bg-top ">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-white dark:text-white">
          Profilim
        </h2>
      </header>

      <div className="flex flex-col grow justify-center gap-2">
        <div className="flex flex-col grow justify-between items-center px-5 py-4 pb-2">
          <div className="flex flex-row justify-between items-center gap-1 leading-3">
            <div className="flex flex-col max-w-48">
              <h1 className="font-semibold text-3xl h-fit line-clamp-3 text-white dark:text-white">
                {employeeCardData.employeeFirstName}{" "}
                {employeeCardData.employeeLastName}
              </h1>
              <h1 className="text-base h-fit text-white dark:text-white">
                {employeeCardData.departmentName}
              </h1>
              <h1 className="text-sm font-light h-fit text-white dark:text-white">
                {employeeCardData.jobTitle}
              </h1>
            </div>

          </div>
        </div>

        {employeeCardData.managerName != null ? (
          <div className="flex justify-between items-end px-5 py-2">
            <h1 className="font-semibold text-xl line-clamp-1 text-white dark:text-white mr-2">
              Yöneticim:
            </h1>
            <h1 className="text-base line-clamp-1 text-white dark:text-white">
              {employeeCardData.managerName}
            </h1>
          </div>
        ) : (
          <div className="flex justify-between items-end px-5 py-2"></div>
        )}

        <div className="flex justify-between items-end px-5 pb-2 mb-2">
          <h1 className="font-semibold text-xl line-clamp-1 text-white dark:text-white mr-2">
            İşe Giriş Tarihim:
          </h1>
          <h1 className="text-base line-clamp-1 text-white dark:text-white">
            {employeeCardData.hireDate &&
              employeeCardData.hireDate.split("T")[0].replaceAll("-", "/")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ExpandedProfileWidget;
