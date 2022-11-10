import connect from '../../../utils/connect';
import Print from '../../../models/print';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'POST':
                try {
                    const print = await Print.create(req.body);
    
                    res.status(201).json({ success: true, data: print })
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
