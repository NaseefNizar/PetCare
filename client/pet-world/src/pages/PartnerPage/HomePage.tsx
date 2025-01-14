import {
  // Grid,
  Toolbar,
  Paper,
  AppBar,
  Stack,
  // TextField,
  // Button,
  // IconButton,
  Typography,
  // Tooltip,
  Box,
} from "@mui/material";
import { useEffect } from "react";
// import PartnerLayout from "../../components/PartnerLayout/PartnerLayout";
import verificationImg from "../../assets/verification-img.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import KycLayout from "../../components/PartnerLayout/Kyc/KycLayout";
import { getPartnerData } from "../../redux/features/partnerSlice";
import Dashboard from "./Dashboard";

export const PartnerHomePage = () => {
  const dispatch = useAppDispatch();
  const partnerData = useAppSelector((state) => state.vet.userData);
  useEffect(() => {
    dispatch(getPartnerData());
  }, []);

  return (
    // <PartnerLayout>
    <>
      {!partnerData?.is_verified ? (
        !partnerData?.is_kycSubmitted ? (
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
                  Your documents are under verification. Please wait for 4-5
                  days till the verification completes to proceed further
                </Typography>
              </Stack>
            </Box>
          </Paper>
        )
      ) : (
        // <Paper
        //   sx={{
        //     maxWidth: 936,
        //     margin: "auto",
        //     overflow: "hidden",
        //     padding: "20px",
        //   }}
        // >
        //   <AppBar
        //     position="static"
        //     color="default"
        //     elevation={0}
        //     sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        //   >
        //     <Toolbar sx={{ justifyContent: "center" }}>
        //       <Box alignItems="center" justifyContent={"center"}>
        //         WELCOME TO DASHBOARD
        //       </Box>
        //     </Toolbar>
        //   </AppBar>
        //   <Box
        //     display={"flex"}
        //     flexDirection={"column"}
        //     alignItems="center"
        //     justifyContent={"center"}
        //   >
        //     <Stack spacing={4}>
        //       <Typography
        //         sx={{ mt: 4, mx: 2 }}
        //         color="text.secondary"
        //         align="center"
        //       >
        //         Your documents are verified
        //       </Typography>
        //     </Stack>
        //   </Box>
        // </Paper>
        <Dashboard />
      )}
    </>
    // </PartnerLayout>
  );
};
