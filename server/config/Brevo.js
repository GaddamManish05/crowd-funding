import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

const apiKey = apiInstance.authentications["apiKey"];

apiKey.apiKey = process.env.MAIL_PASS;

export default apiInstance;