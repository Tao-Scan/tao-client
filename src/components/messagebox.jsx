import { useEffect, useRef, useState } from "react";
import { BiSend, BiStop } from "react-icons/bi";
import { generateRandomId } from "../libs/utils";
import Spinner from "./spinner";

export default function MessageBox({ ready, socket, pushNewSentMsg, processing, setProcessing }) {
	const inputRef = useRef();

	const [message, setMessage] = useState("");

	ready = ready && !!message && socket.connected;

	// console.log(socket);

	function handleSend() {
		if (!message) return;

		console.log("Sending message...");

		const newMsg = {
			cid: generateRandomId(),
			query: message,
		};

		const wsMessage = {
			id: generateRandomId(),
			type: "command",
			action: "new_query",
			timestamp: Date.now(),
			data: newMsg,
			error: null,
		};

		console.log("Submitting to socket...");
		pushNewSentMsg(newMsg);
		setMessage("");

		setProcessing(true);

		socket.emit("command", wsMessage, (val) => {
			console.log("Message sent to server");
		});
	}

	// Adjust height of input box

	const adjustHeight = () => {
		const textarea = inputRef.current;
		if (textarea) {
			textarea.style.height = "auto"; // Reset height
			const newHeight = Math.min(textarea.scrollHeight, 180); // Cap the height at 180px
			textarea.style.height = `${newHeight}px`;
		}
	};

	useEffect(() => {
		adjustHeight();
	}, [message]);

	function onMessageChange(e) {
		setMessage(e.target.value);
	}

	return (
		<div className="w-full  flex flex-row justify-between items-center space-x-2 rounded-[15px] bg-[#04010896]  px-2 lg:px-4 backdrop-blur-lg bg-border-gradient ">
			<textarea
				placeholder="Talk to Tao"
				ref={inputRef}
				cols={1}
				value={message}
				onChange={onMessageChange}
				className="w-full pl-4 pr-4 py-4 lg:pt-6 lg:pb-4 resize-none bg-transparent no-scrollbar  focus:outline-none placeholder:text-white/40 text-white lg:text-lg  z-10 "
			></textarea>
			<button onClick={handleSend} disabled={!ready || processing} className=" btn self-center">
				{processing ? <BiStop className="text-2xl lg:text-3xl" /> : <BiSend className="text-2xl lg:text-3xl" />}
			</button>
		</div>
	);
}
