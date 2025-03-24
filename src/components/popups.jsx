import SignInPopup from "./signinpopup";
import SignUpPopup from "./signuppopup";
import Snackbar from "./snack";

export default function Popups() {
	return (
		<>
			<Snackbar />
			<SignInPopup />
			<SignUpPopup />
		</>
	);
}
