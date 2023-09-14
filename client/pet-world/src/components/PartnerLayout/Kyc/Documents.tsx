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
import { useRef, useState } from "react";
import { kycDocUpload, setKycData } from "../../../redux/features/kycSlice";
import { useDispatch } from "react-redux";

type Data  = {
  poi: FileList,
  poq: FileList,
  photo: FileList
}

type Props = {
  sendData:(data) => void
}

export const Documents = ({sendData}:Props) => {

  const [doc, setDoc] = useState<FormData | null | undefined>(null)
  const form = useForm<Data>({
    mode: "onTouched",
  });
  const dispatch = useDispatch()
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const onSubmit = (data: Data) => {
    console.log('hdsfdj',data);
    
    const formData = new FormData();
    formData.append('poi',data.poi[0])
    formData.append('poq',data.poq[0])
    formData.append('photo',data.photo[0])

    console.log(data);
    
    console.log(formData);
    
    console.log(formData.get('poi'));
    // dispatch(kycDocUpload(formData))
    // dispatch(setKycData(formData))
    // setDoc(formData)
    sendData(data)
    // console.log('doc',doc);
    
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
            <Grid item>
              <Typography
                sx={{ color: "#2196F3", cursor: "pointer" }}
                onClick={() => ref3.current?.click()}
              >
                + Upload your photo
              </Typography>
              {/* <p>{errors.file?.message}</p> */}
            <div>
              <Controller
                name="photo"
                control={control}
                // defaultValue={null}
                rules={{ validate: validateFile }}
                render={({ field }) => (
                  <input
                    type="file"
                    ref={ref3}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                )}
              />
              {errors.photo && <p style={{color:'#FF0000'}}>{errors.photo.message}</p>}
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
