import {  Typography, Paper, Grid } from "@mui/material";
import { AddPets } from "../../components/AddPets";

export const PetDetailPage = () => {
  return (
      <Paper sx={{ padding: "30px" }}>
        <Grid container spacing={2} direction={"row"} >
          <Grid item md={12} lg={12} sm={12} xs={6}>
            <Typography sx={{ fontSize: "20px" }}>
              <strong>Pet Details</strong>
            </Typography>
          </Grid>
          <Grid item lg={3}>
            <Paper sx={{ p: "10px" }}></Paper>
          </Grid>

          <Grid item lg={12}>
            <AddPets />
          </Grid>
        </Grid>
      </Paper>
  );
};
