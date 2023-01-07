import { useState, useRef } from "react";
import useUpdateDatabase from "../../hooks/useUpdateDatabase";
import { useForm } from "react-hook-form";
import FormError from "../../components/FormError";
import { toastNotif, ToastNotifContainer } from "../../tools/reactToastify";

const ProfileEdit = ({ accountID, fullName, nuptk, position, dateOfBirth, placeOfBirth, address, profileImage, rerender }) => {
	const [isLoading, setIsLoading] = useState(false);
	const update = useUpdateDatabase();
	const [imageURL, setImageURL] = useState("");
	const existsPositionOption = ["Admin", "Bimbingan Konseling", "Wali Kelas I", "Wali Kelas II", "Wali Kelas III", "Wali Kelas IV", "Wali Kelas V", "Wali Kelas VI"];

	// react hook form utils
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const updateDocPost = async (username, nuptk, address, placeOfBirth, dateOfBirth, profileImage) => {
		const path = `/users/${accountID}`;
		const value = {
			username,
			nuptk,
			address,
			placeOfBirth,
			dateOfBirth,
			profileImage,
		};

		await update.updateDoc(path, value);
	};

	const createUrl = () => {
		const inputFile = document.getElementById("inputImg");

		const file = inputFile.files[0];
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			setImageURL(reader.result);
		});

		reader.readAsDataURL(file);
		// console.log({ imageURL });
	};
	// imageURL && createUrl();

	// submit
	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { username, nuptk, address, placeOfBirth, dateOfBirth } = formData;
		try {
			await updateDocPost(username, nuptk, address, placeOfBirth, dateOfBirth, imageURL);
			rerender();
			toastNotif("success", "Data berhasil diperbarui.");
		} catch (error) {
			return null;
		}
		setIsLoading(false);
	};

	return (
		<div>
			<div className="flex justify-center">
				<button
					type="button"
					data-bs-toggle="modal"
					data-bs-target={`#${accountID}`}
					className="rounded-lg bg-primary p-2 text-xl font-medium tracking-wide text-light">
					Ubah Profil
				</button>
			</div>

			{/* modal */}
			<div
				className="modal fade fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
				id={accountID}
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog pointer-events-none relative w-auto">
					<div className="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
						<div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4">
							{/* title */}
							<h5
								className="text-xl font-medium leading-normal text-gray-800"
								id="exampleModalLabel">
								Ubah Data {fullName}
							</h5>

							{/* close button */}
							<button
								type="button"
								className="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-dark opacity-50 hover:text-dark hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>

						{/* modal body */}
						<div className="modal-body relative p-4 text-dark">
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* profile image */}
								<div className="mb-5">
									<label
										htmlFor="profileImage"
										className="text-lg font-medium">
										Foto Profil
									</label>
									<input
										type="file"
										id="inputImg"
										name="profileImage"
										onChange={createUrl}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
								</div>

								{/* fullName */}
								<div className="mb-5">
									<label
										htmlFor="username"
										className="text-lg font-medium">
										Nama Lengkap
									</label>
									<input
										type="text"
										name="username"
										placeholder={fullName}
										{...register("username", { required: true })}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
									<FormError error={errors.username} />
								</div>

								{/* niptk */}
								<div className="mb-5">
									<label
										htmlFor="nuptk"
										className="text-lg font-medium">
										NUPTK
									</label>
									<input
										type="number"
										name="nuptk"
										placeholder={nuptk ? nuptk : "-"}
										{...register("nuptk", { required: true })}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
									<FormError error={errors.nuptk} />
								</div>

								{/* position - disabled*/}
								<div className="mb-5">
									<p className="text-lg font-medium">Posisi</p>
									<p className="form-input block w-full bg-dark/50 text-lg font-medium tracking-wide">{position ? position : "-"}</p>
									<span className="text-sm font-medium text-dark/80">Posisi hanya dapat diubah oleh akun administrator.</span>
								</div>

								{/* address */}
								<div className="mb-5">
									<label
										htmlFor="address"
										className="text-lg font-medium">
										Alamat
									</label>
									<input
										type="text"
										name="address"
										placeholder={address ? address : "Jl. Dadali No.5 Kec. Tanah Sareal, Kota Bogor"}
										{...register("address", { required: true })}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
									<FormError error={errors.address} />
								</div>

								{/* placeOfBirth */}
								<div className="mb-5">
									<label
										htmlFor="placeOfBirth"
										className="text-lg font-medium">
										Tempat Lahir
									</label>
									<input
										type="text"
										name="placeOfBirth"
										placeholder={placeOfBirth ? placeOfBirth : "Bogor"}
										{...register("placeOfBirth", { required: true })}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
									<FormError error={errors.placeOfBirth} />
								</div>

								{/* dateOfBirth */}
								<div className="mb-5">
									<label
										htmlFor="dateOfBirth"
										className="text-lg font-medium">
										Tanggal Lahir
									</label>
									<input
										type="text"
										name="dateOfBirth"
										placeholder={dateOfBirth ? dateOfBirth : "20 Maret 1966"}
										{...register("dateOfBirth", { required: true })}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
									<FormError error={errors.dateOfBirth} />
								</div>

								{/* action button */}
								<div className="modal-footer my-3 flex flex-shrink-0 flex-wrap items-center justify-end">
									<button
										type="button"
										className="inline-block rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
										// onClick={() => rerender()}
										data-bs-dismiss="modal">
										Keluar
									</button>

									<button
										type="submit"
										disabled={isLoading}
										className="ml-1 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
										Ubah
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ToastNotifContainer />
		</div>
	);
};

export default ProfileEdit;
