import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../utils/Utils";
import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StaffAssignmentComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [nonUserEmployees, setNonUserEmployees] = useState([]);
  const [nonEmployeeUsers, setNonEmployeeUsers] = useState([]);

  const getEmployees = async () => {
    await axios
      .get(`${apiBaseUrl}/Employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEmployees(res.data.$values);
      });
  };

  const getUsers = async () => {
    await axios
      .get(`${apiBaseUrl}/User`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.$values);
      });
  };

  const getNonUserEmployees = async () => {
    setNonUserEmployees(employees.filter((employee) => !employee.userId));
  };

  const getNonEmployeeUsers = async () => {
    const filteredUserList = users.filter((user) => {
      return !employees.some((employee) => employee.userId === user.id);
    });
    setNonEmployeeUsers(filteredUserList);
  };

  useEffect(() => {
    getEmployees();
    getUsers();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      getNonUserEmployees();
    }
    if (users.length > 0) {
      getNonEmployeeUsers();
    }
  }, [employees, users]);

  const handleAssignUser = (values) => {
    axios
      .post(`${apiBaseUrl}/Employee/assign-user`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Kullanıcıya personel atama işlemi başarılı!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response.data.includes("duplicate")) {
          toast.error("Bu kullanıcı zaten bir personel ile ilişkilendirilmiş!");
          return;
        }
        toast.error("Kullanıcıya personel atama işlemi başarısız!");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 md:col-span-12 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 dark:bg-gray-900 shadow-lg rounded-xl p-6">
      <header className="px-8 py-6 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200 text-xl">
          Kullanıcıya Personel Ata
        </h2>
      </header>

      <div className="flex flex-col grow justify-center p-8">
        <div className="flex flex-row flex-wrap grow items-center gap-8">
          <Formik
            initialValues={{
              userId: "",
              employeeId: "",
            }}
            onSubmit={(values) => handleAssignUser(values)}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Users Field */}
                <div>
                  <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Kullanıcılar
                  </h1>
                  <RadioGroup
                    name="userId"
                    value={values.userId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col items-center flex-nowrap gap-2 h-96 overflow-y-scroll border p-4 rounded-lg no-scrollbar bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  >
                    {nonEmployeeUsers.map((user) => (
                      <>
                        <FormControlLabel
                          key={user.id}
                          value={user.id}
                          control={<Radio />}
                          label={user.userName}
                          className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
                        />
                        <Divider flexItem className="bg-gray-300 dark:bg-gray-600" />
                      </>
                    ))}
                  </RadioGroup>
                </div>
                {/* Employees Field */}
                <div>
                  <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Personeller
                  </h1>
                  <RadioGroup
                    name="employeeId"
                    value={values.employeeId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex flex-col items-center flex-nowrap gap-2 h-96 overflow-y-scroll border p-4 rounded-lg no-scrollbar bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  >
                    {nonUserEmployees.map((employee) => (
                      <>
                        <FormControlLabel
                          key={employee.id}
                          value={employee.id}
                          control={<Radio />}
                          label={employee.firstName + " " + employee.lastName}
                          className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-2"
                        />
                        <Divider flexItem className="bg-gray-300 dark:bg-gray-600" />
                      </>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg w-full transition-all duration-300 ease-in-out"
                >
                  <span className="ml-3">Kayıt Et</span>
                </Button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default StaffAssignmentComponent;
