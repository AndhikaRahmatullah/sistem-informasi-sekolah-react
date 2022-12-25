import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { SignUp as Daftar, GetSignUpErrorMessage } from "../services/authentication";
import { SmallSpinnerLight } from "../tools/spinner";
import { toastNotif, ToastNotifContainer } from "../tools/reactToastify";

const SignUp = () => {
	const redirect = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const password = useRef({});
	password.current = watch("password");

	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { email, password } = formData;
		try {
			await Daftar(email, password);
			redirect("/dashboard");
		} catch (error) {
			const message = GetSignUpErrorMessage(error.code);
			toastNotif("error", message);
			setIsLoading(false);
		}
	};

	return (
		<div className="container my-10 flex min-h-screen flex-col items-center justify-around lg:my-0 lg:flex-row-reverse">
			<div className="lg:w-1/2">
				<img
					src="https://www.workday.com/content/dam/web/en-us/images/content/abstract-article-3@2x.png/jcr:content/renditions/original"
					alt="signup"
				/>
			</div>

			<div className="prose prose-base prose-neutral flex max-w-none flex-col items-center justify-center md:prose-lg lg:w-1/2 lg:prose-xl">
				<h1 className="tracking-wide text-primary">Daftar Sekarang</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* email */}
					<div className="mb-5">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							placeholder="Masukan email"
							{...register("email", { required: true })}
							className="form-input block w-72 bg-transparent md:w-[500px] lg:w-[450px]"
						/>
						<FormError error={errors.email} />
					</div>

					<div className="mb-5">
						{/* password */}
						<label htmlFor="password">Kata Sandi</label>
						<input
							type="password"
							name="password"
							placeholder="Masukan kata sandi"
							{...register("password", { required: true, minLength: 6 })}
							className="form-input block w-72 bg-transparent md:w-[500px] lg:w-[450px]"
						/>
						<FormError error={errors.password} />
					</div>

					<div className="mb-5">
						{/* confirm password */}
						<label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Konfirmasi kata sandi"
							{...register("confirmPassword", { required: true, minLength: 6, validate: (value) => value === password.current })}
							className="form-input block w-72 bg-transparent md:w-[500px] lg:w-[450px]"
						/>
						<FormError error={errors.confirmPassword} />
					</div>

					<div className="mb-10">
						<div className="flex items-center gap-2">
							{/* sk */}
							<input
								type="checkbox"
								name="sk"
								className="form-checkbox"
								{...register("agreement", { required: true })}
							/>
							<label
								htmlFor="sk"
								className="text-lg">
								Setuju dengan syarat dan ketentuan.
							</label>
						</div>
						<FormError error={errors.agreement} />
					</div>

					{/* submit */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-primary p-1">
						{isLoading ? <SmallSpinnerLight /> : <strong className="text-light">Daftar</strong>}
					</button>
				</form>

				{/* signin */}
				<div className="flex gap-2">
					<p>Sudah mempunyai akun ?</p>
					<button
						onClick={() => redirect("/")}
						className="text-primary underline">
						Masuk
					</button>
				</div>
			</div>

			<ToastNotifContainer />
		</div>
	);
};

export default SignUp;
