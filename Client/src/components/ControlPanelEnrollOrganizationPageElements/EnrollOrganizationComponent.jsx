import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { getToken } from "../../utils/Utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const createCompanySchema = Yup.object().shape({
  companyName: Yup.string().required("Şirket adı alanı boş geçilemez!"),
  companyEmail: Yup.string()
    .email("Geçersiz Email adresi!")
    .required("Şirket email alanı boş geçilemez!"),
  companyPhoneNumber: Yup.string()
    .required("Şirket telefon numarası alanı boş geçilemez!")
    .min(10, "Şirket telefon numarası çok kısa!")
    .max(15, "Şirket telefon numarası çok uzun!"),
  companyLogoUrl: Yup.string().required("Şirket Logo URL alanı boş geçilemez!"),
  createAddressDto: Yup.object().shape({
    streetAddress: Yup.string().required("Adres alanı boş geçilemez!"),
    postalCode: Yup.string().required("Posta kodu alanı boş geçilemez!"),
    city: Yup.string().required("Şehir alanı boş geçilemez!"),
    state: Yup.string().required("İlçe alanı boş geçilemez!"),
    country: Yup.string().required("Ülke alanı boş geçilemez!"),
  }),
});

function EnrollOrganizationComponent() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = getToken();

  const handleRegisterCompany = (values) => {
    axios
      .post(`${apiBaseUrl}/Company`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) toast.success("Şirket başarıyla kaydedildi.");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bir hata oluştu.");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200 text-xl">
          Yeni Şirket Kaydı
        </h2>
      </header>

      <div className="flex flex-col grow justify-center">
        <div className="flex flex-col flex-wrap items-center px-5 py-4 pb-2">
          <Formik
            initialValues={{
              companyName: "",
              companyEmail: "",
              companyPhoneNumber: "",
              companyLogoUrl: "",
              createAddressDto: {
                streetAddress: "",
                postalCode: "",
                city: "",
                state: "",
                country: "",
              },
            }}
            onSubmit={(values) => handleRegisterCompany(values)}
            validationSchema={createCompanySchema}
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
                  placeholder="Şirket Adı"
                  name="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                  helperText={touched.companyName && errors.companyName}
                  error={touched.companyName && Boolean(errors.companyName)}
                  className="w-full rounded-lg bg-white text-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Şirket Email Adresi"
                  type="email"
                  name="companyEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyEmail}
                  helperText={touched.companyEmail && errors.companyEmail}
                  error={touched.companyEmail && Boolean(errors.companyEmail)}
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Şirket Telefon Numarası"
                  type="tel"
                  name="companyPhoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyPhoneNumber}
                  helperText={touched.companyPhoneNumber && errors.companyPhoneNumber}
                  error={
                    touched.companyPhoneNumber &&
                    Boolean(errors.companyPhoneNumber)
                  }
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Şirket Logo URL"
                  name="companyLogoUrl"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyLogoUrl}
                  helperText={touched.companyLogoUrl && errors.companyLogoUrl}
                  error={touched.companyLogoUrl && Boolean(errors.companyLogoUrl)}
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Adres"
                  name="createAddressDto.streetAddress"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.createAddressDto.streetAddress}
                  helperText={touched.createAddressDto?.streetAddress && errors.createAddressDto?.streetAddress}
                  error={
                    touched.createAddressDto?.streetAddress &&
                    Boolean(errors.createAddressDto?.streetAddress)
                  }
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Posta Kodu"
                  name="createAddressDto.postalCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.createAddressDto.postalCode}
                  helperText={touched.createAddressDto?.postalCode && errors.createAddressDto?.postalCode}
                  error={
                    touched.createAddressDto?.postalCode &&
                    Boolean(errors.createAddressDto?.postalCode)
                  }
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Şehir"
                  name="createAddressDto.city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.createAddressDto.city}
                  helperText={touched.createAddressDto?.city && errors.createAddressDto?.city}
                  error={
                    touched.createAddressDto?.city &&
                    Boolean(errors.createAddressDto?.city)
                  }
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Eyalet"
                  name="createAddressDto.state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.createAddressDto.state}
                  helperText={touched.createAddressDto?.state && errors.createAddressDto?.state}
                  error={
                    touched.createAddressDto?.state &&
                    Boolean(errors.createAddressDto?.state)
                  }
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
                />

                <TextField
                  variant="outlined"
                  placeholder="Ülke"
                  name="createAddressDto.country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.createAddressDto.country}
                  helperText={touched.createAddressDto?.country && errors.createAddressDto?.country}
                  error={
                    touched.createAddressDto?.country &&
                    Boolean(errors.createAddressDto?.country)
                  }
                  className="w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400"
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

export default EnrollOrganizationComponent;
