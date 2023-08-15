import { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Container,
  Typography,
  Avatar,
  Input,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getData } from "../../redux/features/userSlice";

const states = [
  {
    value: "select state",
    label: "Select",
  },
  {
    value: "andhra-pradesh",
    label: "Andhra Pradesh",
  },
  {
    value: "arunachal-pradesh",
    label: "Arunachal Pradesh",
  },
  {
    value: "assam",
    label: "Assam",
  },
  {
    value: "bihar",
    label: "Bihar",
  },
  {
    value: "chhattisgarh",
    label: "Chhattisgarh",
  },
  {
    value: "goa",
    label: "Goa",
  },
  {
    value: "gujarat",
    label: "Gujarat",
  },
  {
    value: "haryana",
    label: "Haryana",
  },
  {
    value: "himachal-pradesh",
    label: "Himachal Pradesh",
  },
  {
    value: "jharkhand",
    label: "Jharkhand",
  },
  {
    value: "karnataka",
    label: "Karnataka",
  },
  {
    value: "kerala",
    label: "Kerala",
  },
  {
    value: "madhya-pradesh",
    label: "Madhya Pradesh",
  },
  {
    value: "maharashtra",
    label: "Maharashtra",
  },
  {
    value: "manipur",
    label: "Manipur",
  },
  {
    value: "meghalaya",
    label: "Meghalaya",
  },
  {
    value: "mizoram",
    label: "Mizoram",
  },
  {
    value: "nagaland",
    label: "Nagaland",
  },
  {
    value: "odisha",
    label: "Odisha",
  },
  {
    value: "punjab",
    label: "Punjab",
  },
  {
    value: "rajasthan",
    label: "Rajasthan",
  },
  {
    value: "sikkim",
    label: "Sikkim",
  },
  {
    value: "tamil-nadu",
    label: "Tamil Nadu",
  },
  {
    value: "telangana",
    label: "Telangana",
  },
  {
    value: "tripura",
    label: "Tripura",
  },
  {
    value: "uttar-pradesh",
    label: "Uttar Pradesh",
  },
  {
    value: "uttarakhand",
    label: "Uttarakhand",
  },
  {
    value: "west-bengal",
    label: "West Bengal",
  },
];

// Usage example:
// states.forEach(state => {
//   console.log(`Value: ${state.value}, Label: ${state.label}`);
// });

export const UserProfile = () => {
  let user;
  const userString: string | null = localStorage.getItem("user");
  if (userString !== null) {
    user = JSON.parse(userString);
  }

  const dispatch = useDispatch()

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.ChangeEvent<FormDataEvent>) => {
      event.preventDefault();
    },
    []
  );

  useEffect(() => {
    dispatch(getData())
  },[])

  return (
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
                        {user.email} {user.country}
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
                <form
                  autoComplete="off"
                  noValidate
                  //   onSubmit={handleSubmit}
                >
                  <Card>
                    <CardHeader
                      subheader="The information can be edited"
                      title="Profile"
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              helperText="Please specify the first name"
                              label="First name"
                              name="firstName"
                              onChange={handleChange}
                              required
                              value={user.name}
                            />
                            {/* <Input
        placeholder="Enter text"
        disableUnderline // This removes the default underline/border
        fullWidth */}
                            {/* /> */}
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Last name"
                              name="lastName"
                              onChange={handleChange}
                              required
                              // value={values.lastName}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              onChange={handleChange}
                              required
                              value={user.email}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Phone Number"
                              name="phone"
                              onChange={handleChange}
                              type="number"
                              value={user.contactNumber}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Country"
                              name="country"
                              onChange={handleChange}
                              required
                              // value={values.country}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Select State"
                              name="state"
                              onChange={handleChange}
                              required
                              select
                              // defaultValue={'select state'}
                              SelectProps={{ native: true }}
                              // value={values.state}
                            >
                              {states.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button variant="contained">Save details</Button>
                    </CardActions>
                  </Card>
                </form>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};
