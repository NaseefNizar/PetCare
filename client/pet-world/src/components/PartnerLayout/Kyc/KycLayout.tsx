import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepButton from "@mui/material/StepButton";
import BasicDetails from "./BasicDetails";
import { BankDetails } from "./BankDetails";
import { Documents } from "./Documents";
import { PartnerKycPage } from "../../../pages/PartnerPage/PartnerKycPage";
import { kycUpdate } from "../../../redux/features/partnerSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { kycData } from "../../../types/kyc";

export default function KycLayout() {
  const [open, setOpen] = useState(false);
  const [doc, setDoc] = useState<FormData | null | undefined>(null);

  const dispatch = useAppDispatch();
  const kycData = useAppSelector((state) => state.vet.kycData);

  const getDoc = (data: FormData) => {
    setDoc(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const steps = ["Personal info", "Bank Details", "Document verification"];

  const content = (step: number) => {
    switch (step) {
      case 0:
        return <BasicDetails />;
      case 1:
        return <BankDetails />;
      case 2:
        return <Documents sendData={getDoc} />;
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const formData = new FormData();
    formData.append("poi", doc.poi[0]);
    formData.append("poq", doc.poq[0]);
    formData.append("photo", doc.photo[0]);
    console.log(kycData);

    // for (const key in kycData) {
    //   if (formData.hasOwnProperty(key)) {
    //     const value = kycData[key];
    //     console.log(value);

    //     formData.append(key, value);
    //   }
    // }
    formData.append("firstName", kycData?.firstName);
    formData.append("lastName", kycData?.lastName);
    formData.append("centreName", kycData?.centreName);
    formData.append("locality", kycData?.locality);
    formData.append("pincode", kycData?.pincode);
    formData.append("area", kycData?.area);
    formData.append("state", kycData?.state);
    formData.append("bankName", kycData?.bankName);
    formData.append("branchName", kycData?.branchName);
    formData.append("accountHolderName", kycData?.accountHolderName);
    formData.append("accountNumber", kycData?.accountNumber);
    formData.append("ifsc", kycData?.ifsc);
    formData.append("experience", kycData?.experience);
    formData.append("qualification", kycData?.qualification);
    formData.append("onlineconsultationfee", kycData?.onlineconsultationfee);
    formData.append("offlineconsultationfee", kycData?.offlineconsultationfee);

    dispatch(kycUpdate(formData));
    setOpen(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      <Button
        // component={Link}
        // to="/partner/kyc"
        variant="contained"
        onClick={handleClickOpen}
        sx={{ mr: 1, width: "100%" }}
      >
        Click here for verification
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "center", mt: "20px" }}
        >
          Verify your account
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ margin: "30px" }}>
            Fill in the details to start providing your service
          </DialogContentText>
          <Box
          // sx={{ width: '100%' }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <>
              {/* {allStepsCompleted() ? (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </>
              ) : ( */}
              <>
                {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}> */}
                <Stack>
                  {/* Step {activeStep + 1} */}
                  {content(activeStep)}
                </Stack>
                {/* </Typography> */}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {/* <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button> */}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep !== steps.length - 1 && (
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button onClick={handleComplete}>Submit</Button>
                  )}
                </Box>
              </>
              {/* // )} */}
            </>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}
