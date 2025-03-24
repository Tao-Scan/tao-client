const config = {
	apiUrl: import.meta.VITE_API_URL || "http://localhost:8000/api",

	endpoints: {
		signUp: "/register",
		getRegistrationCode: "/register/otp",
		startLogin: "/login/start",
		completeLogin: "/login/complete",
	},

	storage: {
		authContextKey: "TAO_",
		surviveBrowserClose: true,
	},
};

export default config;
