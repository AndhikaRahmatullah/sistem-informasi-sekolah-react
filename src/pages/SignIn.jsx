import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { SignIn as Masuk, GetSignInErrorMessage } from "../services/authentication";
import { toastNotif, ToastNotifContainer } from "../tools/reactToastify";
import { SmallSpinnerLight } from "../tools/spinner";

const SignIn = () => {
	const redirect = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { email, password } = formData;
		try {
			await Masuk(email, password);
			redirect("/dashboard");
		} catch (error) {
			const message = GetSignInErrorMessage(error.code);
			toastNotif("error", message);
			setIsLoading(false);
		}
	};

	return (
		<div className="container my-10 flex min-h-screen flex-col items-center justify-around lg:my-0 lg:flex-row">
			<div className="lg:w-1/2">
				<img
					src="https://indonesiana.tv/frontend/images/img-login.png"
					alt="login"
				/>
			</div>

			<div className="prose prose-base prose-neutral flex max-w-none flex-col items-center justify-center md:prose-lg lg:w-1/2 lg:prose-xl">
				<h1 className="tracking-wide text-primary">Selamat Datang</h1>
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

					<div className="mb-10">
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

					{/* submit */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-primary p-1">
						{isLoading ? <SmallSpinnerLight /> : <strong className="text-light">Masuk</strong>}
					</button>
				</form>

				{/* signup */}
				<div className="flex gap-2">
					<p>Belum mempunyai akun ?</p>
					<button
						onClick={() => redirect("/daftar")}
						className="text-primary underline">
						Daftar disini
					</button>
				</div>
			</div>

			<ToastNotifContainer />
		</div>
	);
};

export default SignIn;
