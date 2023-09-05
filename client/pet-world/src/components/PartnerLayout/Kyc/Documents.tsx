import {
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRef } from "react";
import { kycDocUpload, setKycData } from "../../../redux/features/kycSlice";
import { useDispatch } from "react-redux";

type FormData  = {
  poi: FileList,
  poq: FileList,
}



export const Documents = () => {
  const form = useForm<FormData>({
    mode: "onTouched",
  });
  const dispatch = useDispatch()
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('poi',data.poi[0])
    formData.append('poq',data.poq[0])

    console.log(data);
    
    console.log(formData);
    
    console.log(formData.get('image'));
    dispatch(kycDocUpload(formData))
    // dispatch(setKycData(formData))
  };


  const validateFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return 'File is required';
    }
    const file = fileList[0];
    if (file.size > 5242880) {
      return 'File size must be less than 5MB';
    }
    return true;
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
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} sx={{ margin: "10px" }}>
            <Grid item>
              {/* <TextField
            label="Proof of identity"
            name="poi"
            margin="dense"
            type="file"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Select file:</InputAdornment>
              ),
            }}
          /> */}
              <Typography sx={{ color: "#2196F3", cursor: "pointer" }}
                              onClick={() => ref1.current?.click()}
                              >
                + Upload Proof of Identity
              </Typography>
              <div>
              <Controller
                name="poi"
                control={control}
                // defaultValue={null}
                rules={{ validate: validateFile }}
                render={({ field }) => (
                  <input
                    type="file"
                    ref={ref1}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                )}
              />
              {errors.poi && <p style={{color:'#FF0000'}}>{errors.poi.message}</p>}
            </div>
            </Grid>
            <Grid item>
              <Typography
                sx={{ color: "#2196F3", cursor: "pointer" }}
                onClick={() => ref2.current?.click()}
              >
                + Upload Proof of Qualification
              </Typography>
              {/* <p>{errors.file?.message}</p> */}
            <div>
              <Controller
                name="poq"
                control={control}
                // defaultValue={null}
                rules={{ validate: validateFile }}
                render={({ field }) => (
                  <input
                    type="file"
                    ref={ref2}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                )}
              />
              {errors.poq && <p style={{color:'#FF0000'}}>{errors.poq.message}</p>}
            </div>
            </Grid>
          </Stack>
        </Grid>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button type="submit">Save</Button>
        </Box>
      </form>
    </Paper>
  );
};
