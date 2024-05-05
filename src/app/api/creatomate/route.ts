import { NextRequest } from "next/server";

type ResponseData = {
  id: string;
  status: string;
  url: string;
  template_id: string;
  template_name: string;
  template_tags: string[];
  output_format: string;
  modifications: Record<string, string>;
};

export async function POST(req: NextRequest): Promise<ResponseData> {
  const url = " https://api.creatomate.com/v1/renders";

  const headers = {
    Authorization:
      "Bearer c064519e66e943ab90f3d9cd40274cd3e590cad214e32eeb9057e7e231443c2d4188a5d27cb368d3e2a4b479d7e8c3be",
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

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ResponseData;
  return data;
}
