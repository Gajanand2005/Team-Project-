import { sendEmail } from "./emailService.js";

const sendEmailFun = async(emailData) => {
    const { sendTo, subject, text, html } = emailData;
    const result = await sendEmail(sendTo, subject, text, html);
    if (result.success) {
        return true;
    } else {
        return false;
    }
}

export default sendEmailFun;

