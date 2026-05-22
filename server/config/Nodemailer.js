import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({

    host: "smtp-relay.brevo.com",

    port: 465,

    secure: true,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },

    pool: true,

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});