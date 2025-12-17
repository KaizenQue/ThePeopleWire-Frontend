"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react";

const navLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'About Us', href: '/AboutUs' },
	{ name: 'Contact Us', href: '/ContactUs' },
	// { name: 'World', href: '/world' },
	// { name: 'National', href: '/national' },
	// { name: 'Politics', href: '/politics' },
	// { name: 'Entertainment', href: '/entertainment' },
	// { name: 'Health', href: '/health' },
	// { name: 'Business', href: '/business' },
	// { name: 'Sport', href: '/sport' },
	// { name: 'Science', href: '/science' },
	// { name: 'Blog', href: '/blog' },
]

const AppNavbar = () => {
	const pathname = usePathname();


	return (
		<div className="w-full h-auto flex items-center justify-center shadow-lg shadow-secondary">
			<div className="w-full max-w-8xl px-4">
				<DropdownMenu>
					<div className="w-full h-16 flex flex-row items-center justify-center gap-16">
						<Image
							src={'icon.svg'}
							alt="App Logo"
							width={80}
							height={80}
						/>
						<div className="w-full flex flex-row items-center justify-between gap-2 px-112">
							{navLinks.map((link) => (
								<Link key={link.name} href={link.href} className={cn("px-3 py-1", pathname.startsWith(link.href) ? "text-secondary bg-secondary/10 rounded" : "text-muted-foreground hover:text-secondary transition-colors duration-300")}>
									{link.name}
								</Link>
							))}
							{/* <DropdownMenuTrigger className="px-2 py-1 flex flex-row items-center justify-center cursor-pointer">
								<span className="text-muted-foreground">Category</span>
								<ChevronDownIcon className="ml-2 inline-block text-secondary" size={16} />
							</DropdownMenuTrigger> */}
						</div>	
						<DropdownMenuContent align="end">
								<DropdownMenuLabel>Navigation</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{navLinks.map((link) => (
									<DropdownMenuItem key={link.name} asChild>
										<Link href={link.href} className={cn(pathname.startsWith(link.href) ? "text-secondary" : "text-muted-foreground")}>
											{link.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
					</div>
				</DropdownMenu>
			</div>
		</div>
	);
}

export default AppNavbar;