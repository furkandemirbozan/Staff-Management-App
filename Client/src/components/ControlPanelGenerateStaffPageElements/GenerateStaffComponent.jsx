import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../../utils/Utils";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const generateStaffFormValidationScheme = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Ad en az 2 karakter olmalı")
    .max(50, "Ad en fazla 50 karakter olabilir")
    .required("Ad gerekli"),
  lastName: Yup.string()
    .min(2, "Soyad en az 2 karakter olmalı")
    .max(50, "Soyad en fazla 50 karakter olabilir")
    .required("Soyad gerekli"),
  email: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email gerekli"),
  birthDate: Yup.date().required("Doğum tarihi gerekli").nullable(),
  hireDate: Yup.date().required("İşe giriş tarihi gerekli").nullable(),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Telefon numarası yalnızca rakamlardan oluşmalıdır")
    .min(10, "Telefon numarası en az 10 haneli olmalı")
    .max(15, "Telefon numarası en fazla 15 haneli olabilir")
    .required("Telefon numarası gerekli"),
  educationLevelId: Yup.number()
    .min(1, "Eğitim seviyesi seçiniz")
    .required("Eğitim seviyesi gerekli"),
  genderId: Yup.number()
    .min(1, "Cinsiyet seçiniz")
    .required("Cinsiyet gerekli"),
  jobId: Yup.number().min(1, "Meslek seçiniz").required("Meslek gerekli"),
  departmentId: Yup.number()
    .min(1, "Departman seçiniz")
    .required("Departman gerekli"),
  createAddressDto: Yup.object().shape({
    streetAddress: Yup.string().required("Adres gerekli"),
    postalCode: Yup.string()
      .matches(/^\d+$/, "Posta kodu yalnızca rakamlardan oluşmalıdır")
      .required("Posta kodu gerekli"),
    city: Yup.string().required("Şehir gerekli"),
    state: Yup.string().required("Eyalet gerekli"),
    country: Yup.string().required("Ülke gerekli"),
  }),
  salaryDto: Yup.object().shape({
    amount: Yup.number().min(0, "Maaş negatif olamaz").required("Maaş gerekli"),
  }),
  createResumeDto: Yup.object().shape({
    path: Yup.string()
      .url("Geçerli bir URL girin")
      .required("Özgeçmiş gerekli"),
  }),
});

dayjs.extend(utc);

function GenerateStaffComponent() {
  let token = getToken();
  const [departmentList, setDepartmentList] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/Job`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setJobs(res.data.$values));
    axios
      .get(`${apiBaseUrl}/Department`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDepartmentList(res.data["$values"]);
      });
  }, []);

  const handleCreateEmployee = (values) => {
    const formattedValues = {
      ...values,
      birthDate: values.birthDate
        ? dayjs(values.birthDate).local().startOf("day").format()
        : null,
      hireDate: values.hireDate
        ? dayjs(values.hireDate).local().startOf("day").format()
        : null,
    };
    axios
      .post(`${apiBaseUrl}/Employee`, formattedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Personel başarıyla eklendi");
          navigate("/dashboard/employees");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Personel eklenirken bir hata oluştu");
      });
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-10 bg-gradient-to-r from-green-500 to-blue-700 dark:bg-gray-900 shadow-lg rounded-xl">
      <header className="px-5 py-4 bg-blue-700 rounded-t-xl">
        <h2 className="font-semibold text-white dark:text-gray-200">
          Yeni Personel Ekle
        </h2>
      </header>

      <div className="flex flex-col grow justify-center p-5">
        <div className="flex flex-col flex-wrap items-center gap-5">
          <Formik
            validationSchema={generateStaffFormValidationScheme}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              hireDate: dayjs().format("YYYY-MM-DD"),
              birthDate: dayjs().format("YYYY-MM-DD"),
              phoneNumber: "",
              remainingLeaveDays: 15,
              educationLevelId: 0,
              genderId: 0,
              jobId: 0,
              departmentId: 0,
              managerEmployeeId: null,
              isActive: true,
              userId: null,
              createAddressDto: {
                streetAddress: "",
                postalCode: "",
                city: "",
                state: "",
                country: "",
              },
              salaryDto: {
                employeeId: 1,
                amount: 0,
              },
              createResumeDto: {
                path: "",
              },
            }}
            onSubmit={(values) => handleCreateEmployee(values)}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <div className="flex flex-wrap gap-3 w-full items-end justify-start">
                {/* names and email */}
                <div className="flex flex-col md:flex-row w-full gap-2">
                  <TextField
                    variant="outlined"
                    placeholder="Ad"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    helperText={touched.firstName && errors.firstName}
                    error={touched.firstName && Boolean(errors.firstName)}
                    className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Soyad"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    helperText={touched.lastName && errors.lastName}
                    error={touched.lastName && Boolean(errors.lastName)}
                    className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Email Adresi"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                    className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  />
                </div>

                {/* dates */}
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <DatePicker
                    disableFuture
                    className="w-full"
                    label="Doğum Tarihi"
                    value={dayjs(values.birthDate)}
                    onChange={(date) => setFieldValue("birthDate", dayjs(date))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="birthDate"
                        onBlur={handleBlur}
                        error={touched.birthDate && Boolean(errors.birthDate)}
                        helperText={touched.birthDate && errors.birthDate}
                        className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      />
                    )}
                  />
                  <DatePicker
                    disableFuture
                    className="w-full"
                    label="İşe Giriş Tarihi"
                    value={dayjs(values.hireDate)}
                    onChange={(date) => setFieldValue("hireDate", dayjs(date))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="hireDate"
                        onBlur={handleBlur}
                        error={touched.hireDate && Boolean(errors.hireDate)}
                        helperText={touched.hireDate && errors.hireDate}
                        className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      />
                    )}
                  />
                </div>

                {/* phoneNumber */}
                <TextField
                  variant="outlined"
                  placeholder="Telefon Numarası"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                />

                {/* comboboxes */}
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <div className="w-full md:w-1/4">
                    <h1 className="text-gray-900 dark:text-gray-200">Eğitim Seviyesi</h1>
                    <Select
                      onChange={handleChange}
                      placeholder="Eğitim Seviyesi Seçiniz"
                      name="educationLevelId"
                      onBlur={handleBlur}
                      value={values.educationLevelId}
                      error={
                        touched.educationLevelId &&
                        Boolean(errors.educationLevelId)
                      }
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxWidth: "300px",
                          },
                        },
                      }}
                    >
                      <MenuItem value={1} className="truncate">
                        Lise
                      </MenuItem>
                      <MenuItem value={2} className="truncate">
                        Lisans
                      </MenuItem>
                      <MenuItem value={3} className="truncate">
                        Yüksek Lisans
                      </MenuItem>
                      <MenuItem value={4} className="truncate">
                        Doktora
                      </MenuItem>
                    </Select>
                  </div>

                  <div className="w-full md:w-1/4">
                    <h1 className="text-gray-900 dark:text-gray-200">Cinsiyet</h1>
                    <Select
                      onChange={handleChange}
                      placeholder="Cinsiyet Seçiniz"
                      name="genderId"
                      onBlur={handleBlur}
                      value={values.genderId}
                      error={touched.genderId && Boolean(errors.genderId)}
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxWidth: "300px",
                          },
                        },
                      }}
                    >
                      <MenuItem value={1} className="truncate">
                        Erkek
                      </MenuItem>
                      <MenuItem value={2} className="truncate">
                        Kadın
                      </MenuItem>
                    </Select>
                  </div>

                  <div className="w-full md:w-1/4">
                    <h1 className="text-gray-900 dark:text-gray-200">Meslek</h1>
                    <Select
                      onChange={handleChange}
                      placeholder="Meslek Seçiniz"
                      name="jobId"
                      onBlur={handleBlur}
                      value={values.jobId}
                      error={touched.jobId && Boolean(errors.jobId)}
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxWidth: "300px",
                          },
                        },
                      }}
                    >
                      {jobs.map((job) => (
                        <MenuItem key={job.id} value={job.id} className="truncate">
                          {job.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="w-full md:w-1/4">
                    <h1 className="text-gray-900 dark:text-gray-200">Departman</h1>
                    <Select
                      onChange={handleChange}
                      placeholder="Departman Seçiniz"
                      name="departmentId"
                      onBlur={handleBlur}
                      value={values.departmentId}
                      error={touched.departmentId && Boolean(errors.departmentId)}
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxWidth: "300px",
                          },
                        },
                      }}
                    >
                      {departmentList.map((department) => (
                        <MenuItem key={department.id} value={department.id} className="truncate">
                          {department.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* adress first 3 inputs */}
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <TextField
                    variant="outlined"
                    placeholder="Adres Satırı"
                    name="createAddressDto.streetAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.createAddressDto.streetAddress}
                    helperText={touched.createAddressDto?.streetAddress && errors.createAddressDto?.streetAddress}
                    error={
                      touched.createAddressDto?.streetAddress &&
                      Boolean(errors.createAddressDto?.streetAddress)
                    }
                    className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
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
                    className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
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
                    className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  />
                </div>

                {/* adress last 2 inputs */}
                <div className="flex flex-col md:flex-row gap-2 w-full">
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
                    className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
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
                    className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                  />
                  <div className="w-1/3 hidden md:flex"> </div>
                </div>

                {/* salary and resume */}
                <div className="flex flex-col md:flex-row gap-2 w-full items-end">
                  <div className="w-full">
                    <h1 className="text-gray-900 dark:text-gray-200">Maaş</h1>
                    <TextField
                      variant="outlined"
                      placeholder="Maaş"
                      name="salaryDto.amount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.salaryDto.amount}
                      helperText={touched.salaryDto?.amount && errors.salaryDto?.amount}
                      error={
                        touched.salaryDto?.amount &&
                        Boolean(errors.salaryDto?.amount)
                      }
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                    />
                  </div>
                  <div className="w-full">
                    <TextField
                      variant="outlined"
                      placeholder="Özgeçmiş PDF Linki"
                      name="createResumeDto.path"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.createResumeDto.path}
                      helperText={touched.createResumeDto?.path && errors.createResumeDto?.path}
                      error={
                        touched.createResumeDto?.path &&
                        Boolean(errors.createResumeDto?.path)
                      }
                      className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                    />
                  </div>
                </div>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg w-full md:w-auto transition-all duration-300 ease-in-out"
                >
                  <span className="ml-2">Kayıt Et</span>
                </Button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default GenerateStaffComponent;
