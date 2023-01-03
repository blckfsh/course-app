import sendgrid from "@sendgrid/mail";
import connect from '../../../utils/connect';
import Redeem from '../../../models/redeem';

connect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const redeems = await Redeem.find({});

                res.status(200).json({ success: true, data: redeems })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;        
        case 'POST':
            try {
                const redeem = await Redeem.create(req.body);

                // send the email
                sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
                let msg = {};
                if (req.body.isExpired == false && req.body.isRedeemed == false) {
                    msg = {
                        to: req.body.email,
                        from: process.env.NEXT_PUBLIC_DOMAIN_FROM,
                        subject: 'Access Code for Course',
                        text: 'Code: ' + req.body.code,
                        html: `<p>Code: ${req.body.code}</p>`
                    }
                    // Disable muna
                    await sendgrid.send(msg).catch(error => console.log(error));
                } else if (req.body.isExpired == true && req.body.isRedeemed == false) {
                    msg = {
                        to: req.body.email,
                        from: process.env.NEXT_PUBLIC_DOMAIN_FROM,
                        subject: 'Expiration of Access Code',
                        text: `Your access code ${req.body.code} has now expired`,
                        html: `<p>Your access code ${req.body.code} has now expired</p>`
                    }
                    // Disable muna
                    await sendgrid.send(msg).catch(error => console.log(error));
                }

                res.status(201).json({ success: true, data: redeem })
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