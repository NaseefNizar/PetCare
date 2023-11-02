import  { useState } from "react";
// import { useForm } from "react-hook-form";
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
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { updateContact } from "../redux/features/userSlice";

export const AddPets = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const form = useForm();
  // const { formState } = form;
  // const { errors } = formState;
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
        <form noValidate>
          <DialogTitle>Add pet details</DialogTitle>
          <DialogContent>
            <Container>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item container lg={12} spacing={2}>
                  <Grid item>
                    <TextField label="Pet name" margin="dense" size="small" />
                  </Grid>
                  <Grid item>
                    <TextField label="Pet kind" margin="dense" size="small" />
                  </Grid>
                  <Grid item>
                    <TextField label="Pet breed" margin="dense" size="small" />
                  </Grid>
                  <Grid item>
                    <TextField label="Pet age" margin="dense" size="small" />
                  </Grid>
                  <Grid item>
                    <TextField label="Pet weight" margin="dense" size="small" />
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
