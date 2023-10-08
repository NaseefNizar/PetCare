import Partner from '../model/PartnerModel.js';
export const getVetList = async (req, res) => {
    try {
        const vetList = await Partner.find({ role: 'Vet', is_verified: true }).populate('kycDataId');
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
        const partnerData = await Partner.findById(partnerId).populate('kycDataId');
        res.status(200).json({ partnerData });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting Data" });
    }
};
//# sourceMappingURL=generalController.js.map