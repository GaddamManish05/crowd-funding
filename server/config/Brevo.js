import * as Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

const apiKey = apiInstance.authentications["apiKey"];

apiKey.apiKey = process.env.BREVO_API_KEY;

export default apiInstance;