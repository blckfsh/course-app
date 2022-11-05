import connect from '../../../../utils/connect';
import Certificate from '../../../../models/certificate';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const email = req.query.email;
                const certificates = await Certificate.find({ email });

                res.status(200).json({ success: true, data: certificates })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;                
        default:
            res.status(400).json({ success: false });
            break;
    }
}