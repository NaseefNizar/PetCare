import {  Stack, Grid, Paper, Typography, TextField } from "@mui/material";

export const PartnerSignUpForm = () => {
  return (
    <Paper sx={{ padding: "32px",margin:"4rem" }} elevation={4}>
      <form>
        <Stack spacing={2}>
          <Typography variant="h5" fontSize={30} fontWeight="bold">
            Sign Up To Become ThePetNest Partner
          </Typography>
          <Typography>
            Please fill in this form to create an account.
          </Typography>
        </Stack>

        <Grid container my={4} rowSpacing={2} columnSpacing={1}>
          <Grid item xs={6}>
            <TextField label="Name" placeholder="Please enter your full name"  fullWidth></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" placeholder="Please enter your valid email id" fullWidth></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Contact Number" placeholder="Please enter valid 10 digit number" fullWidth></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Password" placeholder="Please enter a password of minimum 10 characters" fullWidth></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Password Confirmation" placeholder="Please re-enter the password" fullWidth></TextField>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
