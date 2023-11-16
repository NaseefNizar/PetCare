import Partner from "../model/PartnerModel.js";
// import { log } from "console";
export const getVetList = async (req, res) => {
    try {
        const vetList = await Partner.find({ role: "Vet", is_verified: true });
        console.log(vetList);
        res.status(200).json({ vetList });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting data" });
    }
};
export const getIndividualPartnerData = async (req, res) => {
    try {
        const { partnerId } = req.body;
        console.log(partnerId);
        const partnerData = await Partner.findById(partnerId);
        console.log(partnerData);
        res.status(200).json({ partnerData });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting Data" });
    }
};
export const search = async (req, res) => {
    try {
        const { search } = req.query;
        const searchList = await Partner.find({
            $or: [
                { firstName: { $regex: new RegExp(search, 'i') } },
                { area: { $regex: new RegExp(search, 'i') } }
            ],
        });
        res.status(200).json({ searchList });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting Data" });
    }
};
//# sourceMappingURL=generalController.js.map