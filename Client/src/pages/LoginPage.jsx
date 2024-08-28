import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/Utils";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  password: Yup.string()
    .required("Please enter your password")
    .min(4, "Password must be at least 4 characters"),
});

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://localhost:7018/api/Auth/login",
        values
      );
      if (res.status === 200) {
        toast.success("Login successful");
        const token = res.data.token;
        const decodedToken = jwtDecode(token);
        const user = {
          isUser: true,
          username: decodedToken.username,
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        };
        dispatch(userLogin(user));
        localStorage.setItem("Token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Something went wrong, please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        bgcolor: "background.paper",
        p: 4,
        borderRadius: 2,
        backgroundImage: `url(https://i.pinimg.com/564x/17/2e/5e/172e5e08d176cb9a5271b93920953493.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Sign in to continue
          </Typography>
        </Box>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                margin="normal"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.username && errors.username}
                error={touched.username && Boolean(errors.username)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
              />
              <Box mt={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  size="large"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button color="secondary" onClick={() => navigate("/signup")}>
              Sign up here
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;