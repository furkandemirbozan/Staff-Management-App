import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../utils/Utils";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminGenerateAccountComponent() {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/Company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCompanyList(res.data["$values"]);
        toast.success("Company list fetched successfully");
      });
  }, []);

  const handleCreateUser = (values) => {
    axios
      .post(`${apiBaseUrl}/Auth/createuser`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Kullanıcı başarıyla kaydedildi.");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200 text-xl">
          Yeni Şirket Sahibi Kullanıcısı Oluştur
        </h2>
      </header>

      <div className="flex flex-col grow justify-center">
        <div className="flex flex-col items-center px-5 py-4 pb-2">
          <Formik
            initialValues={{
              username: "",
              email: "",
              companyId: "",
            }}
            onSubmit={(values) => handleCreateUser(values)}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <div className="flex flex-col gap-4 w-full">
                <Select
                  onChange={handleChange}
                  placeholder="Şirket Seçiniz"
                  name="companyId"
                  onBlur={handleBlur}
                  value={values.companyId}
                  helperText={touched.companyId && errors.companyId}
                  error={touched.companyId && Boolean(errors.companyId)}
                  className="w-full rounded-lg font-medium border border-gray-200 bg-white dark:bg-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: "300px",
                      },
                    },
                  }}
                >
                  {companyList.map((company) => (
                    <MenuItem
                      key={company.companyId}
                      value={company.companyId}
                      className="truncate"
                    >
                      {company.companyName}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  variant="outlined"
                  placeholder="Kullanıcı Adı"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={touched.username && Boolean(errors.username)}
                  className="w-full rounded-lg font-medium bg-white dark:text-white dark:bg-gray-500 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Kullanıcı Email Adresi"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                  className="w-full rounded-lg font-medium bg-white dark:bg-gray-500 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5 text-base tracking-wide font-semibold bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center"
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

export default AdminGenerateAccountComponent;
