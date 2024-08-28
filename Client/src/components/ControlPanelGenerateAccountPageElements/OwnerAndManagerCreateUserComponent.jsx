import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getRole, getToken } from "../../utils/Utils";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function OwnerAndManagerCreateUserComponent() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const userRole = getRole();
  let token = getToken();
  const user = useSelector((state) => state.user);

  const handleCreateUser = (values) => {
    let createUserObject = {
      ...values,
      companyId: user.companyId,
    };
    console.log(user.companyId);
    axios
      .post(`${apiBaseUrl}/Auth/createuser`, createUserObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200)
          toast.success("Kullanıcı başarıyla oluşturuldu.");
        navigate("/dashboard");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-500 via-green-300 to-blue-700 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 from-green-500 via-green-300 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200">
          {userRole === "CompanyOwner" ? "Yönetici" : "Çalışan"} Kullanıcısı
          Oluştur
        </h2>
      </header>

      <div className="flex flex-col grow justify-center p-5">
        <div className="flex flex-row flex-wrap grow items-center space-y-4 md:space-y-0 md:space-x-4">
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
              <>
                <TextField
                  variant="outlined"
                  placeholder="Kullanıcı Adı"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={touched.username && Boolean(errors.username)}
                  className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-full md:w-auto transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <span className="ml-3">Kayıt Et</span>
                </Button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default OwnerAndManagerCreateUserComponent;
