import nodemailer from "nodemailer"

export const transport:nodemailer.Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: false,
    auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
    }
} as nodemailer.TransportOptions);

export const sendEmail = async(to:string, subject:string, text:string, html?:string) => {

    try {
        const info = await transport.sendMail({
            from: process.env.FROM_EMAIL!,
            to,
            subject,
            text,
            html,
        });

        console.log(`Email sent to ${to}: ${info.messageId}`);
        return true;
        
    } catch (error) {
        console.error(`Email sending failed to ${to}:`, error);
        return false;
    }
}