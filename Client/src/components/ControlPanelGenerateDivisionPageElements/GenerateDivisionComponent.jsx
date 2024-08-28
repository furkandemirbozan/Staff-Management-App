import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../utils/Utils";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const initiateDivisionFormValidationScheme = Yup.object().shape({
  name: Yup.string()
    .min(2, "Departman adı en az 2 karakter olmalı")
    .max(50, "Departman adı en fazla 50 karakter olabilir")
    .required("Departman adı zorunludur."),
});

function CreateDepartmentForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();
  useEffect(() => { }, []);

  const handleCreateUser = (values) => {
    axios
      .post(`${apiBaseUrl}/Department`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201)
          toast.success("Departman başarıyla oluşturuldu.");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-500 to-blue-700 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200">
          Yeni Departman Oluştur
        </h2>
      </header>

      <div className="flex flex-col grow justify-center p-5">
        <div className="flex flex-col items-center gap-5">
          <Formik
            validationSchema={initiateDivisionFormValidationScheme}
            initialValues={{
              name: "",
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
                <TextField
                  variant="outlined"
                  placeholder="Departman Adı"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5  from-green-500 to-blue-700  text-white py-4 rounded-lg w-full md:w-auto transition-all duration-300 ease-in-out"
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

export default CreateDepartmentForm;
