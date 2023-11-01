import pkg from "twilio";
const { Twilio } = pkg;
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
// if (!TWILIO_SERVICE_SID || !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
//   throw new Error("Twilio environment variables are not defined.");
// }
const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
export const sendOTP = async (req, res
//   next: NextFunction
) => {
    try {
        const { contactNumber } = req.body;
        console.log(req.body);
        const otpResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verifications.create({
            to: `+91${contactNumber}`,
            channel: "sms",
        });
        console.log(otpResponse);
        res.status(200).json({ message: "otp send successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Something went wrong" });
    }
};
export const verifyOTP = async (req, res, next) => {
    const { contactNumber, otp } = req.body;
    console.log(contactNumber, otp);
    try {
        const verifiedResponse = await client.verify.v2
            .services(TWILIO_SERVICE_SID)
            .verificationChecks.create({
            to: `+91${contactNumber}`,
            code: otp,
        });
        // res.status(200).json({message:"otp verified successfully"})
        if (verifiedResponse.status === "approved") {
            console.log("verified");
            next();
        }
        else {
            res.status(409).json({ message: "Invalid OTP" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Invalid OTP" });
    }
};
//# sourceMappingURL=otp.js.map