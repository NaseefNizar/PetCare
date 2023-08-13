import {
  Paper,
  Box,
  Grid,
  Stack,
  Button,
  Avatar,
  Typography,
  Divider,
  CardActions,
  Card,
  Container,
  CardContent,
  TextField,
} from "@mui/material";
import { AccountProfileDetails } from "./AccountProfileDetails";

export const UserProfile = () => {
  let user;
  const userString: string | null = localStorage.getItem("user");
  if (userString !== null) {
    user = JSON.parse(userString);
  }
  console.log(user);

  return (
    // <Box>
    //   <Card>
    //     <CardContent>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Stack spacing={2}>
    //           <Avatar sx={{ width: 130, height: 130 }} />
    //           <Stack direction={"row"} spacing={2}>
    //             <Typography variant="h6" fontWeight="bold">
    //               UserName
    //             </Typography>
    //             <Typography variant="h6">{user?.name}</Typography>
    //           </Stack>
    //           <Stack direction={"row"} spacing={2}>
    //             <Typography variant="h6" fontWeight="bold">
    //               Email
    //             </Typography>
    //             <Typography variant="h6">{user?.email}</Typography>
    //           </Stack>
    //         </Stack>
    //       </Box>
    //     </CardContent>
    //   </Card>
    // </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4"></Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={user.avatar}
                        sx={{
                          height: 80,
                          mb: 2,
                          width: 80,
                        }}
                      />
                      <Typography gutterBottom variant="h5">
                        {user.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {user.city} {user.country}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {user.timezone}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button fullWidth variant="text">
                      Upload picture
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <AccountProfileDetails />
                
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};
