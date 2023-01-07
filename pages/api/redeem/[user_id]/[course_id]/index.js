import sendgrid from "@sendgrid/mail";
import connect from '../../../../../utils/connect';
import Redeem from '../../../../../models/redeem';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const user_id = req.query.user_id;
                const course_id = req.query.course_id;

                console.log(user_id);
                console.log(course_id);
                const redeem = await Redeem.find({ user_id, course_id });

                res.status(200).json({ success: true, data: redeem })
            } catch (error) {
                res.status(404).json({ success: false });
            }
            break;
        case 'PATCH':
            try {
                const user_id = req.query.user_id;
                const course_id = req.query.course_id;
                const findId = await Redeem.find({ user_id, course_id });
                const id = findId[0]._id.toString();

                if (!findId) return res.status(404).json({ message: "No Data Found" });
                const updatedRedeem = await Redeem.updateOne({_id: id}, {$set: req.body});
                console.log(req.body.isExpired);

                // send the email
                sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
                let msg = {};
                if (req.body.isExpired == false) {
                    msg = {
                        to: req.body.email,
                        from: process.env.NEXT_PUBLIC_DOMAIN_FROM,
                        subject: 'Access Code for Course',
                        text: 'Code: ' + req.body.code,
                        html: `<p>Code: ${req.body.code}</p>`
                    }
                } else if (req.body.isExpired == true) {
                    msg = {
                        to: req.body.email,
                        from: process.env.NEXT_PUBLIC_DOMAIN_FROM,
                        subject: 'Expiration of Access Code',
                        text: `Your access code ${req.body.code} has now expired`,
                        html: `<p>Your access code ${req.body.code} has now expired</p>`
                    }
                }

                // Disable muna
                await sendgrid.send(msg).catch(error => console.log(error));

                res.status(201).json({ success: true, data: updatedRedeem })
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