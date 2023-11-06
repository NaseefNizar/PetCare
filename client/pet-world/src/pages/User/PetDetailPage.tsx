import {  Typography, Paper, Grid } from "@mui/material";
import { AddPets } from "../../components/AddPets";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getPetDetail } from "../../redux/features/userSlice";



export const PetDetailPage = () => {

const dispatch = useAppDispatch()
const petDetails:[] = useAppSelector(state => state.user.petDetails)
console.log(petDetails);


useEffect(() => {
  dispatch(getPetDetail())
},[])

  return (
      <Paper sx={{ padding: "30px" }}>
        <Grid container spacing={2} direction={"row"} >
          <Grid item md={12} lg={12} sm={12} xs={6}>
            <Typography sx={{ fontSize: "20px" }}>
              <strong>Pet Details</strong>
            </Typography>
          </Grid>
              {petDetails.map( (pet: any) => (
          <Grid item lg={6} >
            <Paper sx={{ p: "10px" }}>
                <Grid item container key={pet._id} direction={'column'} spacing={1}>
                  <Grid item>
                    <Typography>Pet name : {pet.petName}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Pet Kind : {pet.petKind}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Pet Breed : {pet.petBreed}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Pet age : {pet.petAge} kg</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Pet weight : {pet.petWeight} years</Typography>
                  </Grid>
                </Grid>
            </Paper>
          </Grid>
              ))}

          <Grid item lg={12}>
            <AddPets />
          </Grid>
        </Grid>
      </Paper>
  );
};
