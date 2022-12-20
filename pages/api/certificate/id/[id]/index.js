import connect from '../../../../../utils/connect';
import Certificate from '../../../../../models/certificate';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const id = req.query.id;
                const certificate = await Certificate.find({ id });

                res.status(200).json({ success: true, data: certificate })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;   
        case 'PATCH':
            try {
                const id = req.query.id;
                const findId = await Certificate.find({ id });

                if (!findId) return res.status(404).json({ message: "No Data Found" });
                const updatedCertificate = await Certificate.updateOne({ _id: id }, { $set: req.body });

                res.status(201).json({ success: true, data: updatedCertificate })
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