import connect from '../../../utils/connect';
import Redeem from '../../../models/redeem';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const redeems = await Redeem.find({});

                res.status(200).json({ success: true, data: redeems })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;        
        case 'POST':
            try {
                const redeem = await Redeem.create(req.body);

                res.status(201).json({ success: true, data: redeem })
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