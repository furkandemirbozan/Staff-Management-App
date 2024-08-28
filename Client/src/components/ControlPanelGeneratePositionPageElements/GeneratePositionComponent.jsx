import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../utils/Utils";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const generatePositionFormValidationScheme = Yup.object().shape({
  title: Yup.string()
    .min(2, "Meslek adı en az 2 karakter olmalı")
    .max(50, "Meslek adı en fazla 50 karakter olabilir")
    .required("Meslek adı zorunludur."),
});

function GeneratePositionComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();

  const handleCreateUser = (values) => {
    axios
      .post(`${apiBaseUrl}/Job`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) toast.success("Meslek başarıyla oluşturuldu.");
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 dark:bg-gray-900 shadow-lg rounded-xl w-full max-w-6xl mx-auto">
      <header className="px-8 py-6 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200 text-xl">
          Yeni Meslek Oluştur
        </h2>
      </header>

      <div className="flex flex-col grow justify-center p-8">
        <div className="flex flex-col items-center gap-5 w-full">
          <Formik
            validationSchema={generatePositionFormValidationScheme}
            initialValues={{
              title: "",
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
                  placeholder="Meslek Adı"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  helperText={touched.title && errors.title}
                  error={touched.title && Boolean(errors.title)}
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg w-full md:w-auto transition-all duration-300 ease-in-out"
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

export default GeneratePositionComponent;
