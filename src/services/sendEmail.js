import { createTransport } from "nodemailer";

const transporter = createTransport({
service:"gmail",
  auth: {
    user: "use your email",
    pass: "use your app password",
  },
});


const sendEmail = async(to , subject , html)=> {
  
  const info = await transporter.sendMail({
    from: '"your name" <your email >', 
    to:to? to:"",
    subject: subject? subject:"", 
    html: html ? html:""
  });


  if(info.accepted.length){
    return true
  }
  return false
 
}

export default sendEmail