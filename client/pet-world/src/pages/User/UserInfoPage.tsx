import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  // Box,
  Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardHeader,
  // Divider,
  Typography,
  Grid,
  Paper,
  TextField,
  Skeleton,
  Stack,
} from "@mui/material";
// import { CloudUpload, PhotoCamera } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
import {
  getData,
  otp,
  setPhoneNumber,
  // updateProfilePic,
  updateUser,
} from "../../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
// import { ProfileEdit } from "../../components/User/ProfileEdit";
import { OtpModal } from "../../components/OtpModal";

type UserData = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contactNumber: string;
  picture?: string;
  role: string;
  _id: string;
  __v: number;
};

export const UserInfoPage = () => {
  // let user:any;
  // const userString: string | null = localStorage.getItem("user");
  // if (userString !== null) {
  //   user = JSON.parse(userString);
  // }

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const userData = userState?.userData;
  const blockStat = userState.blockStat;

  type FormValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    contactNumber?: string;
  };
  // interface FormValues {
  //   fieldLabel1: string;
  // }
  // interface FormValues {
  //   [key: string]: string;
  // }

  const handleUpdate = (updatedDetails: UserData) => {
    // console.log("axiosupdate", updatedDetails);
    dispatch(updateUser(updatedDetails));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);
  //     dispatch(updateProfilePic(formData));
  //   }
  // };

  useEffect(() => {
    dispatch(getData());
  }, [userState.successMessage]);
  useEffect(() => {
    blockStat && navigate("/login");
  }, [blockStat]);

  // interface CustomTextFieldProps {
  //   disabled: boolean;
  //   labelText: string;
  //   defaultValue1: string;
  //   defaultValue2?: string;
  //   showTextField?: boolean;
  //   fieldLabel1?: string;
  //   fieldLabel2?: string;
  // }

  const nameForm = useForm<FormValues>();
  const emailForm = useForm<FormValues>();
  const contactNumberForm = useForm<FormValues>();
  // const { register, handleSubmit, formState } = form;
  // const { errors } = formState;

  const [isPersonalDisabled, setIsPersonalDisabled] = useState<boolean>(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true);
  const [isContactNumDisabled, setIsContactNumDisabled] =
    useState<boolean>(true);
  // const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleSave = (updatedDetails: FormValues) => {
    // console.log("axiosupdate", updatedDetails);
    dispatch(updateUser(updatedDetails));
  };
  const handleEmailUpdate = (updatedDetails: FormValues) => {
    // console.log("axiosupdate", updatedDetails);
    dispatch(updateUser(updatedDetails));
  };

  const handleContactNumUpdate = (updatedDetails: FormValues) => {
    dispatch(setPhoneNumber(updatedDetails.contactNumber));
    dispatch(otp(updatedDetails));
    setOpenDialog(true);
  };

  const togglePersonalDisabled = () => {
    setIsPersonalDisabled(!isPersonalDisabled);
  };
  const toggleEmailDisabled = () => {
    setIsEmailDisabled(!isEmailDisabled);
  };
  const toggleContactNumDisabled = () => {
    setIsContactNumDisabled(!isContactNumDisabled);
  };
  // const Heading: React.FC<CustomTextFieldProps> = ({
  //   disabled,
  //   labelText,
  //   defaultValue1,
  //   defaultValue2,
  //   showTextField = false,
  //   fieldLabel1,
  //   fieldLabel2,
  // }) => {

  //   const form = useForm<FormValues>();
  //   const { register, handleSubmit, formState } = form;
  //   const { errors } = formState;

  //   const [isDisabled, setIsDisabled] = useState<boolean>(disabled);

  //   const handleSave = (updatedDetails:FormValues) => {
  //     console.log("axiosupdate", updatedDetails);
  //     dispatch(updateUser(updatedDetails));
  //   };

  //   const toggleDisabled = () => {
  //     setIsDisabled(!isDisabled);
  //   };

  //   return (
  //     <>
  //       <Grid item container lg={12} spacing={2}>
  //         <Grid item>
  //           {" "}
  //           <Typography onClick={toggleDisabled}>{labelText}</Typography>
  //         </Grid>
  //         <Grid item>
  //           {" "}
  //           <Typography
  //             onClick={toggleDisabled}
  //             color={"primary"}
  //             sx={{ cursor: "pointer" }}
  //           >
  //             {isDisabled ? "Edit" : "Cancel"}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //       <Grid item>
  //         <form onSubmit={handleSubmit(handleSave)} noValidate>
  //           <Grid item container spacing={2}>
  //             <Grid item>
  //               {fieldLabel1 && (
  //                 <TextField
  //                   size="small"
  //                   label={fieldLabel1}
  //                   defaultValue={defaultValue1}
  //                   disabled={isDisabled}
  //                   fullWidth
  //                   // name={fieldLabel1}
  //                   {...register(fieldLabel1, { required: "Enter your name" })}
  //                   error={!!errors.fieldLabel1}
  //                   helperText={errors.fieldLabel1?.message}
  //                 ></TextField>
  //               )}
  //             </Grid>
  //             {showTextField && (
  //               <Grid item>
  //               {fieldLabel2 && (
  //                 <TextField
  //                   size="small"
  //                   label={fieldLabel2}
  //                   defaultValue={defaultValue2}
  //                   disabled={isDisabled}
  //                   fullWidth
  //                   {...register(fieldLabel2, { required: "Enter your name" })}
  //                   error={!!errors.fieldLabel2}
  //                   helperText={errors.fieldLabel2?.message}
  //                 ></TextField>
  //                 )}

  //               </Grid>
  //             )}
  //             <Grid item>
  //               {!isDisabled && (
  //                 <Button variant="contained" color="secondary" type="submit">
  //                   save
  //                 </Button>
  //               )}
  //             </Grid>
  //           </Grid>
  //         </form>
  //       </Grid>
  //     </>
  //   );
  // };

  return (
    <>
      {/* <form autoComplete="off" noValidate> */}
      {/* <Card>
          <CardHeader title="Profile Info" />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3} p={4}>
                <Grid xs={12} md={6}>
                  <Typography gutterBottom variant="h6">
                    First Name : {userData?.firstName}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography gutterBottom variant="h6">
                    Last Name : {userData?.lastName}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography gutterBottom variant="h6">
                    Email : {userData?.email}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid xs={12} md={6}>
                  <Typography gutterBottom variant="h6">
                    PH : {userData?.contactNumber}
                  </Typography>
                  <Divider />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenDialog(true)}
            >
              Edit
            </Button>
          </CardActions>
        </Card> */}
      {/* </form> */}

      <Paper sx={{ p: "30px" }}>
        <Grid container spacing={4} direction={"row"}>
          {!userData ? (
            <Grid item lg={12}>
              <Skeleton animation="wave" />
            </Grid>
          ) : (
            <>
              {/* <Heading
                disabled={true}
                labelText="Personal Information"
                defaultValue1={userData.firstName}
                defaultValue2={userData.lastName}
                showTextField={true}
                fieldLabel1="FirstName"
                fieldLabel2="LastName"
              />
              <Heading
                disabled={true}
                labelText="Email"
                defaultValue1={userData.email}
                fieldLabel1="Email"
              />
              <Heading
                disabled={true}
                labelText="Mobile Number"
                defaultValue1={userData.contactNumber}
                fieldLabel1="Mobile Number"
              /> */}
              <Grid item container lg={12} spacing={2}>
                <Grid item>
                  {" "}
                  <Typography>Personal Information</Typography>
                </Grid>
                <Grid item>
                  {" "}
                  <Typography
                    onClick={togglePersonalDisabled}
                    color={"primary"}
                    sx={{ cursor: "pointer" }}
                  >
                    {isPersonalDisabled ? "Edit" : "Cancel"}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item container spacing={2}> */}
              <Grid item>
                {/* <Grid item> */}
                <form onSubmit={nameForm.handleSubmit(handleSave)}>
                  <Stack spacing={2} direction="row">
                    <TextField
                      size="small"
                      label="FirstName"
                      defaultValue={userData?.firstName}
                      disabled={isPersonalDisabled}
                      {...nameForm.register("firstName", {
                        required: "Enter your first name",
                      })}
                      error={!!nameForm.formState.errors.firstName}
                      helperText={nameForm.formState.errors.firstName?.message}
                    ></TextField>
                    {/* </Grid> */}
                    {/* <Grid item> */}
                    <TextField
                      size="small"
                      label="LastName"
                      defaultValue={userData?.lastName}
                      disabled={isPersonalDisabled}
                      {...nameForm.register("lastName", {
                        required: "Enter your last name",
                      })}
                      error={!!nameForm.formState.errors.lastName}
                      helperText={nameForm.formState.errors.lastName?.message}
                    ></TextField>
                    {!isPersonalDisabled && (
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        save
                      </Button>
                    )}
                  </Stack>
                </form>

                {/* </Grid> */}
              </Grid>
              <Grid item container lg={12} spacing={2}>
                <Grid item>
                  {" "}
                  <Typography>Email</Typography>
                </Grid>
                <Grid item>
                  {" "}
                  <Typography
                    onClick={toggleEmailDisabled}
                    color={"primary"}
                    sx={{ cursor: "pointer" }}
                  >
                    {isEmailDisabled ? "Edit" : "Cancel"}
                  </Typography>
                </Grid>{" "}
              </Grid>
              <Grid item>
                {/* <Grid item> */}
                <form onSubmit={emailForm.handleSubmit(handleEmailUpdate)}>
                  <Stack spacing={2} direction="row">
                    <TextField
                      size="small"
                      label="email"
                      defaultValue={userData?.email}
                      disabled={isEmailDisabled}
                      fullWidth
                      {...emailForm.register("email", {
                        required: "Enter your email",
                      })}
                      error={!!emailForm.formState.errors.email}
                      helperText={emailForm.formState.errors.email?.message}
                    ></TextField>
                    {/* </Grid> */}
                    {/* <Grid item> */}
                    {!isEmailDisabled && (
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        save
                      </Button>
                    )}
                  </Stack>
                </form>
                {/* </Grid> */}
              </Grid>
              <Grid item container lg={12} spacing={2}>
                <Grid item>
                  {" "}
                  <Typography>Mobile Number</Typography>
                </Grid>
                <Grid item>
                  {" "}
                  <Typography
                    color={"primary"}
                    sx={{ cursor: "pointer" }}
                    onClick={toggleContactNumDisabled}
                  >
                    {isContactNumDisabled ? "Edit" : "cancel"}
                  </Typography>
                </Grid>{" "}
              </Grid>
              <Grid item>
                {/* <Grid item> */}
                <form
                  onSubmit={contactNumberForm.handleSubmit(
                    handleContactNumUpdate
                  )}
                  noValidate
                >
                  <Stack direction={"row"} spacing={2}>
                    <TextField
                      size="small"
                      label="Mobile number"
                      defaultValue={userData?.contactNumber}
                      disabled={isContactNumDisabled}
                      fullWidth
                      {...contactNumberForm.register("contactNumber", {
                        required: "Enter your valid 10 digit number",
                      })}
                      error={!!contactNumberForm.formState.errors.contactNumber}
                      helperText={
                        contactNumberForm.formState.errors.contactNumber
                          ?.message
                      }
                    ></TextField>
                    {!isContactNumDisabled && (
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        save
                      </Button>
                    )}
                  </Stack>
                </form>
                {/* </Grid> */}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      {/* {userData && (
        <ProfileEdit
          open={openDialog}
          userDetails={userData}
          onClose={() => setOpenDialog(false)}
          onUpdate={handleUpdate}
        />
      )} */}
      <OtpModal
        open={openDialog}
        onClose={() =>  {
          setOpenDialog(false);
          setIsContactNumDisabled(!isContactNumDisabled);
        }}
        onUpdate={handleUpdate}
      />
    </>
  );
};
