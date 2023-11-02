// import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Stack,
} from "@mui/material";


type UserDetails = {
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

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
}

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  userDetails: UserDetails;
  onUpdate: (updatedDetails: UserDetails) => void;
}

export const ProfileEdit = ({
  open,
  onClose,
  // userDetails,
  onUpdate,
}: UpdateDialogProps) => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  // const [updatedUserDetails, setUpdatedUserDetails] =
  //   useState<UserDetails>(userDetails);
  // console.log("update", updatedUserDetails);



  const handleUpdate = (updatedUserDetails:any) => {
    // console.log(1);
    
    onUpdate(updatedUserDetails);
    onClose();
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setUpdatedUserDetails((prevDetails) => ({
  //     ...prevDetails,
  //     [name]: value,
  //   }));
  // };

  return (
    <Dialog open={open} onClose={onClose}>
          <form onSubmit={handleSubmit(handleUpdate)} noValidate>
      <DialogTitle>Update User Details</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={2}>
            <Grid item>
              <TextField
                label="FirstName"
                // name="firstName"
                // value={updatedUserDetails.firstName}
                // onChange={handleChange}
                //   fullWidth
                margin="dense"
                {...register("firstName", {
                  required: "Enter your name",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="LastName"
                // name="lastName"
                // value={updatedUserDetails.lastName}
                // onChange={handleChange}
                //   fullWidth
                margin="dense"
                {...register("lastName", {
                  required: "Enter your name",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                // name="email"
                // value={updatedUserDetails.email}
                // onChange={handleChange}
                //   fullWidth
                margin="dense"
                {...register("email", {
                  required: "Enter your name",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            {/* <Grid item>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={updatedUserDetails.contactNumber}
              onChange={handleChange}
              margin="dense"
            />
          </Grid> */}
            {/* <Grid item>
            <TextField
              label="House Name"
              name="housename"
              value={updatedUserDetails.contactNumber}
              onChange={handleChange}
              margin="dense"
            />
          </Grid> */}
        </Grid>
        <Stack
          direction={"row"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button type='submit' variant="contained" color="success">
            Update
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            cancel
          </Button>
        </Stack>
      </DialogContent>
      </form>

    </Dialog>
  );
};
