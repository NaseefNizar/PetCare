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
//# sourceMappingURL=listController.js.map