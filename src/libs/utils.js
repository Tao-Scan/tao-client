import config from "./config";

function saveToStorage(storageType, key, state) {
	try {
		const serializedState = JSON.stringify(state);
		if (storageType === "local") {
			localStorage.setItem(key, serializedState);
		} else if (storageType === "session") {
			sessionStorage.setItem(key, serializedState);
		} else {
			throw new Error("Invalid storage type. Use 'local' or 'session'.");
		}
	} catch (error) {
		console.error("Error saving state to storage:", error);
	}
}

function retrieveFromStorage(storageType, key) {
	try {
		let serializedState;
		if (storageType === "local") {
			serializedState = localStorage.getItem(key);
		} else if (storageType === "session") {
			serializedState = sessionStorage.getItem(key);
		} else {
			throw new Error("Invalid storage type. Use 'local' or 'session'.");
		}

		if (serializedState === null) {
			return undefined;
		}

		return JSON.parse(serializedState);
	} catch (error) {
		console.error("Error retrieving state from storage:", error);
		return undefined;
	}
}

function clearStorage(storageType, key) {
	try {
		if (storageType === "local") {
			localStorage.removeItem(key);
		} else if (storageType === "session") {
			sessionStorage.removeItem(key);
		} else {
			throw new Error("Invalid storage type. Use 'local' or 'session'.");
		}
	} catch (error) {
		console.error("Error clearing state from storage:", error);
	}
}

function saveAuthContext(authContext, surviveBrowserClose) {
	const storageType = surviveBrowserClose ? "local" : "session";

	const authInfo = {
		...authContext,
		isValid: Boolean(authContext.accessToken),
		savedAt: Date.now(),
	};

	saveToStorage(storageType, config.storage.authContextKey, authInfo);

	saveToStorage("local", config.storage.surviveBrowserClose, surviveBrowserClose);
}

function retrieveAuthContext() {
	const surviveBrowserClose = retrieveFromStorage("local", config.storage.surviveBrowserClose) || false;

	const storageType = surviveBrowserClose ? "local" : "session";

	return (
		retrieveFromStorage(storageType, config.storage.authContextKey) || {
			accessToken: null,
			refreshToken: null,
			isValid: false,
		}
	);
}

function clearAuthContext() {
	clearStorage("local", config.storage.authContextKey);
	clearStorage("session", config.storage.authContextKey);
}

function formatTitle(input, wordToRemove = "") {
	const regex = new RegExp(wordToRemove, "gi");
	return input
		.replace(/_+/g, " ")
		.replace(regex, "")
		.trim()
		.toLowerCase()
		.split(" ")
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function getColorClass(status, isBgColor = false) {
	const statusClasses = {
		PENDING: isBgColor ? "bg-yellow-500" : "text-yellow-500",
		AWAITING_CALL: isBgColor ? "bg-orange-500" : "text-orange-500",
		AWAITING_TASK: isBgColor ? "bg-teal-500" : "text-teal-500",
		ACTIVE: isBgColor ? "bg-green-600" : "text-green-600",
		INACTIVE: isBgColor ? "bg-gray-400" : "text-gray-400",
		COMPLETED: isBgColor ? "bg-green-500" : "text-green-500",
		SUCCESSFUL: isBgColor ? "bg-green-500" : "text-green-500",
		FAILED: isBgColor ? "bg-red-500" : "text-red-500",
		CANCELLED: isBgColor ? "bg-purple-500" : "text-purple-500",
		PROCESSING: isBgColor ? "bg-blue-500" : "text-blue-500",
	};

	return statusClasses[status] || (isBgColor ? "bg-gray-500" : "text-gray-500");
}

export {
	saveToStorage,
	retrieveFromStorage,
	clearStorage,
	saveAuthContext,
	retrieveAuthContext,
	clearAuthContext,
	formatTitle,
	getColorClass,
};
