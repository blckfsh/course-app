import connect from '../../../../utils/connect';
import User from '../../../../models/user';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const email = req.query.email;
                const user = await User.find({ email });

                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(404).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const email = req.query.email;
                const findId = await User.find({ email });
                const id = findId[0]._id.toString();

                if (!findId) return res.status(404).json({ message: "No Data Found" });
                const updatedUser = await User.updateOne({ _id: id }, { $set: req.body });
                res.status(201).json({ success: true, data: updatedUser })
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