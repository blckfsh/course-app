import connect from '../../../../../utils/connect';
import User from '../../../../../models/user';

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const role = req.query.role;
                const users = await User.find({ role });

                res.status(200).json({ success: true, data: users })
            } catch (error) {                
                console.log(error);
                res.status(404).json({ success: false });
            }
            break;        
    }
}