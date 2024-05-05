import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = " https://api.creatomate.com/v1/renders";

  console.log("CREATOMATE_API_KEY", process.env.CREATOMATE_API_KEY);

  const headers = {
    Authorization: `Bearer ${process.env.CREATOMATE_API_KEY}`,
    "Content-Type": "application/json",
  };

  const body = {
    template_id: "b5c3405f-925f-462d-ba13-ff1116d114b9",
    modifications: {
      "Text-1":
        "Did you know you can automate TikTok, Instagram, and YouTube videos? 🔥",
      "Text-2":
        "Use any video automation tool to replace these text and background assets with your own! 😊",
      "Text-3":
        "Learn how to get started on the Guides & Tutorials page on Creatomate's home page.",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as NextResponse;
    return new Response(JSON.stringify(data), { status: 200 }); // Return response
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 }); // Return error response
  }
}
