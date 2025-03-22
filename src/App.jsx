import Sidebar from "./components/sidebar";
import Header from "./components/header";
import YingImage from "@assets/ying.png";
import YangImage from "@assets/yang.png";
import BitcoinImage from "@assets/bitcoin.png";
import EthereumImage from "@assets/ethereum.png";
import SmartchainImage from "@assets/smartchain.png";

import { BiSend } from "react-icons/bi";

function App() {
	return (
		<div className="  bg-[#030105]  w-full h-screen center overflow-auto">
			<Sidebar />

			<div className="lg:w-[94%] lg:ml-[6%]  h-screen py-8 px-8 flex flex-col justify-start items-center space-y-12 lg:space-y-4 relative ">
				<Header />

				<div className="max-w-6xl text-center space-y-8 z-10">
					<h1
						style={{
							fontFamily: "Kode mono",
						}}
						className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold"
					>
						The Blockchain Explorer you can talk to
					</h1>

					<p className=" md:text-lg lg:text-xl ">No need to sift through complex data — talk to Tao.</p>

					<div className="hidden md:flex flex-row justify-between items-center whitespace-nowrap overflow-x-auto pb-4  no-scrollbar space-x-8 ">
						{/* 1 */}

						<div className=" bg-[#8228FF26]   border-white/5 backdrop-blur-lg rounded-[15px] p-5 w-full space-y-4 text-left shadow-lg shadow-black/50">
							<div className="bg-[#8228FF] text-white text-sm rounded-[100px] w-max px-4 py-1 shadow capitalize">
								Explore blockchains
							</div>

							<p className="text-white"> Blockchain on security and transparency </p>
						</div>

						{/* 2 */}
						<div className=" bg-transparent  border-white/5 backdrop-blur-lg rounded-[15px] p-5 w-full space-y-4 text-left shadow-lg shadow-black/50">
							<div className="bg-white text-[#8228FF] text-sm rounded-[100px] w-max px-4 py-1 shadow capitalize">
								Explore Tokens
							</div>

							<p className="text-white "> Find onchain data about addresses </p>
						</div>

						{/* 3 */}
						<div className=" bg-[#8228FF26]   border-white/5 backdrop-blur-lg rounded-[15px] p-5 w-full space-y-4 text-left shadow-lg shadow-black/50">
							<div className="bg-[#8228FF] text-white text-sm rounded-[100px] w-max px-4 py-1 shadow capitalize">
								Data Analytcis
							</div>

							<p className="text-white"> Get detailed info about market movement </p>
						</div>
					</div>

					{/* message box  */}

					<div className="w-full  flex flex-row justify-between items-center space-x-4 rounded-[15px]  px-2 lg:px-4 backdrop-blur-lg bg-border-gradient">
						<textarea className="w-full pl-4 pr-4 pt-4 lg:pt-6 lg:pb-2 resize-none bg-transparent no-scrollbar  focus:outline-none text-white/70 lg:text-lg  z-10 ">
							Talk to Tao
						</textarea>
						<button className=" btn self-center">
							<span className="hidden lg:inline-block"> Send </span>

							<BiSend className="text-2xl lg:text-3xl" />
						</button>
					</div>
				</div>

				{/* Metrics  */}

				<div className="max-w-6xl pt-4 space-y-8 lg:space-y-12 w-full z-10 ">
					<h2
						style={{
							fontFamily: "Kode Mono",
						}}
						className="text-2xl lg:text-3xl font-bold text-white/70  "
					>
						{" "}
						One Explorer, Multiple chains
					</h2>

					<div className="flex flex-col  lg:flex-row justify-center space-y-6 lg:space-y-0 lg:justify-between items-center whitespace-nowrap overflow-x-auto pb-8  no-scrollbar lg:space-x-8 z-10">
						{/* 1 */}

						<div className="bg-border-gradient  backdrop-blur-lg rounded-[15px] p-5 w-full space-y-4 text-left shadow-lg shadow-black/50 min-w-[336px]">
							<div className="flex justify-start items-center space-x-4">
								<img src={BitcoinImage} alt="Bitcoin" className="" />

								<div className="flex flex-col space-y-1">
									<span className="text-lg lg:text-xl text-white"> BTC</span>
									<span className="text-xs text-white/50"> Bitcoin</span>
								</div>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">Market cap</span>

								<span className="">
									<span className="text-white/50">1.57T</span> &nbsp;
									<span className="text-red-500"> -1.87% </span>
								</span>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">24H txn Volume</span>

								<span className="">788.30K BTC</span>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">Best txn fee</span>

								<span className=""> 0.00001596 BTC/KB </span>
							</div>
						</div>

						{/* 2 */}

						<div className="bg-border-gradient  backdrop-blur-lg rounded-[15px] p-5 w-full space-y-4 text-left shadow-lg shadow-black/50 min-w-[336px]">
							<div className="flex justify-start items-center space-x-4">
								<img src={EthereumImage} alt="Bitcoin" className="" />

								<div className="flex flex-col space-y-1">
									<span className="text-lg lg:text-xl text-white"> ETH</span>
									<span className="text-xs text-white/50"> EThereum</span>
								</div>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">Market cap</span>

								<span className="">
									<span className="text-white/50">122.57B</span> &nbsp;
									<span className="text-red-500"> -1.87% </span>
								</span>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">24h txn volume</span>

								<span className="">233M ETH</span>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50"> Avg. Gas price</span>

								<span className=""> 5 Gwei </span>
							</div>
						</div>

						{/* 3 */}

						<div className="bg-border-gradient  backdrop-blur-lg rounded-[15px] p-5 w-full space-y-4 text-left shadow-lg shadow-black/50 min-w-[336px]">
							<div className="flex justify-start items-center space-x-4">
								<img src={SmartchainImage} alt="Bitcoin" className="" />

								<div className="flex flex-col space-y-1">
									<span className="text-lg lg:text-xl text-white"> BNB</span>
									<span className="text-xs text-white/50"> BNB Chain</span>
								</div>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">Market cap</span>

								<span className="">
									<span className="text-white/50">42.57B</span> &nbsp;
									<span className="text-red-500"> -1.87% </span>
								</span>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50">TPS</span>

								<span className=""> 31.32 txns/sec </span>
							</div>

							<div className="text-xs flex justify-between items-start">
								<span className=" text-white/50"> 24h txn volume</span>

								<span className=""> 4.35M BNB </span>
							</div>
						</div>
					</div>
				</div>

				<img
					src={YingImage}
					alt=""
					className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:bottom-0 w-full "
				/>
				<img
					src={YangImage}
					alt=""
					className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:bottom-0 w-full"
				/>
			</div>
		</div>
	);
}

export default App;

{
	/* <div className="w-full  max-w-[1440px] center ">
				<div className="bg-[#17082B] max-w-[608px] rounded-[15px] w-[80%] min-h-[500px] p-6 flex flex-col justify-start items-center space-y-2">
					<div className="flex justify-center items-center space-x-2">
						<img src={Logo} alt="logo" />
						<h1 className="font-bold text-2xl lg:text-3xl xl:text-4xl text-white">Tao</h1>
					</div>

					<h2 className="text-center font-bold text-xl lg:text-2xl text-white/70">Get Started</h2>
					<p className="text-white/70 text-center w-[80%]">
						Create an account to have access to extra features and personalized interaction
					</p>
				</div>
			</div> */
}
