import nodemailer from "nodemailer";

import {} from '../env';

const transporter = nodemailer.createTransport({
    service:"",
    host:"",
    port: "",
    secure:"",
    auth:{
        user:"",
        pass:"",
    },
    requireTLS: true
});

