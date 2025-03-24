import {
	ClipLoader,
	PulseLoader,
	CircleLoader,
	GridLoader,
	PuffLoader,
	MoonLoader,
	BarLoader,
	RingLoader,
	RotateLoader,
	SkewLoader,
	PropagateLoader,
} from "react-spinners";
import { memo } from "react";

const spinnerComponents = {
	default: PulseLoader,
	circle: CircleLoader,
	clip: ClipLoader,
	grid: GridLoader,
	puff: PuffLoader,
	bar: BarLoader,
	moon: MoonLoader,
	ring: RingLoader,
	rotate: RotateLoader,
	skew: SkewLoader,
	propagate: PropagateLoader,
	pulse: PulseLoader,
};

const Spinner = memo(function Loader({
	type = "default",
	size = 12,
	color = "#ffffff",
	inverted = false,
	invertedColor = "#b5991c",
	speed = 1,
	className = "",
	...spinnerProps
}) {
	const spinnerColor = inverted ? invertedColor : color;
	const SpinnerComponent = spinnerComponents[type] || spinnerComponents.default;

	return (
		<div
			className={`flex justify-center items-center w-full bg-inherit  ${className}`}
			role="status"
			aria-label="Loading"
			data-testid="loader-container"
		>
			<SpinnerComponent size={size} color={spinnerColor} speedMultiplier={speed} {...spinnerProps} />
		</div>
	);
});

export default Spinner;
