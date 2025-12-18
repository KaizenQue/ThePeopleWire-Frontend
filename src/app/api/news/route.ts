import { supabase } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
	const { searchParams } = new URL(request.url);
	const limit = parseInt(searchParams.get("limit") || "10", 10);
	const countries = searchParams.getAll("country");
	const categories = searchParams.getAll("category");
	const language = searchParams.get("language");

	let query = supabase
		.from("article")
		.select("*")
		.eq("language", language || "english")
		.order("publish_datetime", { ascending: false })
		.limit(limit);

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