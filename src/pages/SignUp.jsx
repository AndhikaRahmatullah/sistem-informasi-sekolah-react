import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp as Daftar, GetSignUpErrorMessage } from "../services/authentication";
import useCreateDatabase from "../hooks/useCreateDatabase";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { capitalLetter } from "../tools/capitalLetter";
import { SmallSpinnerLight } from "../tools/spinner";
import { toastNotif, ToastNotifContainer } from "../tools/reactToastify";
import { uid } from "uid";

const SignUp = () => {
	const redirect = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const accountID = useRef(`ar${uid(32)}`);

	// useForm
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	// watching field
	const password = useRef("");
	const username = useRef("");
	password.current = watch("password");
	username.current = watch("username");

	// set database
	const create = useCreateDatabase();
	const currentTime = new Date().toLocaleString();

	// additional data for users database
	const additionalData = async (username, email) => {
		const path = `/users/${accountID.current}`;
		const value = {
			username: capitalLetter(username),
			accountID: accountID.current,
			nuptk: 0,
			profileImage: "",
			address: "",
			placeOfBirth: "",
			dateOfBirth: "",
			position: "",
			email: email,
			createdTime: currentTime,
		};
		await create.setValue(path, value);
	};

	// submit
	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { username, email, password } = formData;
		try {
			await Daftar(email, password);
			await additionalData(username, email);
			redirect(`/${accountID.current}/dashboard`);
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
					{/* username */}
					<div className="mb-5">
						<label htmlFor="email">Nama Pengguna</label>
						<input
							type="text"
							name="username"
							placeholder="Masukan nama pengguna"
							{...register("username", { required: true })}
							className="form-input block w-72 bg-transparent md:w-[500px] lg:w-[450px]"
						/>
						<FormError error={errors.email} />
					</div>

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

					{/* password */}
					<div className="mb-5">
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

					{/* confirm password */}
					<div className="mb-5">
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

					{/* sk */}
					<div className="mb-10">
						<div className="flex items-center gap-2">
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
