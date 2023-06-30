import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

type SignUpEmail = {
  email: string;
};

export async function POST(req: Request) {
  const { email } = (await req.json()) as SignUpEmail;
  console.log(email, "submitted");

  if (!email) {
    return new Response("error: Email is required");
  }
  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreedsheets",
      ],
    });

    const sheet = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Sheet1!A:A";
    console.log("getting result");

    const result = await sheet.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range, // Append to column A of Sheet1
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email]],
      },
    });
    console.log(
      `Appended "${email}" to Sheet1!A${result.data.updates.updatedRange}`
    );
  } catch (error) {
    console.error(`Error appending "${email}" to Sheet1!A:A:`, error);
    return new Response("error: Error appending email to sheet");
  }
}
