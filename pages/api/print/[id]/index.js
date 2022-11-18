import toFile from "data-uri-to-file";
import { jsPDF } from "jspdf";
import connect from "../../../../utils/connect";
import Print from "../../../../models/print";
import Certificate from "../../../../models/certificate";

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const course_id = req.query.id;
                const print = await Print.find({ course_id });
                const certificate = await Certificate.find({ _id: course_id });
                const pdfName = `${certificate[0].name.replace(" ", "_")}-${certificate[0].cert_title.replace(" ", "_")}`;
                const doc = new jsPDF({
                    orientation: "landscape",
                    unit: "in",
                });

                toFile(print[0].uri).then(file => {
                    // console.log(file.mimeType, file.data, file.extension);                    
                    doc.addImage(`${file.data}.${file.extension}`, "PNG", 1, 1, 10, 6);
                    doc.save(`./public/certificates/${pdfName}.pdf`);
                });

                res.status(201).json({ success: true, dest: `/certificates/${pdfName}.pdf` })
            } catch (error) {
                res.status(400).json({ success: false });
            }
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
        case 'DELETE':
            try {
                const course_id = req.query.id;
                const print = await Print.deleteOne({course_id});

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
