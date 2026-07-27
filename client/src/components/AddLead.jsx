import { useState } from "react";
import { createLead } from "../services/leadService";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

function AddLead({ onLeadAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budgetRange: "",
    status: "New",
    message: "",
  });

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

    try {
      await createLead(form);

      setSnackbar({
        open: true,
        message: "Lead added successfully!",
        severity: "success",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        budgetRange: "",
        status: "New",
        message: "",
      });

      if (onLeadAdded) {
        onLeadAdded();
      }
    } catch (err) {
      console.error(err);

      setSnackbar({
        open: true,
        message: "Failed to add lead.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            Add New Lead
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
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
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Qualified">Qualified</MenuItem>
                  <MenuItem value="Proposal Sent">Proposal Sent</MenuItem>
                  <MenuItem value="Won">Won</MenuItem>
                  <MenuItem value="Lost">Lost</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Add Lead
                </Button>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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

export default AddLead;



















































