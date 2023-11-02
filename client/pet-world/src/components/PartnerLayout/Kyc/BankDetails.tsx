import { Grid, TextField, Paper, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { setKycData } from "../../../redux/features/partnerSlice";

type FormValues = {
  bankName: string,
  branchName: string,
  accountHolderName: string,
  accountNumber: string,
  ifsc:string
}

export const BankDetails = () => {

  const form = useForm<FormValues>({
    mode:'onTouched'
  })
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const dispatch = useAppDispatch()

   const onSubmit = (data: FormValues) => {
    console.log(data);
    dispatch(setKycData(data));
  };


  return (
    <Paper sx={{ margin: "10px", padding: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item>
          <TextField
            label="Bank Name"
            // name="bankName"
            // value={updatedUserDetails.firstName}
            // onChange={handleChange}
            {...register("bankName", {
                required: "Bank Name is required",
              })}
              error={!!errors.bankName}
              helperText={errors.bankName?.message}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Branch Name"
            // value={updatedUserDetails.firstName}
            // onChange={handleChange}
            {...register("branchName", {
                required: "Branch Name is required",
              })}
              error={!!errors.branchName}
              helperText={errors.branchName?.message}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Account Holder Name"
            // value={updatedUserDetails.firstName}
            // onChange={handleChange}
            {...register("accountHolderName", {
                required: "Account Holder Name is required",
              })}
              error={!!errors.accountHolderName}
              helperText={errors.accountHolderName?.message}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Account Number"
            {...register("accountNumber", {
                required: "Account Number is required",
              })}
              error={!!errors.accountNumber}
              helperText={errors.accountNumber?.message}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Re-enter account Number"
            name="re-enteraccountNumber"
            // value={updatedUserDetails.firstName}
            // onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            label="IFSC"
            {...register("ifsc", {
                required: "IFSC is required",
              })}
              error={!!errors.ifsc}
              helperText={errors.ifsc?.message}
            fullWidth
            margin="dense"
          />
        </Grid>
      </Grid>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button type="submit">Save</Button>
      </Box>
      </form>
    </Paper>
  );
};
