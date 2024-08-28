import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://i.pinimg.com/564x/8d/df/83/8ddf83b8950e0c8ca6fe94b676117e0c.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)", // Arka planın üzerine koyu yarı şeffaf bir katman
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Sol Kısım */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 4,
          }}
        >
          <img
            src="https://i.pinimg.com/564x/a9/ee/1c/a9ee1cdb8cc070c3b4de7b0713a9c208.jpg" // Mars gezegeninin görselini buraya koyabilirsiniz
            alt="Martian"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Typography variant="h4" color="#FF6B6B" sx={{ letterSpacing: 2 }}>
            MARTIAN
          </Typography>
        </Box>

        {/* Sağ Kısım */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "rgba(255, 107, 107, 0.85)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="standard"
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="standard"
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="standard"
            margin="normal"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                padding: "10px 30px",
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                padding: "10px 30px",
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpPage;
