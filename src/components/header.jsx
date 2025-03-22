import { GoChevronDown } from "react-icons/go";
import Logo from "@assets/logo.png";

export default function Header() {
	return (
		<div className="fixed   top-0 inset-x-0  z-20 center backdrop-blur-md py-2 md:py-4">
			<div className="flex justify-between md:justify-end items-center w-[90%]  ">
				<img src={Logo} alt="logo" className="-translate-x-2 md:hidden " />

				<div className="flex justify-center items-center space-x-2 group">
					<div className="w-[30px] h-[30px] overflow-clip rounded-full border border-white/20">
						<img src={`https://robohash.org/hello.png`} alt="Avatar" className="rounded-full w-[30px] h-[30px]" />
					</div>
					<span> John Doe</span>

					<GoChevronDown className="text-2xl group-hover:rotate-90 transform duration-500" />
				</div>
			</div>
		</div>
	);
}
