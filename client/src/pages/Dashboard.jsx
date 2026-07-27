import { useEffect, useState } from "react";
import {
  getAllLeads,
  deleteLead,
  searchLeads,
} from "../services/leadService";

import EditLead from "../components/EditLead";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import {
  Box,
  Grid,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [search, setSearch] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getAllLeads();

      setLeads(response.data);

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to load leads",
        severity: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (value.trim() === "") {
      fetchLeads();
      return;
    }

    try {
      const response = await searchLeads(value);
      setLeads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
  try {
    await deleteLead(id);

    fetchLeads();

    setSnackbar({
      open: true,
      message: "Lead deleted successfully!",
      severity: "success",
    });

  } catch (error) {
    console.error(error);

    setSnackbar({
      open: true,
      message: "Failed to delete lead.",
      severity: "error",
    });
  }
};
    return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            p: 4,
            maxWidth: "calc(100vw - 220px)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={3}
          >
            Welcome, {user?.name}
          </Typography>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Leads"
                value={leads.length}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="New Leads"
                value={
                  leads.filter(
                    (lead) => lead.status === "New"
                  ).length
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Contacted"
                value={
                  leads.filter(
                    (lead) => lead.status === "Contacted"
                  ).length
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Closed"
                value={
                  leads.filter(
                    (lead) =>
                      lead.status === "Won" ||
                      lead.status === "Lost" ||
                      lead.status === "Closed"
                  ).length
                }
              />
            </Grid>
          </Grid>

          {selectedLead && (
            <EditLead
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
              onLeadUpdated={fetchLeads}
            />
          )}

          <TextField
            fullWidth
            label="Search Leads"
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            sx={{
              mb: 3,
              bgcolor: "#fff",
            }}
          />

          <Paper elevation={3}>
            <TableContainer
              sx={{
                overflowX: "auto",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Company</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Phone</b></TableCell>
                    <TableCell><b>Budget</b></TableCell>
                    <TableCell width={280}>
                      <b>Message</b>
                    </TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell width={170}>
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
  <TableRow>
    <TableCell colSpan={8} align="center">
      Loading...
    </TableCell>
  </TableRow>
) : leads.length === 0 ? (
  <TableRow>
    <TableCell colSpan={8} align="center">
      No leads found
    </TableCell>
  </TableRow>
) : (
  leads.map((lead) => (
    <TableRow key={lead._id} hover>

      <TableCell>
        {lead.name}
      </TableCell>

      <TableCell>
        {lead.company || "-"}
      </TableCell>

      <TableCell>
        {lead.email}
      </TableCell>

      <TableCell>
        {lead.phone || "-"}
      </TableCell>

      <TableCell>
        {lead.budgetRange || "-"}
      </TableCell>

      <TableCell
        sx={{
          maxWidth: 280,
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {lead.message || "-"}
      </TableCell>

      <TableCell>
        {lead.status}
      </TableCell>

      <TableCell>
        <Button
          variant="contained"
          size="small"
          sx={{ mr: 1, mb: 1 }}
          onClick={() => setSelectedLead(lead)}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(lead._id)}
        >
          Delete
        </Button>

      </TableCell>

    </TableRow>
  ))
)}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

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
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
