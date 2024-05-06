// api/creatomate/route.ts

import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  text1: string;
  text2: string;
  text3?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const url = " https://api.creatomate.com/v1/renders";
  const { text1, text2, text3 } = (await req.json()) as RequestBody;

  const headers = {
    Authorization: `Bearer ${process.env.CREATOMATE_API_KEY}`,
    "Content-Type": "application/json",
  };

  const body = {
    template_id: "b5c3405f-925f-462d-ba13-ff1116d114b9",
    modifications: {
      "Text-1": text1,
      "Text-2": text2,
      "Text-3": text3 ?? "",
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
