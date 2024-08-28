import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../utils/Utils";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const initiateDivisionFormValidationScheme = Yup.object().shape({
  description: Yup.string()
    .min(5, "Açıklama alanı en az 5 karakter olmalı")
    .max(300, "Açıklama alanı en fazla 300 karakter olabilir")
    .required("Açıklama alanı zorunludur."),
  name: Yup.string()
    .min(5, "Etkinlik adı en az 5 karakter olmalı")
    .max(50, "Etkinlik adı en fazla 50 karakter olabilir")
    .required("Etkinlik adı zorunludur."),
});

function OrganizeActivityComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();

  const handleCreateLeaveRequest = (values) => {
    axios
      .post(`${apiBaseUrl}/Events`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) toast.success("Etkinlik başarıyla oluşturuldu.");
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200 text-xl">
          Yeni Etkinlik Oluştur
        </h2>
      </header>

      <div className="flex flex-col grow justify-center">
        <div className="flex flex-col items-center px-5 py-4 pb-2">
          <Formik
            validationSchema={initiateDivisionFormValidationScheme}
            initialValues={{
              startDate: dayjs().format("YYYY-MM-DD"),
              endDate: dayjs().format("YYYY-MM-DD"),
              name: "",
              description: "",
            }}
            onSubmit={(values) => handleCreateLeaveRequest(values)}
          >
            {({
              values,
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col md:flex-row gap-4">
                  <DatePicker
                    disablePast
                    className="w-full"
                    label="Başlangıç Tarihi"
                    value={dayjs(values.startDate)}
                    onChange={(date) => setFieldValue("startDate", dayjs(date))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="startDate"
                        onBlur={handleBlur}
                        error={touched.startDate && Boolean(errors.startDate)}
                        helperText={touched.startDate && errors.startDate}
                        variant="outlined"
                        fullWidth
                        className="bg-white rounded-lg"
                      />
                    )}
                  />
                  <DatePicker
                    disablePast
                    className="w-full"
                    label="Bitiş Tarihi"
                    value={dayjs(values.endDate)}
                    onChange={(date) => setFieldValue("endDate", dayjs(date))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="endDate"
                        onBlur={handleBlur}
                        error={touched.endDate && Boolean(errors.endDate)}
                        helperText={touched.endDate && errors.endDate}
                        variant="outlined"
                        fullWidth
                        className="bg-white rounded-lg"
                      />
                    )}
                  />
                </div>

                <TextField
                  variant="outlined"
                  placeholder="Etkinlik Adı"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                  fullWidth
                  className="bg-white rounded-lg"
                />

                <TextField
                  variant="outlined"
                  placeholder="Etkinlik Açıklaması"
                  multiline
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  helperText={touched.description && errors.description}
                  error={touched.description && Boolean(errors.description)}
                  fullWidth
                  className="bg-white rounded-lg"
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5 text-base tracking-wide font-semibold bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  <span>Kayıt Et</span>
                </Button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default OrganizeActivityComponent;
