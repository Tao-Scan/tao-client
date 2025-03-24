import { useQuery } from "@tanstack/react-query";
import { retrieveAuthContext, clearAuthContext } from "../utils";
import config from "../config";
import { createFetcher } from "../fetcher";

export default function useAuth() {
	const authContext = retrieveAuthContext();

	// console.log("useAuth: ", authContext);

	const { isPending, data, refetch, isSuccess, error } = useQuery({
		queryKey: [config.endpoints.getCurrentUser],
		queryFn: createFetcher({
			method: "GET",
			url: config.endpoints.getCurrentUser,
			auth: authContext,
		}),

		refetchInterval: 30000,

		enabled: !!authContext,
	});

	function clearAuth() {
		clearAuthContext();
		window.location.reload();
	}

	return {
		authenticated: isSuccess && !!data,
		user: data,
		refreshUser: refetch,
		error,
		pending: isPending,

		clearAuth,
	};
}
