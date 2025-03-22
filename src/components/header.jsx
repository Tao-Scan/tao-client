import Avatar from "@assets/logo.png";
import { GoChevronDown } from "react-icons/go";

export default function Header() {
	return (
		<div className="w-full flex justify-end items-center z-10">
			<div className="flex justify-center items-center space-x-2 group">
				<div className="w-[30px] h-[30px] overflow-clip rounded-full">
					<img src={Avatar} alt="Avatar" className="rounded-full w-[30px] h-[30px]" />
				</div>
				<span> John Doe</span>

				<GoChevronDown className="text-2xl group-hover:rotate-90 transform duration-500" />
			</div>
		</div>
	);
}
