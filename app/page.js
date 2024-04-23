import Image from "next/image";

export default function Home() {
	return (
		<section className="h-full flex flex-col items-center justify-center">
      <Image src="/assets/home.png" alt="light-mode-image" width={634} height={394} ></Image>
      <Image className="ml-14" src="/assets/home2.png" alt="light-mode-image" width={653} height={382} ></Image>
      
		</section>
	);
}
