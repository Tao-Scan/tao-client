import { Sidebar } from "../components/sidebar";
import Header from "../components/header";
import YingImage from "@assets/ying.png";
import Popups from "../components/popups";
import MessageBox from "../components/messagebox";
import useAuth from "../libs/hooks/useauth";
import { Redirect } from "wouter";
import Spinner from "../components/spinner";
import ChatContainer from "../components/chatcontainer";
import initSocket from "../libs/socket";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
	const { authenticated, pending, authContext, failed } = useAuth();

	const [sentMsgs, setSentMsgs] = useState([]);
	const [status, setStatus] = useState({
		processing: false,
		calledTool: false,
		activeCid: null,
		processingQuery: false,
	});

	const socketRef = useRef(null);

	function pushNewSentMsg(msg) {
		setSentMsgs(sentMsgs.concat(msg));
	}

	function updateSentMsg(cid, update) {
		setSentMsgs((prevMsgs) => prevMsgs.map((msg) => (msg.cid === cid ? { ...msg, ...update } : msg)));
	}

	useEffect(() => {
		if (!socketRef.current) {
			socketRef.current = initSocket({
				accessToken: authContext?.accessToken,
			});
		}

		return () => {
			socketRef.current?.disconnect(); // Cleanup on unmount
			socketRef.current = null;
		};
	}, [authContext?.accessToken]);

	const socket = socketRef?.current;

	// Register Events
	useEffect(() => {
		if (!socket) {
			console.error("Socket is undefined.");
			return;
		}

		const eventHandlers = {
			connect: () => console.log("Socket connected."),
			disconnect: (reason) => console.log("Socket disconnected: ", reason),
			reconnect: () => console.log("Reconnecting..."),
			error: (err) => console.log("Socket Error: ", err),
			processqueryerror: (data) => {
				updateSentMsg(data.cid, {
					error: true,
					errorMessage: data.message,
				});
			},
			processingquery: (data) => {
				setStatus((prev) => ({ ...prev, processingQuery: true, activeCid: data.cid }));
			},
			queryreply: (data) => {
				updateSentMsg(data.cid, {
					reply: data.message,
				});

				setStatus((prev) => ({ ...prev, processing: false, processingQuery: false, calledTool: false }));
			},
			querycalledtool: (data) => {
				setStatus((prev) => ({ ...prev, calledTool: true }));
			},
		};

		// Log all received events for debugging
		// socket.onAny((event, ...args) => console.log("Received event:", event, args));

		// Register event handlers
		Object.entries(eventHandlers).forEach(([event, handler]) => socket.on(event, handler));

		if (authenticated && !socket.active) {
			console.log("Attempting to connect to socket...");
			socket.connect();
		} else if (!authenticated) {
			console.log("No auth, will not connect to socket");
		}

		return () => {
			Object.entries(eventHandlers).forEach(([event, handler]) => socket.off(event, handler));
		};
	}, [authenticated]);

	if (pending && !failed) {
		return (
			<div className="  bg-[#030105]  w-full h-screen center overflow-auto custom-scrollbar">
				<Spinner />
			</div>
		);
	}

	if (!authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<div className="  bg-[#030105]  w-full h-screen center overflow-auto custom-scrollbar">
			<Popups />
			<Sidebar />

			<div className="w-full md:w-[90%] md:ml-[10%] lg:w-[94%] lg:ml-[6%]  h-screen pt-8 pb-4 px-0 flex flex-col justify-start items-center space-y-12 md:space-y-4 relative ">
				<Header />

				{/* Main Area  */}

				<div className="w-[90%] max-w-5xl text-center space-y-4 z-10 pb-2 h-full  flex flex-col justify-end items-center">
					<ChatContainer
						auth={authContext}
						sentMsgs={sentMsgs}
						status={status}
						setProcessing={(v) => setStatus((prev) => ({ ...prev, processing: v }))}
					/>

					{/* message box  */}

					<MessageBox
						ready={true}
						socket={socket}
						pushNewSentMsg={pushNewSentMsg}
						processing={status.processing}
						setProcessing={(v) => setStatus((prev) => ({ ...prev, processing: v }))}
					/>
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
