import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import { Avatar } from "@mui/material";
import { deepOrange, green } from '@mui/material/colors';
const card = (
  <React.Fragment>
      <Avatar sx={{ width: 100, height: 100 ,bgcolor: green[500] }} variant="rounded">
        <PlumbingIcon />
      </Avatar>
  </React.Fragment>
);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DashboardContent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item>
          <Item>
            <Card variant="outlined">{card}</Card>
          </Item>
        </Grid>
        <Grid item>
          <Item>
            <Card variant="outlined">{card}</Card>
          </Item>
        </Grid>
        <Grid item>
          <Item>
            <Card variant="outlined">{card}</Card>
          </Item>
        </Grid>
        <Grid item>
          <Item>
            <Card variant="outlined">{card}</Card>
          </Item>
        </Grid>
        <Grid item>
          <Item>
            <Card variant="outlined">{card}</Card>
          </Item>
        </Grid>
        <Grid item>
          <Item>
            <Card variant="outlined">{card}</Card>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
