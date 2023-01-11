import sendgrid from "@sendgrid/mail";
import connect from '../../../../utils/connect';
import Code from '../../../../models/code';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const code = req.query.code;
                const data = await Code.find({ code });

                res.status(200).json({ success: true, content: data })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false, error: error });
            }
            break;
        case 'POST':
            try {
                // console.log(req.body);
                const code = await Code.create(req.body);

                // send the email
                sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
                const msg = {
                    to: req.body.email,
                    from: process.env.NEXT_PUBLIC_DOMAIN_FROM,
                    subject: 'Your Verification Code - Reset Password',
                    text: `
                        Good day,
                        Thank you for signing up to SynTechNX, here is you access code ${req.body.code} to the portal.
                        If you have any problems accessing the course, please contact admin (admin@syntechnx.com)
                        Kind Regards,
                        Admin
                    `,
                    html: `
                        <p>Good day,</p>
                        <p>Thank you for signing up to SynTechNX, here is you access code ${req.body.code} to the portal.</p>
                        <p>If you have any problems accessing the course, please contact admin (admin@syntechnx.com)</p><br />
                        <p>Kind Regards,</p>
                        <p>Admin</p>
                    `
                }

                // Disable muna
                await sendgrid.send(msg).catch(error => console.log(error));

                res.status(201).json({ success: true, code })
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const code = req.query.code;
                const findId = await Code.find({ code });
                const id = findId[0]._id.toString();

                if (!findId) return res.status(404).json({ message: "No Data Found" });
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