import { NextResponse } from "next/server";
import { saveAnalysis } from "@/lib/analysis";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Vastaanotettu data API:ssa:", data);
  const id = await saveAnalysis(data);
  console.log(`Analyysi tallennettu API:ssa, ID: ${id}`);
  return NextResponse.json({ id });
}
