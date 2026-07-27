import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setSnackbar({
        open: true,
        message: "Login Successful!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (error) {
      console.log(error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          error.message ||
          "Login Failed",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f7fb",
        }}
      >
        <Card
          sx={{
            width: 400,
            borderRadius: 3,
            boxShadow: 5,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              LeadFlow CRM
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
              mb={3}
            >
              Login to continue
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 3 }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;


























