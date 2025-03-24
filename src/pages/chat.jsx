import { Sidebar } from "../components/sidebar";
import Header from "../components/header";
import YingImage from "@assets/ying.png";
import Popups from "../components/popups";
import MessageBox from "../components/messagebox";

export default function Chat() {
	return (
		<div className="  bg-[#030105]  w-full h-screen center overflow-auto custom-scrollbar">
			<Popups />
			<Sidebar />

			<div className="w-full md:w-[90%] md:ml-[10%] lg:w-[94%] lg:ml-[6%]  h-screen pt-8 pb-4 px-0 flex flex-col justify-start items-center space-y-12 md:space-y-4 relative ">
				<Header />

				{/* Main Area  */}

				<div className="w-[90%] max-w-7xl text-center space-y-8 z-10  h-full relative ">
					{/* message box  */}

					<MessageBox />
				</div>
			</div>
			<img src={YingImage} alt="" className="absolute bottom-0  w-full h-full hidden lg:block blur-2xl opacity-60" />

			<img
				src={YingImage}
				alt=""
				className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:hidden  blur-2xl opacity-60 w-full h-full "
			/>
		</div>
	);
}
