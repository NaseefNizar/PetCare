import {
  Grid,
  Toolbar,
  Paper,
  AppBar,
  Stack,
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
  Box,
} from "@mui/material";
import PartnerLayout from "../../components/PartnerLayout/PartnerLayout";
import verificationImg from "../../assets/verification-img.png";
import { useAppSelector } from "../../redux/hooks";
import KycLayout from "../../components/PartnerLayout/Kyc/KycLayout";

export const PartnerHomePage = () => {
  const partnerData = useAppSelector((state) => state.vet.userData);


  return (
    <PartnerLayout>
      {!partnerData?.is_kycSubmitted ? (
        <Paper
          sx={{
            maxWidth: 936,
            margin: "auto",
            overflow: "hidden",
            padding: "20px",
          }}
        >
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <Toolbar sx={{ justifyContent: "center" }}>
              <Box alignItems="center" justifyContent={"center"}>
                WELCOME TO DASHBOARD
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Stack spacing={4}>
              <Typography
                sx={{ mt: 4, mx: 2 }}
                color="text.secondary"
                align="center"
              >
                Complete KYC to proceed further
              </Typography>

              <KycLayout />
              <img width={"400px"} height={"250px"} src={verificationImg} />
            </Stack>
          </Box>
        </Paper>
      ) : (
        <Paper
        sx={{
          maxWidth: 936,
          margin: "auto",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Box alignItems="center" justifyContent={"center"}>
              WELCOME TO DASHBOARD
            </Box>
          </Toolbar>
        </AppBar>
        </Paper> 
      )}
    </PartnerLayout>
  );
};
