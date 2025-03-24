"use client";

import { BiX } from "react-icons/bi";
import { useEffect } from "react";
import Spinner from "./spinner";
import useAppStore from "../libs/store";

const SNACKBAR_COLORS = {
	info: "bg-[#3498DB] text-[#3498DB]",
	warning: "bg-[#F39C12] text-[#F39C12]",
	error: "bg-[#E74C3C] text-[#E74C3C]",
	success: "bg-[#2ECC40] text-[#2ECC40]",
	default: "bg-[#1652F0] text-[#1652F0]",
};

export default function Snackbar() {
	const snackState = useAppStore((state) => state.snackbarData);
	const setSnackState = useAppStore((state) => state.setSnackbarData);
	const { message, isVisible, variant = "default", canDismiss, isLoading } = snackState;

	const hideSnackbar = () => setSnackState({ isVisible: false });

	useEffect(() => {
		if (!isVisible || !canDismiss) return;
		const timer = setTimeout(hideSnackbar, 4000);
		return () => clearTimeout(timer);
	}, [isVisible, canDismiss]);

	if (!isVisible) return null;

	return (
		<div className="fixed z-50 bottom-5 right-5 left-5 md:left-auto md:right-5 flex justify-center md:justify-end">
			<div
				className={`${
					SNACKBAR_COLORS[variant] || SNACKBAR_COLORS.default
				} shadow-lg backdrop-blur-lg bg-opacity-90 rounded-lg flex items-center gap-4 px-6 py-3 transition-all duration-300 transform ${
					isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
				}`}
			>
				<p className="text-white font-medium text-base md:text-lg flex-1 whitespace-nowrap">{message}</p>

				{isLoading && <Spinner type="moon" size={15} className="animate-spin" />}

				{canDismiss && !isLoading && (
					<button
						onClick={hideSnackbar}
						aria-label="Close"
						className="text-white hover:opacity-75 transition-opacity p-1 rounded-full"
					>
						<BiX className="text-2xl" />
					</button>
				)}
			</div>
		</div>
	);
}
