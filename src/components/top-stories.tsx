"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

const TopStories = () => {
	const trpc = useTRPC();
	const articles = useSuspenseQuery(trpc.articles.getTopArticles.queryOptions({ limit: 4 }));

	const formatDate = (d: string | Date | undefined | null) => {
		if (!d) return '';
		const date = d instanceof Date ? d : new Date(d);
		if (Number.isNaN(date.getTime())) return String(d);
		return date.toLocaleString();
	}

	return (
		<div className="flex-3 flex flex-col gap-4">
			<div className="flex flex-row gap-12">
				<div className="flex-1 flex flex-col gap-8">
					<p className="text-2xl text-secondary font-bold">TOP STORIES</p>
					<Link href={articles.data[0].link || ""} target="_blank">
						<p className="text-muted-foreground">{formatDate(articles.data[0].published)}</p>
						<p className="font-semibold text-2xl">{articles.data[0].title}</p>
					</Link>
				</div>
				<Link href={articles.data[0].link || ""} target="_blank" className="flex-2 flex items-start">
					<img
						src={articles.data[0].image_url || ""}
						alt={articles.data[0].title || ""}
						className="w-full h-full object-cover aspect-16/10"
					/>
				</Link>
			</div>
			<div className="flex flex-row gap-4">
				{
					articles.data.slice(1, 4).map((article) => (
						<Link key={article.id} href={article.link || ""} target="_blank" className="flex-1 flex flex-col gap-2">
							<img
								src={article.image_url || ""}
								alt={article.title || ""}
								className=""
							/>
							<div className="flex flex-col">
								<p className="text-muted-foreground text-xs">{formatDate(article.published)}</p>
								<p className="font-semibold text-ellipsis md:line-clamp-3">{article.title}</p>
							</div>
						</Link>
					))
				}
			</div>
		</div>
	);
}

export default TopStories;