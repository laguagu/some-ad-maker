import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  const backendFormData = new FormData();
  backendFormData.append("file", new Blob([buffer]), file.name);

  try {
    const response = await fetch(
      "http://localhost:8000/remove-background-base64/",
      {
        method: "POST",
        body: backendFormData,
      },
    );

    if (!response.ok) {
      throw new Error("Taustan poisto epäonnistui");
    }

    const { image } = await response.json();
    return NextResponse.json({ image: `data:image/png;base64,${image}` });
  } catch (error) {
    console.error("Error removing background:", error);
    return NextResponse.json(
      { error: "Virhe taustan poistossa" },
      { status: 500 },
    );
  }
}
