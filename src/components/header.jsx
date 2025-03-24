import { GoChevronDown } from "react-icons/go";
import Logo from "@assets/logo.png";
import useAuth from "../libs/hooks/useauth";
import useAppStore from "../libs/store";

export default function Header() {
	const setShowSignIn = useAppStore((state) => state.setShowSignIn);
	const { authenticated, user, clearAuth } = useAuth();
	return (
		<div className="fixed   top-0 inset-x-0  z-20 center backdrop-blur-lg py-2 md:py-4">
			<div className="flex justify-between md:justify-end items-center w-[90%]  ">
				<img src={Logo} alt="logo" className="-translate-x-2 md:hidden " />

				<div className="flex justify-center items-center space-x-2 group relative">
					{authenticated ? (
						<>
							<div className="w-[30px] h-[30px] overflow-clip rounded-full border border-white/20">
								<img
									src={`https://robohash.org/${user.email}`}
									alt="Avatar"
									className="rounded-full w-[30px] h-[30px]"
								/>
							</div>
							<span>{user.firstName}</span>

							<GoChevronDown className="text-2xl group-hover:rotate-180 transform duration-500" />

							<div
								onClick={clearAuth}
								className="absolute top-0 group-hover:top-[105%] backdrop-blur-xl right-0 hover:cursor-pointer  bg-black px-4 py-1 rounded-[15px] text-white z-20  opacity-0 text-sm group-hover:opacity-100 duration-300 transition-all  border border-white/5 hover:border-white/10"
							>
								Log out
							</div>
						</>
					) : (
						<button onClick={() => setShowSignIn(true)} className="">
							Log in
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
