import connect from '../../../../../utils/connect';
import Code from '../../../../../models/code';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const email = req.query.email;
                const code = await Code.find({ email });

                res.status(200).json({ success: true, code })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const email = req.query.email;
                const findCode = await Code.find({ email });
                const id = findCode[0]._id.toString();

                if (!findCode) return res.status(404).json({ message: "No Data Found" });
                const updatedCode = await Code.updateOne({ _id: id }, { $set: req.body });
                res.status(201).json({ success: true, data: updatedCode })
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