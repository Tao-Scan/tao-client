import useAppStore from "../store";

export function useSnackbar() {
	const setSnackbarData = useAppStore((state) => state.setSnackbarData);

	return ({ message, variant = "default", isLoading = false, canDismiss = true }) => {
		setSnackbarData({
			message,
			isVisible: true,
			variant,
			isLoading,
			canDismiss,
		});
	};
}
