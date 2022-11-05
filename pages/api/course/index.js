import connect from '../../../utils/connect';
import Course from '../../../models/course';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const courses = await Course.find({});

                res.status(200).json({ success: true, data: courses })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;                
        default:
            res.status(400).json({ success: false });
            break;
    }
}