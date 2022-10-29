import connect from '../../../../utils/connect';
import User from '../../../../models/user';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const id = req.query.id;
                const user = await User.find({_id: id});

                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(404).json({ success: false });
            }
            break;        
    }
}