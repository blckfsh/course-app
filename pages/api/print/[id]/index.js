import toFile from "data-uri-to-file";
import { jsPDF } from "jspdf";
import connect from '../../../../utils/connect';
import Print from '../../../../models/print';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            const course_id = req.query.id;
            const print = await Print.find({ course_id });
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "in",
                // format: [8, 5]
            });

            toFile(print[0].uri).then(file => {
                // console.log(file.mimeType, file.data, file.extension);
                doc.addImage(`${file.data}.${file.extension}`, "PNG", 1, 1, 10, 6);
                doc.save("./public/certificates/certificate.pdf");
            });
            break;
        case 'POST':
                try {
                    const print = await Print.create(req.body);
    
                    res.status(201).json({ success: true, data: print })
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
