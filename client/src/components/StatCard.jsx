import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function StatCard({ title, value }) {
  return (
    <Card sx={{ minWidth: 220 }}>
      <CardContent>
        <Typography
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          component="div"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;