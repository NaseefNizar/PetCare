import Stripe from "stripe";
import env from "dotenv";
import Partner from "../model/PartnerModel.js";
import Appointment from "../model/appointmentModel.js";
env.config();
const endpointSecret = "whsec_d2783696d74f07822eb654923e6995c80f4489bcb2bb1d49cb21c65f955aefdb";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
    typescript: true,
});
export const createPaymentIntent = async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const { items } = req.body;
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.id,
        },
    });
    const customerID = customer.id;
    async function calculateOrderAmount(id) {
        console.log("p", id);
        const data = await Partner.findById({ _id: id })
            .select("onlineconsultationfee");
        // .populate("kycDataId", "onlineconsultationfee");
        const fees = data?.onlineconsultationfee;
        console.log(data);
        return fees;
    }
    const fees = await calculateOrderAmount(req.body.partnerId);
    const amount = Number(fees);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        customer: customerID,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            orderDetails: JSON.stringify(data),
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
//Stripe webhook
export const webhook = async (req, res) => {
    // let event = req.rawBody; //as abhijith told
    let data;
    let eventType;
    let rawBody = req.rawBody;
    if (endpointSecret && rawBody) {
        let event;
        const signature = req.headers["stripe-signature"];
        // console.log("signature", req.body.data.object);
        try {
            event = stripe.webhooks.constructEvent(rawBody.toString(), signature, endpointSecret);
            console.log("webhook verified");
        }
        catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return res.sendStatus(400);
        }
        data = event.data.object;
        eventType = event.type;
        // console.log('id',event.data.object.metadata.userId);
        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntent = event.data.object;
                const customer = await stripe.customers.retrieve(paymentIntent.customer);
                // console.log(customer.metadata.userId);
                // const orderDetails = JSON.parse(paymentIntent.metadata.orderDetails);
                // console.log(orderDetails);
                // console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                // const appointment = new Appointment({
                //   userId: customer.metadata.userId as string,
                //   ...orderDetails,
                // });
                // await appointment.save();
                // const updateSlot = await Partner.updateOne(
                //   {
                //     "availableSlots.slots.time": appointment.slot,
                //   },
                //   {
                //     $set: { "availableSlots.$[outer].slots.$[inner].status": true },
                //   },
                //   {
                //     arrayFilters: [
                //       { "outer.date": { $exists: true } },
                //       { "inner.time": appointment.slot },
                //     ],
                //   }
                // );
                if (customer.object === "customer") {
                    const customerData = customer;
                    console.log(customerData.metadata.userId);
                    const orderDetails = JSON.parse(paymentIntent.metadata.orderDetails);
                    console.log(orderDetails);
                    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
                    const appointment = new Appointment({
                        userId: customerData.metadata.userId,
                        ...orderDetails,
                    });
                    await appointment.save();
                    const updateSlot = await Partner.updateOne({
                        "availableSlots.slots.time": appointment.slot,
                    }, {
                        $set: { "availableSlots.$[outer].slots.$[inner].status": true },
                    }, {
                        arrayFilters: [
                            { "outer.date": { $exists: true } },
                            { "inner.time": appointment.slot },
                        ],
                    });
                }
                else {
                    console.log("Not a customer object");
                    // Handle the case where it's not a customer object
                }
                break;
            case "payment_method.attached":
                // const paymentMethod = event.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }
        // Return a 200 res to acknowledge receipt of the event
        res.send().end();
    }
};
//# sourceMappingURL=paymentController.js.map