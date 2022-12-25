const GetErrorMessage = (type) => {
	switch (type) {
		case "minLength":
			return "Kata sandi tidak boleh kurang dari 6 karakter.";
		case "validate":
			return "Kata sandi tidak sama.";
		case "required":
		default:
			return "Mohon mengisi field yang tersedia.";
	}
};

const FormError = ({ error }) => {
	if (!error) {
		return <></>;
	}

	const { type } = error;
	const message = GetErrorMessage(type);

	return <span className="text-xs text-sky-600">{message}</span>;
};

export default FormError;
