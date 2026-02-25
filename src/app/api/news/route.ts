import { supabase } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const from = parseInt(searchParams.get("from") || "0", 10);
  const to = parseInt(searchParams.get("to") || "19", 10);

  const countries = searchParams.getAll("country");
  const categories = searchParams.getAll("category");
  const language = searchParams.get("language") || "english";

  let query = supabase
    .from("article")
    .select("*")
    .eq("language", language)
    .order("publish_datetime", { ascending: false })
    .range(from, to); // ✅ THIS IS THE KEY FIX

  if (countries.length > 0) {
    query = query.contains("country", countries);
  }

  if (categories.length > 0) {
    query = query.contains("category", categories);
  } else {
    query = query.contains("category", ["top"]);
  }

  const { data, error } = await query;

  return NextResponse.json({ data, error });
}
