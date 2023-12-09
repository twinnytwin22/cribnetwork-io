import { supabaseApi } from "@/lib/providers/supabase/routerHandler";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";
//import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
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
      .from("form_submissions")
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
  if (req.method !== "POST") {
    return NextResponse.json("error: Method Not Allowed", { status: 405 });
  }
  if (req.method === "POST") {
    const updates = await req.json();

    if (!updates?.email) {
      return NextResponse.json("error: Email is required");
    }

    const msg = {
      to: updates.email,
      cc: process.env.FROM_EMAIL as string,
      bc: "info@cribnetwork.io",
      from: process.env.FROM_EMAIL as string,
      subject: "We've received your message!",
      text: "New Message from CRIB",
      html: `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>We got your submission!</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
      
      
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
              font-family: "Roboto", sans-serif;
            }
      
            h1 {
              text-align: center;
              font-family: "Roboto", sans-serif;
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
      
            .custom-section {
              max-width: 600px;
              padding: 3rem;
              display: flex; /* Use flexbox to align image and content */
              background-color: black;
              color: white;
            }
      
            .custom-section-left {
              flex: 1; /* Take up the available space */
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 1rem;
            }
      
            .custom-section-right {
              flex: 1; /* Take up the available space */
              padding: 1rem;
            }
      
            .custom-section h2 {
              font-size: 1.5rem;
              font-weight: bold;
              text-align: center;
              color: #fff;
            }
      
            .custom-section h3 {
              text-align: center;
              font-weight: bold;
            }
      
            .custom-section p {
              font-size: 1rem;
              text-align: center;
              margin-bottom: 0.6rem;
            }
      
            .custom-section button {
              padding: 0.5rem 1rem;
              color: black;
              background-color: #f98c8c;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: center;
            }
      
            .discord button {
              padding: 0.5rem 1rem;
              color: black;
              background-color: #f98c8c;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: center;
            }
          </style>
        </head>
      
        <body>
          <div class="content">
            <div class="logo">
              <img
                src="https://cdn.sanity.io/images/6d8w1e5g/production/b9657d582fceef81348198cd3d0aa9bb853729d4-748x167.png"
                alt="CRIB Network Logo"
              />
            </div>
      
            <div class="main-image">
              <img
                src="https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/object/public/site_images/CribArtboard%201%20copy@4x.png"
              />
            </div>
            <h1 class="heading">We got your submission!</h1>
            <p style="text-align: center">
              If you selected an interest in sync your music will be included in our live reviews, and will be reviewed by Twinny Twin for possible sync opportunities!
            </p>
      
            <p style="text-align: center">
              <strong>Join us</strong> as we introduce Crib Music Global & the return of Sync Sunday on Jth. We'll be
              reviewing music live and providing feedback and possible in the context of sync, and shot to get your music accepted into our sync library.
              </p>
              <p style="text-align: center"> 
              You
              must be present to get your music reviewed. RSVP below, follow
              <a href="https://twitter.com/djtwinnytwin">@djtwinnytwin</a> and
              <a href="https://twitter.com/cribmusicglobal"> @cribmusicglobal</a>
              and join the Discord for updates.
            </p>
            <div class="discord">
              <a href="https://discord.com/invite/2kRJmu3RYS">
                <button><strong>Join Discord</strong></button>
              </a>
            </div>
          </div>
          <div class="custom-section">
            <div class="custom-section-left">
              <img
                style="
                  width: 100px;
                  height: 100px;
                  margin-left: auto;
                  margin-right: auto;
                  border-radius: 50%;
                  object-fit: cover;
                "
                src="https://tvuqvrbxusmicpmjqpus.supabase.co/storage/v1/object/public/artist_images/IMG_1415.jpg"
              />
            </div>
            <div class="custom-section-right">
              <h2>Sync Sunday</h2>
              <p>w/ Twinny Twin</p>
      
              <h3>Upcoming Date:</h3>
              <p>${updates.date}/p>
              <p>11am PST | 2pm EST</p>
              <br />
              <div><a target="_blank"
                  href=${updates.href}
      
                ><button>
                  RSVP</button>
                </a>
      
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="logo">
              <img
                src="https://cdn.sanity.io/images/6d8w1e5g/production/b9657d582fceef81348198cd3d0aa9bb853729d4-748x167.png"
                alt="CRIB Network Logo"
              />
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
      insertData(updates),
    ]);

    if (emailSent && dataInserted) {
      return NextResponse.json({ success: true, ok: true });
    } else {
      return NextResponse.json({
        error: "Error sending email or inserting data",
        ok: false,
      });
    }
  }

  return NextResponse.json({ error: "Method not allowed", ok: false });
}
