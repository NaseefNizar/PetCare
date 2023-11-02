import { Grid, Paper, Typography,Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const PaymentSuccess = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
      }}
      spacing={2}
    >
      <Grid item lg={6}>
        <Paper sx={{display:'flex',alignItems:"center",justifyContent:"center",height:"80vh",borderRadius:"30px"}}>
          <Grid container direction={"column"} sx={{display:'flex',alignItems:"center",justifyContent:"center"}} spacing={4}>
            <Grid item lg={6} >
              <CheckCircleIcon color="success" sx={{width:'100px',height:"100px"}} />
            </Grid>
            <Grid item lg={6}>
              <Typography variant="h4">Appointment booked Successfully!</Typography>
            </Grid>
            <Grid item lg={6}>
            <Button variant="contained" color="secondary">View appointments</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
