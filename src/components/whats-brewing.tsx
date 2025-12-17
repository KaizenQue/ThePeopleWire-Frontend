"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

const WhatsBrewing = () => {
	const trpc = useTRPC();
	const articles = useSuspenseQuery(trpc.articles.getBrewingArticles.queryOptions({ limit: 5 }));

	const formatDate = (d: string | Date | undefined | null) => {
		if (!d) return '';
		const date = d instanceof Date ? d : new Date(d);
		if (Number.isNaN(date.getTime())) return String(d);
		return date.toLocaleString();
	}

	return (
		<div className="flex-1 flex flex-col gap-4">
			<p className="text-2xl text-secondary font-bold">WHAT&apos;S BREWING</p>
			<div className="flex flex-col gap-4">
				{
					articles.data.map((article) => (
						<Link key={article.id} href={article.link || ""} target="_blank" className="flex flex-row gap-4">
							<img
								src={article.image_url || ""}
								alt={article.title || ""}
								className="w-24 h-24 object-cover aspect-square"
							/>
							<div className="flex flex-col">
								<p className="text-muted-foreground text-xs">{formatDate(article.published)}</p>
								<p className="font-semibold text-sm md:line-clamp-4">{article.title}</p>
							</div>
						</Link>
					))
				}
			</div>
		</div>
	);
}

export default WhatsBrewing;