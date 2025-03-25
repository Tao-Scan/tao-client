import { useQuery } from "@tanstack/react-query";
import { retrieveAuthContext, clearAuthContext } from "../utils";
import config from "../config";
import { createFetcher } from "../fetcher";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";

export default function useAuth() {
	const location = useLocation()[0];

	// Retrieve authContext initially
	const [authContext, setAuthContext] = useState(() => retrieveAuthContext());

	// Auth context update function (memoized to prevent unnecessary re-renders)
	const updateAuth = useCallback(() => {
		setAuthContext(retrieveAuthContext());
	}, []);

	// Effect to listen for auth changes across tabs and within the app
	useEffect(() => {
		window.addEventListener("authContextChanged", updateAuth);
		window.addEventListener("storage", updateAuth);

		return () => {
			window.removeEventListener("authContextChanged", updateAuth);
			window.removeEventListener("storage", updateAuth);
		};
	}, [updateAuth]);

	// Fetch user data only when authContext is available
	const { isPending, data, refetch, isSuccess, error, isError } = useQuery({
		queryKey: [config.endpoints.getCurrentUser, authContext],
		queryFn: authContext
			? createFetcher({
					method: "GET",
					url: config.endpoints.getCurrentUser,
					auth: authContext,
			  })
			: () => Promise.reject("No auth context"), // Prevents unnecessary API call

		enabled: !!authContext, // Ensures the request only runs when authContext exists
		retry: 0,
		refetchInterval: 20000,
	});

	// Function to clear authentication and trigger updates
	const clearAuth = useCallback(() => {
		clearAuthContext();
		setAuthContext(null);
		window.dispatchEvent(new Event("authContextChanged"));
	}, []);

	return {
		location,
		authenticated: isSuccess && !!data,
		user: data,
		refreshUser: refetch,
		error,
		pending: isPending,
		authContext,
		clearAuth,
		failed: isError,
	};
}
