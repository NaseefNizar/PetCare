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
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateContact } from "../redux/features/userSlice";

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
  otp: string;
};

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedDetails: UserDetails) => void;
}

export const OtpModal = ({ open, onClose }: UpdateDialogProps) => {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const dispatch = useAppDispatch();
  const contactNumber = useAppSelector((state) => state.user.phoneNumber);

  const handleUpdate = (otp: FormValues) => {
    dispatch(updateContact({ ...otp, contactNumber }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleUpdate)} noValidate>
        <DialogTitle>OTP VERIFICATION</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item lg={12}>
              <TextField
                label="OTP"
                margin="dense"
                fullWidth
                size="small"
                {...register("otp", {
                  required: "Enter 6 digit otp sent to your number",
                })}
                error={!!errors.otp}
                helperText={errors.otp?.message}
              />
            </Grid>
            <Grid item lg={12}>
              <Stack
                direction={"row"}
                sx={{ display: "flex", justifyContent: "space-between" }}
                spacing={2}
              >
                <Button variant="contained" color="error" onClick={onClose}>
                  cancel
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Update
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};
