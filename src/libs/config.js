const config = {
	apiUrl: import.meta.VITE_API_URL || "http://localhost:8000/api",

	endpoints: {
		signUp: "/register",
		getRegistrationCode: "/register/otp",
		startLogin: "/login/start",
		completeLogin: "/login/complete",
		getCurrentUser: "/users/me",
	},

	storage: {
		authContextKey: "TAO_AUTH",
		surviveBrowserClose: true,
	},
};

export default config;
