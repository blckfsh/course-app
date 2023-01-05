import connect from '../../../../../utils/connect';
import Certificate from '../../../../../models/certificate';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const email = req.query.email;
                const course_id = req.query.id;
                const certificate = await Certificate.find({ email, course_id });

                res.status(200).json({ success: true, data: certificate })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;               
        default:            
            res.status(400).json({ success: false });
            break;
    }
}