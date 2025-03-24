import { Field, Formik, Form, ErrorMessage } from "formik";
import Overlay from "./overlay";
import useOnClickOutside from "use-onclickoutside";
import { useEffect, useRef } from "react";
import useAppStore from "../libs/store";
import { useMutation } from "@tanstack/react-query";
import config from "../libs/config";
import { createFetcher } from "../libs/fetcher";
import { useSnackbar } from "../libs/hooks/usesnack";
import * as Yup from "yup";
import Spinner from "./spinner";
import useCountdownTimer from "../libs/hooks/usecountdown";
import { saveAuthContext } from "../libs/utils";
import { useLocation } from "wouter";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().min(3, "Too short").max(32, "Too long").required("Required"),

	lastName: Yup.string().min(3, "Too short").max(32, "Too long").required("Required"),

	email: Yup.string().email("Invalid email").required("Required"),

	code: Yup.string().length(6, "Code must be 6 characters").required("Required"),
});

export default function SignUpPopup() {
	const navigate = useLocation()[1];
	const snack = useSnackbar();

	const intentTokenRef = useRef(null);

	const { countEnded, remainingTime, setFutureTimestamp } = useCountdownTimer(Date.now());

	const { mutate, isPending, isError, isSuccess, error, data, reset } = useMutation({
		mutationKey: [config.endpoints.signUp],
		mutationFn: createFetcher({
			method: "POST",
			url: config.endpoints.signUp,
		}),
	});

	const {
		mutate: requestOtp,
		isPending: otpPending,
		isError: otpIsError,
		isSuccess: otpIsSuccess,
		error: otpError,
		reset: resetOtpRequest,
		data: otpData,
	} = useMutation({
		mutationKey: [config.endpoints.getRegistrationCode],
		mutationFn: createFetcher({
			method: "POST",
			url: config.endpoints.getRegistrationCode,
		}),
	});

	const showSignUp = useAppStore((state) => state.showSignUp);

	const setShowSignUp = useAppStore((state) => state.setShowSignUp);
	const setShowSignIn = useAppStore((state) => state.setShowSignIn);

	const ref = useRef(null);

	useOnClickOutside(ref, () => {
		setShowSignUp(false);
	});

	function signInInstead() {
		setShowSignUp(false);
		setShowSignIn(true);
	}

	function handleSubmit(values) {
		if (isPending) return;

		if (!intentTokenRef.current) {
			snack({
				message: "Please request a new code to proceed",
				variant: "info",
			});

			return;
		}

		mutate({ ...values, intentToken: intentTokenRef.current });
	}

	function handleRequestOtp(email) {
		if (otpPending || isPending || !email || !countEnded) return;

		requestOtp({ email });
	}

	useEffect(() => {
		if (isSuccess) {
			saveAuthContext(data);
			snack({
				message: "Account created",
				variant: "success",
			});

			setShowSignUp(false);
			navigate("/chat", { replace: true });
		}

		if (isError) {
			snack({
				message: error.message || "Unable to create account, try again",
				variant: "error",
			});

			reset();
		}
	}, [isError, isSuccess, error, data]);

	useEffect(() => {
		if (otpIsSuccess) {
			intentTokenRef.current = otpData.intentToken;
			setFutureTimestamp(Date.now() + 60000);

			snack({
				message: "Code sent",
				variant: "success",
			});
		}

		if (otpIsError) {
			snack({
				message: otpError.message || "Unable to send code, try again",
				variant: "error",
			});

			resetOtpRequest();
		}
	}, [otpError, otpIsError, otpIsSuccess]);

	if (!showSignUp) return null;

	return (
		<>
			<Overlay />
			<div className="fixed inset-0 w-full center z-30">
				<div ref={ref} className="  rounded-[15px] center pt-8 w-[90%] max-w-md bg-[#17082B]/80 backdrop-blur-lg p-6">
					<div className="  w-full lg:w-[95%] min-h-[400px]  flex flex-col justify-start items-center space-y-4 ">
						<h1
							style={{
								fontFamily: "Kode Mono",
							}}
							className="font-bold text-2xl lg:text-3xl xl:text-4xl text-white"
						>
							Get Started
						</h1>

						<p className="text-white/70 text-center text-sm w-[80%]">
							Create an account to have access to extra features and personalized interaction
						</p>

						<Formik
							validationSchema={validationSchema}
							initialValues={{
								firstName: "",
								lastName: "",
								email: "",
								code: "",
							}}
							onSubmit={handleSubmit}
						>
							{({ isValid, values, errors }) => {
								return (
									<Form className="w-full space-y-4">
										<div className="flex flex-col justify-start items-start space-y-1 w-full">
											<label className="text-sm"> First Name</label>

											<div className="bg-border-gradient w-full">
												<Field
													name="firstName"
													placeholder="First Name"
													type="text"
													className="  backdrop-blur-lg w-full bg-[#04010833]  py-4 focus:outline-none text-sm px-4 rounded-[15px]"
												/>
											</div>
											<p className="text-xs text-red-500">
												<ErrorMessage name="firstName" />
											</p>
										</div>

										<div className="flex flex-col justify-start items-start space-y-1 w-full">
											<label className="text-sm"> Last Name</label>

											<div className="bg-border-gradient w-full">
												<Field
													name="lastName"
													placeholder="Last Name"
													type="text"
													className="  backdrop-blur-lg w-full bg-[#04010833]  py-4 focus:outline-none text-sm px-4 rounded-[15px]"
												/>
											</div>
											<p className="text-xs text-red-500">
												<ErrorMessage name="lastName" />
											</p>
										</div>

										<div className="flex flex-col justify-start items-start space-y-1 w-full">
											<label className="text-sm"> Email</label>

											<div className="bg-border-gradient w-full relative">
												<Field
													name="email"
													placeholder="Email Address"
													type="text"
													className="  backdrop-blur-lg w-full bg-[#04010833]  py-4 focus:outline-none text-sm px-4 pr-[25%] rounded-[15px]"
												/>

												<button
													type="button"
													disabled={otpPending || isPending || errors.email || !values.email || !countEnded}
													onClick={() => handleRequestOtp(values.email)}
													className="text-sm w-max btn py-2 px-2 absolute z-10 -translate-y-1/2 right-2 top-1/2"
												>
													{otpPending ? (
														<Spinner size={8} />
													) : !countEnded ? (
														`${remainingTime.minutesStr}: ${remainingTime.secondsStr}`
													) : (
														"Send Code"
													)}
												</button>
											</div>

											<p className="text-xs text-red-500">
												<ErrorMessage name="email" />
											</p>
										</div>

										<div className="flex flex-col justify-start items-start space-y-1 w-full">
											<label className="text-sm"> Code</label>

											<div className="bg-border-gradient w-full">
												<Field
													style={{
														fontFamily: "Kode Mono",
													}}
													autoComplete="off"
													name="code"
													placeholder="Code"
													type="text"
													className="  tracking-[20px] backdrop-blur-lg w-full bg-[#04010833]  py-4 focus:outline-none text-sm px-4 rounded-[15px]"
												/>
											</div>

											<p className="text-xs text-red-500">
												<ErrorMessage name="code" />
											</p>
										</div>

										<div className="w-full center">
											<button type="submit" disabled={!isValid || isPending} className="btn">
												{isPending ? <Spinner /> : "Create Account"}
											</button>
										</div>

										<p className="text-white text-center">
											{" "}
											Already have an account?{" "}
											<span onClick={signInInstead} className="text-[#00E5FF] cursor-pointer">
												{" "}
												Log in here
											</span>{" "}
										</p>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}
