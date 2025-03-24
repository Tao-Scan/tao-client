import Logo from "@assets/logo.png";
import { FiLogOut } from "react-icons/fi";
import { GoShieldLock } from "react-icons/go";
import { IoMdPeople } from "react-icons/io";
import { RiHome5Line } from "react-icons/ri";
import { Link } from "wouter";

export function Sidebar() {
	return (
		<aside className="fixed inset-y-0 right-0 md:left-0 w-[10%] lg:w-[6%] bg-[#030105] px-4 py-8 border-r border-white/10  flex-col justify-start items-center space-y-8  z-30 hidden md:flex ">
			<Link to="/" className="bg-[#8228FF26] rounded-[15px] p-1 w-max">
				<img src={Logo} alt="logo" />
			</Link>

			<div title="Home" className="p-3 hover:bg-[#8228FF26]/10 rounded-[15px] hover:cursor-pointer group">
				<RiHome5Line className="text-3xl text-white/70 group-hover:text-white" />
			</div>

			<div title="Coming Soon" className="p-1 opacity-40  cursor-not-allowed">
				<GoShieldLock className="text-3xl text-white" />
			</div>

			<div title="Coming Soon" className="p-1 opacity-40  cursor-not-allowed">
				<IoMdPeople className="text-3xl text-white" />
			</div>

			<div className="space-y-8 w-full absolute bottom-0  center py-8">
				<div title="Log out" className="p-3 hover:bg-[#8228FF26]/10 rounded-[15px] hover:cursor-pointer group">
					<FiLogOut className="text-3xl text-white/70 group-hover:text-white" />
				</div>
			</div>
		</aside>
	);
}

export function BottomBar() {
	return (
		<aside className="fixed inset-x-0 bottom-0  w-full  border-t border-white/10 center  md:hidden z-20 bg-[#030105] ">
			<div className="flex-row justify-between items-center    flex w-[90%]">
				<div title="Home" className="p-3 hover:bg-[#8228FF26]/10 rounded-[15px] hover:cursor-pointer group">
					<RiHome5Line className="text-3xl text-white group-hover:text-white" />
				</div>

				<div title="Coming Soon" className="p-1 opacity-20  cursor-not-allowed">
					<GoShieldLock className="text-3xl text-white" />
				</div>

				<div title="Coming Soon" className="p-1 opacity-20  cursor-not-allowed">
					<IoMdPeople className="text-3xl text-white" />
				</div>
			</div>
		</aside>
	);
}
