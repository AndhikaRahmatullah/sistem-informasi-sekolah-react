import { useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/user";
import useGetDatabase from "../hooks/useGetDatabase";

const Profile = () => {
	// path
	const { pathname } = useLocation();
	const splitLocation = pathname.split("/");
	const splitLocation1 = splitLocation[1];
	const userPath = useRef("");

	const redirect = useNavigate();

	// data from users database
	const usersDatabase = useRef({});

	// current user
	const { email } = useUser();

	// get users database
	const getPosts = useGetDatabase("users", true);
	const { values, isLoading, getValueLater, exist, error } = getPosts;

	// validation user database
	if (values) {
		values.map((e) => {
			if (email === e.email) {
				usersDatabase.current = {
					...usersDatabase.current,
					accountID: e.accountID,
					email: e.email,
					username: e.username,
					nuptk: e.nuptk,
					dateOfBirth: e.dateOfBirth,
					placeOfBirth: e.placeOfBirth,
					position: e.position,
					address: e.address,
					profileImage: e.profileImage,
				};
			}
		});
	}

	// validation path
	if (usersDatabase.current.accountID && splitLocation1 !== usersDatabase.current.accountID) redirect(`/${usersDatabase.current.accountID}/profil`);

	const url = "https://tse3.mm.bing.net/th?id=OIP.k0ap2nMOysPb5Rcg6um4vwHaHa&pid=Api&P=0";

	return (
		<div className="container py-10">
			<div className="ml-[250px]">
				{/* header */}
				<p className="text-right text-4xl font-bold text-dark">Profil</p>

				{/* body */}
				<div className="mt-20">
					{/* profile image */}
					<div className="mb-10 flex flex-col items-center justify-between gap-3 text-dark">
						<div
							style={{ backgroundImage: `url(${url})` }}
							className="h-[500px] w-[500px] rounded-full border-[3px] border-dark/50 bg-cover bg-center"></div>
						<p className="text-3xl font-bold tracking-wider">{usersDatabase.current.username}</p>
					</div>

					{/* username */}
					<div className="flex items-center justify-between rounded-t-xl bg-dark py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">Nama Pengguna</p>
						<p className="w-6/12 text-right text-xl">{usersDatabase.current.username}</p>
					</div>

					{/* account id */}
					<div className="flex items-center justify-between bg-dark/80 py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">ID Akun</p>
						<p className="w-6/12 text-right text-xl">{usersDatabase.current.accountID}</p>
					</div>

					{/* nuptk */}
					<div className="flex items-center justify-between bg-dark py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">Nomor Unik Pendidik dan Tenaga Kependidikan (NUPTK)</p>
						<p className="w-6/12 text-right text-xl">{usersDatabase.current.nuptk ? usersDatabase.current.nuptk : "-"}</p>
					</div>

					{/* position */}
					<div className="flex items-center justify-between bg-dark/80 py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">Posisi / Jabatan</p>
						<p className="w-6/12 text-right text-xl">{usersDatabase.current.position ? usersDatabase.current.position : "-"}</p>
					</div>

					{/* email */}
					<div className="flex items-center justify-between bg-dark py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">Email</p>
						<p className="w-6/12 text-right text-xl">{usersDatabase.current.email}</p>
					</div>

					{/* address */}
					<div className="flex items-center justify-between bg-dark/80 py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">Alamat</p>
						<p className="w-6/12 text-right text-xl">{usersDatabase.current.address ? usersDatabase.current.address : "-"}</p>
					</div>

					{/* date & place of birth */}
					<div className="flex items-center justify-between rounded-b-xl bg-dark py-5 px-3 text-light">
						<p className="w-6/12 text-xl font-bold">Tempat, Tanggal Lahir</p>
						<p className="w-6/12 text-right text-xl">
							{usersDatabase.current.placeOfBirth && usersDatabase.current.dateOfBirth ? (
								<>
									{usersDatabase.current.placeOfBirth}, {usersDatabase.current.dateOfBirth}
								</>
							) : (
								"-"
							)}
						</p>
					</div>

					{/* edit data */}
					<div className="mt-10 flex justify-center">
						<button className="rounded-lg bg-primary p-2 text-xl font-medium tracking-wide text-light">Ubah Profil</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
