import { Grid } from "@mui/material";
import Service from "./Service";
export default function Services(props) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Service />
      </Grid>
    </Grid>
  );
}
