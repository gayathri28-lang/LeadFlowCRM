import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 220,
        minHeight: "100vh",
        bgcolor: "#f4f4f4",
        borderRight: "1px solid #ddd",
      }}
    >
      <List>
        <ListItemButton selected>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Leads" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Users" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Reports" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;