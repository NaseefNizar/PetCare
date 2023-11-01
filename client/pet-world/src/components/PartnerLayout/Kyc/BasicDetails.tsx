import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { setKycData } from "../../../redux/features/partnerSlice";
import { useAppDispatch } from "../../../redux/hooks";

type FormValues = {
  firstName: string;
  lastName: string;
  qualification: string;
  experience: string;
  centreName: string;
  locality: string;
  area: string;
  pincode: string;
  state: string;
  onlineconsultationfee: string;
  offlineconsultationfee: string;
};

export default function BasicDetails() {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const form = useForm<FormValues>({
    mode: "onTouched",
  });
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const dispatch = useAppDispatch();

  // const formRef = useRef<HTMLFormElement>(null)

  const states = [
    {
      value: "select state",
      label: "Select",
    },
    {
      value: "Andhra Pradesh",
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <TextField
              label="First Name"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("firstName", {
                required: "First name is required",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Last Name"
              size="small"
              variant="filled"
              margin="dense"
              {...register("lastName", {
                required: "Last name is required",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Qualifications"
              size="small"
              variant="filled"
              margin="dense"
              {...register("qualification", {
                required: "Qualification is required",
              })}
              error={!!errors.qualification}
              helperText={errors.qualification?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Experience"
              size="small"
              variant="filled"
              margin="dense"
              {...register("experience", {
                required: "Qualification is required",
              })}
              error={!!errors.experience}
              helperText={errors.experience?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Centre Name"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("centreName", {
                required: "Centre name is required",
              })}
              error={!!errors.centreName}
              helperText={errors.centreName?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Locality"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("locality", {
                required: "Locality is required",
              })}
              error={!!errors.locality}
              helperText={errors.locality?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="City/District/Town"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("area", {
                required: "City/District/Town name is required",
              })}
              error={!!errors.area}
              helperText={errors.area?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Pincode"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter valid 6 digit number",
                },
              })}
              error={!!errors.pincode}
              helperText={errors.pincode?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Online consultation fee"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("onlineconsultationfee", {
                required: "Fees is required",
              })}
              error={!!errors.onlineconsultationfee}
              helperText={errors.onlineconsultationfee?.message}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Offline consultation fee"
              size="small"
              variant="filled"
              fullWidth
              margin="dense"
              {...register("offlineconsultationfee", {
                required: "Fees is required",
              })}
              error={!!errors.offlineconsultationfee}
              helperText={errors.offlineconsultationfee?.message}
            />
          </Grid>
          <Grid item>
            <Controller
              name="state"
              control={control}
              defaultValue={states[0].value}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <FormControl sx={{ width: "225px" }} error={!!errors.state}>
                  <InputLabel>Select State</InputLabel>
                  <Select
                    {...field}
                    fullWidth
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && (
                    <FormHelperText>{errors.state.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button type="submit">Save</Button>
        </Box>
      </form>
    </Paper>
  );
}
