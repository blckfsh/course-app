import connect from '../../../../utils/connect';
import Redeem from '../../../../models/redeem';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const user_id = req.query.user_id;
                const redeems = await Redeem.find({ user_id });

                res.status(200).json({ success: true, data: redeems })
            } catch (error) {
                res.status(404).json({ success: false });
            }
            break;        
        default:
            res.status(400).json({ success: false });
            break;
    }
}