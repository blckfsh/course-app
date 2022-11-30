import connect from '../../../../utils/connect';
import Course from '../../../../models/course';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const id = req.query.id;
                const course = await Course.find({ id });

                res.status(200).json({ success: true, data: course })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const id = req.query.id;
                const findId = await Course.find({ id });

                if (!findId) return res.status(404).json({ message: "No Data Found" });
                const updatedCourse = await Course.updateOne({ _id: id }, { $set: req.body });

                console.log(updatedCourse);

                res.status(201).json({ success: true, data: updatedCourse })
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