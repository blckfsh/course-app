import connect from '../../../utils/connect';
import Training from '../../../models/training';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const trainings = await Training.find({});

                res.status(200).json({ success: true, data: trainings })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;                
        default:
            res.status(400).json({ success: false });
            break;
    }
}