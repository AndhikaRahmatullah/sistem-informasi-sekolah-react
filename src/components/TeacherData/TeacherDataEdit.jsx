import { useState, useRef } from "react";
import useUpdateDatabase from "../../hooks/useUpdateDatabase";
import { useForm } from "react-hook-form";
import FormError from "../../components/FormError";
import { toastNotif, ToastNotifContainer } from "../../tools/reactToastify";

const TeacherDataEdit = ({ accountID, fullName, nuptk, position, rerender }) => {
	const [isLoading, setIsLoading] = useState(false);
	const update = useUpdateDatabase();
	const existsPositionOption = ["Admin", "Bimbingan Konseling", "Wali Kelas I", "Wali Kelas II", "Wali Kelas III", "Wali Kelas IV", "Wali Kelas V", "Wali Kelas VI"];

	// react hook form utils
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const updateDocPost = async (nuptk, position) => {
		const path = `/users/${accountID}`;
		const value = {
			nuptk: nuptk,
			position: position,
		};

		await update.updateDoc(path, value);
	};

	// submit
	const onSubmit = async (formData) => {
		setIsLoading(true);
		const { nuptk, position } = formData;
		try {
			await updateDocPost(nuptk, position);
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
					data-bs-target={`#${accountID}`}>
					<img
						src={require("../../assets/icons/edit.png")}
						alt="ubah"
						className="w-[30px] grayscale transition-all duration-300 hover:grayscale-0"
					/>
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
										placeholder={nuptk}
										{...register("nuptk", { required: true })}
										className="form-input block w-full bg-transparent text-lg font-medium tracking-wide"
									/>
									<FormError error={errors.nuptk} />
								</div>

								{/* fullName - disabled*/}
								<div className="mb-5">
									<p className="text-lg font-medium">Nama Lengkap</p>
									<p className="form-input block w-full bg-dark/50 text-lg font-medium tracking-wide">{fullName}</p>
									<span className="text-sm font-medium text-dark/80">Nama lengkap hanya dapat diubah oleh akun pengguna.</span>
								</div>

								{/* position */}
								<div className="mb-10">
									<label
										htmlFor="position"
										className="text-lg font-medium">
										Posisi
									</label>
									<select
										name="position"
										{...register("position", { required: true })}
										className="form-select block w-full bg-transparent text-lg font-medium tracking-wide">
										<option
											hidden
											value="">
											Masukan Posisi / Jabatan
										</option>
										{existsPositionOption.map((i) => {
											return (
												<option
													value={i}
													key={i}>
													{i}
												</option>
											);
										})}
									</select>
									<FormError error={errors.position} />
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

export default TeacherDataEdit;