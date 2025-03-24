import { Route, Switch } from "wouter";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Switch>
				<Route component={Home} path="/" />
				<Route component={Chat} path="/chat" />
			</Switch>
		</QueryClientProvider>
	);
}

export default App;
