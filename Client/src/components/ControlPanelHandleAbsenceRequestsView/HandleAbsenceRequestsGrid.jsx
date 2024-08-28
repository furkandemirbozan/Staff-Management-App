import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  CheckCircle,
  DoNotDisturb,
  Pending,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/Utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function HandleAbsenceRequestsGrid() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const token = getToken();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leaveRequestsWithEmployeeNames, setLeaveRequestsWithEmployeeNames] =
    useState([]);

  const getIcon = (requestStatusId) => {
    switch (requestStatusId) {
      case 2:
        return (
          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
        );
      case 3:
        return (
          <DoNotDisturb className="w-6 h-6 text-red-500 dark:text-red-400" />
        );
      case 1:
        return (
          <Pending className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
        );
      default:
        return null;
    }
  };

  const getLeaveTypeName = (leaveTypeId) => {
    switch (leaveTypeId) {
      case 1:
        return "Sick Leave";
      case 2:
        return "Vacation Leave";
      case 3:
        return "Personal Leave";
      default:
        return null;
    }
  };

  useEffect(() => {
    if (leaveRequests.length > 0 && employees.length > 0) {
      const mappedRequests = leaveRequests.map((leaveRequest) => {
        const employee = employees.find(
          (emp) => emp.id === leaveRequest.employeeId
        );
        return {
          ...leaveRequest,
          employeeName: employee
            ? `${employee.firstName} ${employee.lastName}`
            : "Unknown Employee",
        };
      });
      setLeaveRequestsWithEmployeeNames(mappedRequests);
    }
  }, [leaveRequests, employees]);

  useEffect(() => {
    try {
      axios
        .get(`${apiBaseUrl}/Leave`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLeaveRequests(res.data.$values);
        });
      axios
        .get(`${apiBaseUrl}/Employee`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setEmployees(res.data.$values));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getFilteredLeaveRequests(leaveRequests);
  }, [leaveRequests]);

  const getFilteredLeaveRequests = (leaveRequests) => {
    if (leaveRequests.length > 0) {
      const filteredLeaves = leaveRequests.filter(
        (leave) => leave.approvedById === 0
      );
      setFilteredLeaveRequests(filteredLeaves);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApproveLeaveRequest = async (leaveId) => {
    let requestObject = {
      id: leaveId,
      requestStatusId: 2,
    };
    await axios
      .put(`${apiBaseUrl}/Leave/UpdateLeaveStatus`, requestObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("İzin başarıyla onaylandı.");
          navigate(0);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRejectLeaveRequest = async (leaveId) => {
    let requestObject = {
      id: leaveId,
      requestStatusId: 3,
    };
    await axios
      .put(`${apiBaseUrl}/Leave/UpdateLeaveStatus`, requestObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("İzin başarıyla reddedildi.");
          navigate(0);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200 text-xl">
          İzin İsteklerini Yönet
        </h2>
      </header>

      <div className="px-5 py-4 max-h-full">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <TableContainer className="max-h-[36rem] md:max-h-[43rem]">
            <Table stickyHeader aria-label="sticky table">
              {/* Table Head */}
              <TableHead>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell align={"left"} style={{ minWidth: 100 }}>
                    <span className="text-gray-700 dark:text-gray-300">Durum</span>
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    <span className="text-gray-700 dark:text-gray-300">
                      Talep Eden Personel
                    </span>
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 150 }}>
                    <span className="text-gray-700 dark:text-gray-300">İzin Tipi</span>
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    <span className="text-gray-700 dark:text-gray-300">
                      İzin Başlangıç Tarihi
                    </span>
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    <span className="text-gray-700 dark:text-gray-300">İzin Bitiş Tarihi</span>
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    <span className="text-gray-700 dark:text-gray-300">Talep Tarihi</span>
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    <span className="text-gray-700 dark:text-gray-300">İşlemler</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {leaveRequestsWithEmployeeNames.length > 0 &&
                  leaveRequestsWithEmployeeNames.reverse().map((leave, index) => (
                    <TableRow hover role="checkbox" key={index} tabIndex={-1}>
                      <TableCell align={"left"}>{getIcon(leave.requestStatusId)}</TableCell>
                      <TableCell align={"left"}>{leave.employeeName}</TableCell>
                      <TableCell align={"left"}>{getLeaveTypeName(leave.leaveTypeId)}</TableCell>
                      <TableCell align={"left"}>
                        {leave.startDate
                          ? leave.startDate.split("T")[0].replaceAll("-", "/")
                          : "Unknown"}
                      </TableCell>
                      <TableCell align={"left"}>
                        {leave.endDate
                          ? leave.endDate.split("T")[0].replaceAll("-", "/")
                          : "Unknown"}
                      </TableCell>
                      <TableCell align={"left"}>
                        {leave.requestedDate
                          ? leave.requestedDate.split("T")[0].replaceAll("-", "/")
                          : "Unknown"}
                      </TableCell>
                      <TableCell align={"left"}>
                        <IconButton
                          onClick={() => handleApproveLeaveRequest(leave.id)}
                          aria-label="onayla"
                          className="w-9 h-9 rounded-full shrink-0 mr-2 sm:mr-3 text-green-500 dark:text-green-400"
                        >
                          <ThumbUp />
                        </IconButton>
                        <IconButton
                          onClick={() => handleRejectLeaveRequest(leave.id)}
                          aria-label="reddet"
                          className="w-9 h-9 rounded-full shrink-0 mr-2 sm:mr-3 text-red-500 dark:text-red-400"
                        >
                          <ThumbDown />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={leaveRequestsWithEmployeeNames.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default HandleAbsenceRequestsGrid;
