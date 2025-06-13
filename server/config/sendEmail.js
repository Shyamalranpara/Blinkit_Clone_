const { Resend } = require('resend');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.RESEND_API) {
    console.log("❌ Please provide RESEND_API in the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blinkit <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("❌ Resend API error:", error);
            return null;
        }

        console.log("✅ Email sent successfully");
        return data;
    } catch (err) {
        console.error("❌ Error sending email:", err);
        return null;
    }
};

module.exports = sendEmail;
