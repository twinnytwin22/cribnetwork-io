import { supabaseApi } from "@/lib/providers/supabase/routerHandler";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";
//import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

async function sendEmail(msg: any) {  
    try {
      await sgMail.send(msg);
      console.log("Email sent");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function insertData(updates: any) {

    try {
      const { data: submission, error: submissionError } = await supabaseApi
        .from('form_submissions')
        .insert(updates);
  
      if (submissionError) {
        console.error(submissionError);
        return false;
      }
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }
  if (req.method === "POST") {
  const updates = await req.json();

  if (!updates?.email) {
    return NextResponse.json("error: Email is required");
  }

 

  const msg = {
    to: updates.email,
    cc: process.env.FROM_EMAIL as string,
    bc: 'info@cribnetwork.io',
    from: process.env.FROM_EMAIL as string,
    subject: "We've received your message!",
    text: "New Message from CRIB",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>We've received your message!</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
        <style>
            /* Reset styles to ensure consistent rendering across email clients */
            body,
            html {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
                line-height: 1;
            }
    
            /* Set the width of the email to be the maximum width */
            body {
                max-width: 600px;
                margin: 0 auto;
                font-family: 'Roboto', sans-serif;
            }
        
            h1 {
              text-align: center;
              font-family: 'Roboto', sans-serif;
            }
            
            /* Center the image in the header */
            .header img {
                display: block;
                margin: 0 auto;
            }
    
            /* Style the footer */
            .footer {
                margin-top: 2rem;
                text-align: center;
                font-size: 0.8rem;
                color: #666;
            }
    
            .footer a {
                color: #666;
                text-decoration: none;
            }
    
            /* Style the content of the email */
            .content {
                max-width: 600px;
                padding: 3rem;
                background-color: #f5f5f5;
                margin-left: auto;
                margin-right: auto;
            }
    
            .content h1 {
                margin-top: 0;
                margin-bottom: 1rem;
                font-size: 1.5rem;
                font-weight: bold;
                color: #333;
            }
    
            .content p {
                margin: 0;
                margin-bottom: 1rem;
                font-size: 1rem;
                line-height: 1.5;
                color: #666;
            }
    
            /* Add your logo image here */
            .logo img {
                display: block;
                margin: 0 auto;
                max-width: 200px;
                margin-top: 30px;
                margin-bottom: 30px;
            }

            .main-image img {
                display: block;
                margin: 0 auto;
                width: 100%;
                margin-top: 30px;
                margin-bottom: 30px;
                border-radius: 10px;
            }
            
        </style>
    </head>
    
    <body>
    
        <div class="content">
            <div class="logo">
                <img src="https://cdn.sanity.io/images/6d8w1e5g/production/b9657d582fceef81348198cd3d0aa9bb853729d4-748x167.png" alt="CRIB Network Logo">
            </div>
            
            <div class="main-image">
            <img src="https://cdn.sanity.io/images/6d8w1e5g/production/d0ee0dec2d0b11cf4890437b2c40e3e0cbf18744-2000x1333.png"/>
            </div>
            <h1 class="heading">We've received your message!</h1>
        <p>Thank you for reaching out to us through our website's contact form. We appreciate your interest in our digital marketing services. Our team is excited to learn more about your specific needs and how we can help your business succeed online. We will review your message carefully and get back to you as soon as possible to discuss your project in more detail.</p>
        <p><strong>Name:</strong> ${updates.first_name}</p>
              <p><strong>Email:</strong>${updates.email}</p>
              ${updates.subject && `<p><strong>Subject:</strong> ${updates.subject}</p>`}
             ${updates.message && `<p><strong>Message:</strong> ${updates.message}</p>`}
        </div>
        <div class="footer">
           <div class="logo">
                <img src="https://cdn.sanity.io/images/6d8w1e5g/production/b9657d582fceef81348198cd3d0aa9bb853729d4-748x167.png" alt="CRIB Network Logo">
            </div>
            <p>&copy; 2023 CRIB Network. All rights reserved.</p>
            <p><a href="https://cribnetwork.io/">cribnetwork.io</a></p>
        </div>
    </body>
    
    </html>
    
    
    `,
  };

  const [emailSent, dataInserted] = await Promise.all([
    sendEmail(msg),
    insertData(updates)
  ]);

  if (emailSent && dataInserted) {
    return NextResponse.json({ success: true, ok: true });
  } else {
    return NextResponse.json({ error: "Error sending email or inserting data" , ok: false });
  }
}

return NextResponse.json({ error: "Method not allowed", ok: false });
}
