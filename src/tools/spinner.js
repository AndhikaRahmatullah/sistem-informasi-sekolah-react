export const LargeSpinner = () => {
	return <div
		className="spinner-border inline-block h-10 w-10 animate-spin rounded-full border-4 text-blue-600"
		role="status">
		<span className="visually-hidden">Loading...</span>
	</div>
}

export const LargeSpinnerLarge = () => {
	return <div
		className="spinner-border inline-block h-10 w-10 animate-spin rounded-full border-4 text-neutral-100"
		role="status">
		<span className="visually-hidden">Loading...</span>
	</div>
}

export const SmallSpinner = () => {
	return <div
		className="spinner-border inline-block h-5 w-5 animate-spin rounded-full border-4 text-blue-600"
		role="status">
		<span className="visually-hidden">Loading...</span>
	</div>
}

export const SmallSpinnerLight = () => {
	return <div
		className="spinner-border inline-block h-5 w-5 animate-spin rounded-full border-4 text-neutral-100"
		role="status">
		<span className="visually-hidden">Loading...</span>
	</div>
}