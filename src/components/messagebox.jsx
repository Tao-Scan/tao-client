import { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";

export default function MessageBox() {
	const [message, setMessage] = useState("");
	const inputRef = useRef();

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
		<div className="w-full  flex flex-row justify-between items-center space-x-2 rounded-[15px] bg-[#04010896]  px-2 lg:px-4 backdrop-blur-lg bg-border-gradient absolute bottom-0 inset-x-0">
			<textarea
				placeholder="Talk to Tao"
				ref={inputRef}
				cols={1}
				value={message}
				onChange={onMessageChange}
				className="w-full pl-4 pr-4 py-4 lg:pt-6 lg:pb-4 resize-none bg-transparent no-scrollbar  focus:outline-none text-white/70 lg:text-lg  z-10 "
			></textarea>
			<button className=" btn self-center">
				<BiSend className="text-2xl lg:text-3xl" />
			</button>
		</div>
	);
}
