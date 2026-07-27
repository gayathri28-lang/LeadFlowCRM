import { useState, useEffect } from "react";
import { updateLead } from "../services/leadService";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

function EditLead({ lead, onClose, onLeadUpdated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budgetRange: "",
    message: "",
    status: "New",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || "",
        email: lead.email || "",
        budgetRange: lead.budgetRange || "",
        message: lead.message || "",
        status: lead.status || "New",
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateLead(lead._id, form);

      setSnackbar({
        open: true,
        message: "Lead updated successfully!",
        severity: "success",
      });

      if (onLeadUpdated) {
        onLeadUpdated();
      }

      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1000);

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to update lead.",
        severity: "error",
      });
    }
  };

  if (!lead) return null;

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
            Edit Lead
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>

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
                  type="email"
                  name="email"
                  value={form.email}
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
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mr: 2 }}
                >
                  Update Lead
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
      </Card>

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

export default EditLead;

























































