import { Route, Switch } from "wouter";
import Home from "./pages/home";

function App() {
	return (
		<Switch>
			<Route component={Home} path="/" />
		</Switch>
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
