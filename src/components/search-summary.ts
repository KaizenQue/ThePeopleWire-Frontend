import { supabase } from "../lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  if (!query) return NextResponse.json([]);
  // Search summary for the query
  const { data, error } = await supabase
    .from("articles")
    // include embeddings for client-side retention averaging
    .select("*, summary_embedding")
    .ilike("summary", `%${query}%`)
    .order("published", { ascending: false })
    .limit(20);
  if (error) return NextResponse.json([]);
  return NextResponse.json(data);
}
