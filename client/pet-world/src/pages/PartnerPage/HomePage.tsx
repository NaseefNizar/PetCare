import {
  Grid,
  Toolbar,
  Paper,
  AppBar,
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
  Box
} from "@mui/material";
import PartnerLayout from '../../components/PartnerLayout/PartnerLayout'
import { useAppSelector } from "../../redux/hooks";

export const PartnerHomePage = () => {

  const partnerData = useAppSelector( state => state.vet.userData)
  
  console.log("is",partnerData);
  
  return (

    <PartnerLayout>
    {!partnerData?.is_verified ? (
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", padding:"20px"}}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar sx={{justifyContent: "center"}}>
          <Box alignItems="center" justifyContent={"center"}>
            WELCOME TO DASHBOARD
          </Box>
        </Toolbar>
      </AppBar>
      <Box display={"flex"} flexDirection={"column"} alignItems="center" justifyContent={"center"}>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Complete KYC to proceed further
      </Typography>
      <Button variant="contained" sx={{ mr: 1 }} >
                Continue
              </Button>
              </Box>
    </Paper>
    ) : "" }
    </PartnerLayout>

  )
}
