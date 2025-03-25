const config = {
	apiUrl: import.meta.VITE_API_URL || "http://localhost:8000/api",

	socketUrl: import.meta.VITE_SOCKET_URL || "ws://localhost:8000/",

	endpoints: {
		signUp: "/register",
		getRegistrationCode: "/register/otp",
		startLogin: "/login/start",
		completeLogin: "/login/complete",
		getCurrentUser: "/users/me",
		getMessages: "/chats/messages",
	},

	storage: {
		authContextKey: "TAO_AUTH",
		surviveBrowserClose: true,
	},
};

export default config;
