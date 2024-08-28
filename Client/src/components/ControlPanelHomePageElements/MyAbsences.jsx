import {
  Approval,
  Check,
  CheckCircle,
  DoNotDisturb,
  Pending,
} from "@mui/icons-material";
import React from "react";

function MyAbsences({ remainingLeaveDays, leaveList }) {
  const getIcon = (status) => {
    switch (status) {
      case "Approved":
        return (
          <CheckCircle className="w-9 h-9 rounded-full shrink-0 mr-2 sm:mr-3 text-blue-500 dark:bg-black" />
        );

      case "Rejected":
        return (
          <DoNotDisturb className="w-9 h-9 rounded-full shrink-0 mr-2 sm:mr-3 text-red-500 dark:bg-black" />
        );

      case "Pending":
        return (
          <Pending className="w-9 h-9 rounded-full shrink-0 mr-2 sm:mr-3 text-orange-500 dark:bg-black" />
        );

      default:
        return null;
    }
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-gradient-to-r from-green-400 to-blue-600 dark:bg-black shadow-sm rounded-xl">
      <header className="px-5 py-4 ">
        <h2 className="font-semibold text-white dark:text-white">
          İzin Taleplerim
        </h2>
      </header>
      <div className="px-5 py-4 flex flex-row justify-start items-center">
        <h1 className="text-6xl text-white dark:text-white">
          {remainingLeaveDays} GÜN
        </h1>
        <h1 className="text-base font-light text-white dark:text-white">
          kalan izin hakkınız bulunmaktadır.
        </h1>
      </div>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto max-h-40 overflow-y-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-200 dark:text-gray-500 bg-blue-500 dark:bg-gray-700 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Durum</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Tip</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Başlangıç Tarihi
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Bitiş Tarihi</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium text-gray-800 dark:text-gray-300">
              {leaveList &&
                leaveList.reverse().map((leave, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex justify-center items-center">
                        {getIcon(leave.requestStatus)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{leave.leaveType}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {leave.startDate &&
                          leave.startDate.split("T")[0].replaceAll("-", "/")}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {leave.endDate &&
                          leave.endDate.split("T")[0].replaceAll("-", "/")}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyAbsences;
