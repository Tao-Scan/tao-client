import { create } from "zustand";

const defaultSnackbarData = {
	isVisible: false,
	title: "Notification",
	message: "You have a new notification about absolutely nothing!",
	variant: "info",
	onReject: null,
	onAccept: null,
	rejectLabel: "Cancel",
	acceptLabel: "Ok",
	canDismiss: true,
	isLoading: false,
};

const useAppStore = create((set) => ({
	snackbarData: defaultSnackbarData,

	setSnackbarData: (snackbarData) =>
		set((state) => ({
			...state,
			snackbarData: { ...state.snackbarData, ...snackbarData },
		})),
	showSignUp: false,
	showSignIn: false,

	toggleSignUp: () => set((state) => ({ showSignUp: !state.showSignUp })),

	toggleSignIn: () => set((state) => ({ showSignIn: !state.showSignIn })),

	setShowSignUp: (flag) => set({ showSignUp: flag }),

	setShowSignIn: (flag) => set({ showSignIn: flag }),
}));

export default useAppStore;
