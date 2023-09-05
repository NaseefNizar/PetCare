import Partner from "../../model/PartnerModel.js";
export const partnerBlocked = async (req, res, next) => {
    try {
        const user = await Partner.findOne({ _id: req.id });
        if (user?.is_blocked) {
            return res.status(400).json({ message: "You are blocked" });
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=blocked.js.map