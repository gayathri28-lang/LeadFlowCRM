import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          LeadFlow CRM
        </Typography>

        <Button
          color="inherit"
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
