import connect from '../../../../utils/connect';
import Redeem from '../../../../models/redeem';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const user_id = req.query.user_id;
                const redeem = await Redeem.find({ user_id });

                res.status(200).json({ success: true, data: redeem })
            } catch (error) {
                res.status(404).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const user_id = req.query.user_id;
                const findId = await Redeem.find({ user_id });
                const id = findId[0]._id.toString();

                if (!findId) return res.status(404).json({ message: "No Data Found" });
                const updatedRedeem = await Redeem.updateOne({_id: id}, {$set: req.body});
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