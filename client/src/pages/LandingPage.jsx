import { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

function LandingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budgetRange: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.company ||
      !form.budgetRange ||
      !form.message
    ) {
      setSnackbar({
        open: true,
        message: "Please fill all fields.",
        severity: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "",
        form
      );

      setSnackbar({
        open: true,
        message: "Lead submitted successfully!",
        severity: "success",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        budgetRange: "",
        message: "",
      });
          } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to submit lead. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          LeadDesk Mini
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Capture your business leads quickly and securely.
        </Typography>

        <Card elevation={6}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
            >
              Contact Us
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                margin="normal"
                label="Company"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />

              <TextField
                select
                fullWidth
                margin="normal"
                label="Budget Range"
                name="budgetRange"
                value={form.budgetRange}
                onChange={handleChange}
                required
              >
                <MenuItem value="Below ₹10,000">
                  Below ₹10,000
                </MenuItem>

                <MenuItem value="₹10,000 - ₹50,000">
                  ₹10,000 - ₹50,000
                </MenuItem>

                <MenuItem value="₹50,000 - ₹1,00,000">
                  ₹50,000 - ₹1,00,000
                </MenuItem>

                <MenuItem value="Above ₹1,00,000">
                  Above ₹1,00,000
                </MenuItem>
              </TextField>
                            <TextField
                fullWidth
                margin="normal"
                multiline
                rows={5}
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Lead"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Box
        sx={{
          mt: "auto",
          py: 3,
          bgcolor: "#1e293b",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#90caf9",
              textDecoration: "none",
            }}
          >
            Digital Heroes Training Task
          </a>
        </Typography>
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
    </Box>
  );
}

export default LandingPage;






























