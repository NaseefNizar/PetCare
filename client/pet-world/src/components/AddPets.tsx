import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Stack,
  Container,
} from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { addPetDetail } from "../redux/features/userSlice";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { updateContact } from "../redux/features/userSlice";

type FormValues = {
  petName: string;
  petKind: string;
  petBreed: string;
  petAge: number;
  petWeight: string;
};

export const AddPets = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch()
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    dispatch(addPetDetail(data))
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Add pet details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Add pet details</DialogTitle>
          <DialogContent>
            <Container>
              <Grid
                container
                spacing={2}
                // sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item container lg={12} spacing={2}>
                  <Grid item container spacing={2}>
                    <Grid item>
                      <TextField
                        label="Pet name"
                        margin="dense"
                        size="small"
                        {...register("petName", {
                          required: "Enter pet name",
                        })}
                        error={!!errors.petName}
                        helperText={errors.petName?.message}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Pet kind"
                        margin="dense"
                        size="small"
                        {...register("petKind", {
                          required: "Enter pet name",
                        })}
                        error={!!errors.petKind}
                        helperText={errors.petKind?.message}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Pet breed"
                        margin="dense"
                        size="small"
                        {...register("petBreed", {
                          required: "Enter pet name",
                        })}
                        error={!!errors.petBreed}
                        helperText={errors.petBreed?.message}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Pet age"
                        margin="dense"
                        size="small"
                        {...register("petAge", {
                          required: "Enter pet name",
                        })}
                        error={!!errors.petAge}
                        helperText={errors.petAge?.message}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Pet weight"
                        margin="dense"
                        size="small"
                        {...register("petWeight", {
                          required: "Enter pet name",
                        })}
                        error={!!errors.petWeight}
                        helperText={errors.petWeight?.message}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Stack
                    direction={"row"}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setOpen(false)}
                    >
                      cancel
                    </Button>
                    <Button type="submit" variant="contained" color="success">
                      save
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
