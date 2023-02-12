import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import ClientPromise from '../../../utils/mongoDB'; 
import  EmailProvider from 'next-auth/providers/email';
import {createTransport} from 'nodemailer'; 



interface userInfo {
  name:string,
  email:string,
  id:string,
  emailVerified:string
}

export default NextAuth({
  secret: process.env.NEXT_SECRET,

  adapter:MongoDBAdapter(ClientPromise),
  session:{
     strategy:'database',
     maxAge: 7776000,
     updateAge: 7776000, 
  },
  providers:[
     EmailProvider({
        server: {
           host: process.env.SMTP_HOST,
           port: process.env.SMTP_PORT,
           auth:{
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASS
           }
        },
        from:'chimptracker@gmail.com', 
        async sendVerificationRequest({

           identifier:email,
           url,
           provider:{server,from},
        }){
           const transport = createTransport(server)
           await transport.sendMail({
              to:email,
              from,
              subject:`Sign in to Chimp Tracker ❤️`,
              html: html({url,email}) 
           })
        }
     })
  ], 
  pages:{
     signIn:'/login',
     newUser: '/signup',
  }, 
  callbacks:{
     async session ({session}){
       let dbInstance = (await ClientPromise).db();
       let userDetails = await dbInstance.collection('users').findOne({
         email:session.user.email
     });

     if(userDetails){
         let myUser:userInfo = {
             id:userDetails.id,
             emailVerified:userDetails.emailVerified,
             name: userDetails.name,
             email: userDetails.email,
         }
         session.user = myUser;
     }
       return session
     }, 
  }
  
})


function html({url,email}: Record<"url" | "email", string>) {

   const espacedEmail = `${email.replace(/\./g, "&#8203;.")}`; 

   const btnBackgroundColor = '#6969CE'

   return `<div><head>
     <style>
       table, td, div, h1, p {
         font-family: Arial, sans-serif;
       }
       @media screen and (max-width: 530px) {
         .unsub {
           display: block;
           padding: 8px;
           margin-top: 14px;
           border-radius: 6px;
           background-color: #555555;
           text-decoration: none !important;
           font-weight: bold;
         }
         .col-lge {
           max-width: 100% !important;
         }
       }
       @media screen and (min-width: 531px) {
         .col-sml {
           max-width: 27% !important;
         }
         .col-lge {
           max-width: 73% !important;
         }
       }
     </style>
   </head>
   <body style="margin:0;padding:0;word-spacing:normal;background-color:#fff;">
     <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#fff;">
       <table role="presentation" style="width:100%;border:none;border-spacing:0;">
         <tr>
           <td align="center" style="padding:20px;">
             <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
               <tr>
                 <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                   <a href="https://www.chimptrack.co.uk" style="text-decoration:none;"><img src="https://i.ibb.co/s1fthch/logo.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                 </td>
               </tr>
               <tr>
                 <td style="background-color:#ffffff;padding: 20px">
                   <p style="margin:0;">Dear User</p>
                 </td>
               </tr>
               <tr>
                   <td style="background-color:#ffffff;padding: 20px">
                     <p style="margin:0;">A request to login was made with your email: <span style="font-weight:600;">${espacedEmail}</span>  </p>
                   </td>
               </tr>
               <tr>
                   <td style="background-color:#ffffff;padding:10px 20px">
                     <p style="margin:0;">Kindly proceed to login into your account:</p>
                   </td>
               </tr>
               <tr >
                   <td height="60px" style="height:60px; padding:0 20px">
                     <a href=${url} style="margin:0;background:${btnBackgroundColor}; color:#ffffff; padding:14px 12px;text-decoration:none">Proceed to Chimp Tracker</a>
                   </td>
                   
               </tr>
               
               <tr>
                   <td style="background-color:#ffffff;padding: 20px;">
                     <p style="margin:0;">If you have any question reach out <a href="https://wa.link/5p7yfr">here</a></p>
                   </td>
               </tr>
               <tr>
                   <td style="background-color:#ffffff;padding: 20px;">
                     <p style="margin:0;">Thanks</p>
                     <p style="margin:0;">Lawal from Chimp tracker</p>
                   </td>
               </tr>
              
               <tr>
                 <td style="padding:30px;text-align:center;font-size:12px;background-color:#f4f6fae0;color:#307BD1;">
                   <p style="margin:0;font-size:14px;line-height:20px;">&reg; 2023 Chimp Technologies LTD, Glasgow UK</p>
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>
     </div>
   </body>
   
   </div>`

}

