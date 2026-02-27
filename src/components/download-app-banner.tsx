import Image from "next/image"


const DownloadAppBanner = () => {
	return (
		<div className="w-full bg-secondary/10 flex items-center justify-between gap-4 px-10 py-4 rounded-sm">
			<p className="text-sm text-secondary font-bold">Download The People Wire App Now! Available on iOS and Android.</p>
			<div className="flex flex-row items-center justify-center gap-4">
				<Image
					src={"/Download_on_the_App_Store_Badge.svg"}
					alt="Download on the App Store"
					width={110}
					height={30}
				/>
				<Image
					src={"/get-google-play-badge.png"}
					alt="Get it on Google Play"
					width={120}
					height={40}
				/>
			</div>
		</div>
	)
}

export default DownloadAppBanner;