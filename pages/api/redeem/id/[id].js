import sendgrid from "@sendgrid/mail";
import connect from "../../../../utils/connect";
import Redeem from '../../../../models/redeem';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {        
        case 'PATCH':
            try {
                const id = req.query.id;
                const findId = await Redeem.find({ _id: id });

                if (!findId) return res.status(404).json({ message: "No Data Found" });
                const updatedRedeem = await Redeem.updateOne({ _id: id }, { $set: req.body });

                res.status(201).json({ success: true, data: updatedRedeem })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}